import json
from datetime import datetime
from decimal import Decimal

from django.db import transaction
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import (
    Landlord, Tenant, TenantPerson, TenantCompany, Room, Contract, TransferAct,
    MeterType, MeterReading, OwnershipCertificate, RentPayment, ServiceRequest, DebtNotice,
)


def parse_date(value):
    if not value:
        return None
    if hasattr(value, 'strftime'):
        return value
    for fmt in ('%d.%m.%Y', '%Y-%m-%d'):
        try:
            return datetime.strptime(str(value), fmt).date()
        except ValueError:
            pass
    raise ValueError(f'Некорректная дата: {value}')


def fmt_date(value):
    return value.strftime('%d.%m.%Y') if value else ''


def fmt_decimal(value):
    value = Decimal(value or 0)
    return str(int(value)) if value == value.to_integral() else str(value.normalize())


def body_json(request):
    if not request.body:
        return {}
    return json.loads(request.body.decode('utf-8'))


def landlord_to_dict(x):
    return {'id': x.id, 'name': x.name, 'inn': x.inn, 'legalAddress': x.legal_address, 'bankDetails': x.bank_details}


def tenant_to_dict(x):
    data = {'id': x.id, 'tenantType': x.tenant_type, 'inn': x.inn, 'email': x.email, 'phone': x.phone}
    if x.tenant_type == Tenant.PERSON and hasattr(x, 'person_profile'):
        p = x.person_profile
        data.update({
            'lastName': p.last_name, 'firstName': p.first_name, 'middleName': p.middle_name,
            'passportSeries': p.passport_series, 'passportNumber': p.passport_number,
            'birthDate': fmt_date(p.birth_date), 'passportIssueDate': fmt_date(p.passport_issue_date),
        })
    if x.tenant_type == Tenant.COMPANY and hasattr(x, 'company_profile'):
        c = x.company_profile
        data.update({
            'companyName': c.company_name, 'legalAddress': c.legal_address, 'ogrn': c.ogrn,
            'bankName': c.bank_name, 'checkingAccount': c.checking_account,
            'directorLastName': c.director_last_name, 'directorFirstName': c.director_first_name,
            'directorMiddleName': c.director_middle_name,
        })
    return data


def room_to_dict(x):
    return {'id': x.id, 'area': fmt_decimal(x.area), 'floor': str(x.floor), 'address': x.address, 'status': x.status}


def contract_to_dict(x):
    return {
        'id': x.id, 'contractNumber': x.contract_number, 'roomId': x.room_id,
        'landlordId': x.landlord_id, 'tenantId': x.tenant_id,
        'startDate': fmt_date(x.start_date), 'endDate': fmt_date(x.end_date),
        'rentCost': fmt_decimal(x.rent_cost), 'payment': fmt_decimal(x.payment),
        'lastPaymentDate': fmt_date(x.last_payment_date),
    }


def act_to_dict(x):
    return {
        'id': x.id, 'contractId': x.contract_id, 'settlementDate': fmt_date(x.settlement_date),
        'roomCondition': x.room_condition,
        'meterReadings': [
            {'meterType': r.meter_type.name, 'meterValue': fmt_decimal(r.meter_value)}
            for r in x.meter_readings.select_related('meter_type').all()
        ]
    }


def certificate_to_dict(x):
    return {
        'id': x.id, 'contractId': x.contract_id, 'cadastralNumber': x.cadastral_number,
        'registrationDate': fmt_date(x.registration_date), 'registrationNumber': x.registration_number,
    }


def payment_to_dict(x):
    return {
        'id': x.id, 'contractId': x.contract_id, 'amount': fmt_decimal(x.amount),
        'paymentDate': fmt_date(x.payment_date), 'periodStart': fmt_date(x.period_start),
        'periodEnd': fmt_date(x.period_end), 'method': x.method, 'status': x.status,
        'note': x.note,
    }


def request_to_dict(x):
    return {
        'id': x.id, 'contractId': x.contract_id, 'tenantRoomContractId': x.contract_id,
        'roomId': x.room_id, 'description': x.description, 'requestDate': fmt_date(x.request_date),
        'status': x.status,
    }


def notice_to_dict(x):
    return {
        'id': x.id, 'contractId': x.contract_id, 'tenantRoomContractId': x.contract_id,
        'roomId': x.room_id, 'debtAmount': fmt_decimal(x.debt_amount),
        'formationDate': fmt_date(x.formation_date), 'repaymentDeadline': fmt_date(x.repayment_deadline),
    }


COLLECTIONS = {
    'landlords': (Landlord, landlord_to_dict),
    'tenants': (Tenant, tenant_to_dict),
    'rooms': (Room, room_to_dict),
    'contracts': (Contract, contract_to_dict),
    'payments': (RentPayment, payment_to_dict),
    'acts': (TransferAct, act_to_dict),
    'certificates': (OwnershipCertificate, certificate_to_dict),
    'requests': (ServiceRequest, request_to_dict),
    'notices': (DebtNotice, notice_to_dict),
}


def all_data():
    return {
        'landlords': [landlord_to_dict(x) for x in Landlord.objects.all().order_by('id')],
        'tenants': [tenant_to_dict(x) for x in Tenant.objects.select_related('person_profile', 'company_profile').all().order_by('id')],
        'rooms': [room_to_dict(x) for x in Room.objects.all().order_by('id')],
        'contracts': [contract_to_dict(x) for x in Contract.objects.select_related('room', 'tenant', 'landlord').all().order_by('id')],
        'payments': [payment_to_dict(x) for x in RentPayment.objects.select_related('contract').all().order_by('id')],
        'acts': [act_to_dict(x) for x in TransferAct.objects.prefetch_related('meter_readings__meter_type').all().order_by('id')],
        'certificates': [certificate_to_dict(x) for x in OwnershipCertificate.objects.all().order_by('id')],
        'requests': [request_to_dict(x) for x in ServiceRequest.objects.all().order_by('id')],
        'notices': [notice_to_dict(x) for x in DebtNotice.objects.all().order_by('id')],
    }


def upsert_landlord(data, pk=None):
    obj, _ = Landlord.objects.update_or_create(
        id=pk or data['id'],
        defaults={'name': data['name'], 'inn': data['inn'], 'legal_address': data['legalAddress'], 'bank_details': data['bankDetails']}
    )
    return obj


def upsert_tenant(data, pk=None):
    tenant, _ = Tenant.objects.update_or_create(
        id=pk or data['id'],
        defaults={'tenant_type': data['tenantType'], 'inn': data.get('inn', ''), 'email': data.get('email', ''), 'phone': data.get('phone', '')}
    )
    if tenant.tenant_type == Tenant.PERSON:
        TenantCompany.objects.filter(tenant=tenant).delete()
        TenantPerson.objects.update_or_create(tenant=tenant, defaults={
            'last_name': data.get('lastName', ''), 'first_name': data.get('firstName', ''), 'middle_name': data.get('middleName', ''),
            'passport_series': data.get('passportSeries', ''), 'passport_number': data.get('passportNumber', ''),
            'birth_date': parse_date(data.get('birthDate')), 'passport_issue_date': parse_date(data.get('passportIssueDate')),
        })
    else:
        TenantPerson.objects.filter(tenant=tenant).delete()
        TenantCompany.objects.update_or_create(tenant=tenant, defaults={
            'company_name': data.get('companyName', ''), 'legal_address': data.get('legalAddress', ''), 'ogrn': data.get('ogrn', ''),
            'bank_name': data.get('bankName', ''), 'checking_account': data.get('checkingAccount', ''),
            'director_last_name': data.get('directorLastName', ''), 'director_first_name': data.get('directorFirstName', ''),
            'director_middle_name': data.get('directorMiddleName', ''),
        })
    return tenant


def upsert_room(data, pk=None):
    obj, _ = Room.objects.update_or_create(id=pk or data['id'], defaults={
        'area': Decimal(str(data['area'])), 'floor': int(data['floor']), 'address': data['address'], 'status': data['status']
    })
    return obj


def upsert_contract(data, pk=None):
    obj, _ = Contract.objects.update_or_create(id=pk or data['id'], defaults={
        'contract_number': data['contractNumber'], 'room_id': data['roomId'], 'landlord_id': data['landlordId'], 'tenant_id': data['tenantId'],
        'start_date': parse_date(data['startDate']), 'end_date': parse_date(data['endDate']),
        'rent_cost': Decimal(str(data['rentCost'])), 'payment': Decimal(str(data['payment'])), 'last_payment_date': parse_date(data['lastPaymentDate']),
    })
    Room.objects.filter(id=obj.room_id).update(status=Room.BUSY)
    return obj


def upsert_act(data, pk=None):
    act, _ = TransferAct.objects.update_or_create(id=pk or data['id'], defaults={
        'contract_id': data['contractId'], 'settlement_date': parse_date(data['settlementDate']), 'room_condition': data['roomCondition']
    })
    readings = data.get('meterReadings') or [
        {'meterType': 'счетчик электроэнергии', 'meterValue': data.get('electricity', 0)},
        {'meterType': 'счетчик холодной воды', 'meterValue': data.get('coldWater', 0)},
        {'meterType': 'счетчик горячей воды', 'meterValue': data.get('hotWater', 0)},
    ]
    for reading in readings:
        mt, _ = MeterType.objects.get_or_create(name=reading['meterType'])
        MeterReading.objects.update_or_create(act=act, meter_type=mt, defaults={'meter_value': Decimal(str(reading['meterValue']))})
    return act


def upsert_certificate(data, pk=None):
    obj, _ = OwnershipCertificate.objects.update_or_create(id=pk or data['id'], defaults={
        'contract_id': data['contractId'], 'cadastral_number': data['cadastralNumber'],
        'registration_date': parse_date(data['registrationDate']), 'registration_number': data['registrationNumber']
    })
    return obj


def upsert_payment(data, pk=None):
    obj, _ = RentPayment.objects.update_or_create(id=pk or data['id'], defaults={
        'contract_id': data['contractId'], 'amount': Decimal(str(data['amount'])),
        'payment_date': parse_date(data['paymentDate']), 'period_start': parse_date(data['periodStart']),
        'period_end': parse_date(data['periodEnd']), 'method': data['method'],
        'status': data['status'], 'note': data.get('note', '')
    })
    return obj


def upsert_request(data, pk=None):
    obj, _ = ServiceRequest.objects.update_or_create(id=pk or data['id'], defaults={
        'contract_id': data['contractId'], 'room_id': data['roomId'], 'description': data['description'],
        'request_date': parse_date(data['requestDate']), 'status': data['status']
    })
    return obj


def upsert_notice(data, pk=None):
    obj, _ = DebtNotice.objects.update_or_create(id=pk or data['id'], defaults={
        'contract_id': data['contractId'], 'room_id': data['roomId'], 'debt_amount': Decimal(str(data['debtAmount'])),
        'formation_date': parse_date(data['formationDate']), 'repayment_deadline': parse_date(data['repaymentDeadline'])
    })
    return obj


UPSERT = {
    'landlords': upsert_landlord,
    'tenants': upsert_tenant,
    'rooms': upsert_room,
    'contracts': upsert_contract,
    'payments': upsert_payment,
    'acts': upsert_act,
    'certificates': upsert_certificate,
    'requests': upsert_request,
    'notices': upsert_notice,
}


@require_http_methods(['GET'])
def data_view(request):
    return JsonResponse(all_data(), json_dumps_params={'ensure_ascii': False})


@csrf_exempt
@require_http_methods(['GET', 'POST'])
def collection_view(request, collection):
    if collection not in COLLECTIONS:
        return JsonResponse({'error': 'Unknown collection'}, status=404)
    model, serializer = COLLECTIONS[collection]
    if request.method == 'GET':
        return JsonResponse([serializer(x) for x in model.objects.all().order_by('id')], safe=False, json_dumps_params={'ensure_ascii': False})
    try:
        with transaction.atomic():
            obj = UPSERT[collection](body_json(request))
        return JsonResponse(serializer(obj), status=201, json_dumps_params={'ensure_ascii': False})
    except Exception as exc:
        return JsonResponse({'error': str(exc)}, status=400, json_dumps_params={'ensure_ascii': False})


@csrf_exempt
@require_http_methods(['PUT', 'PATCH', 'DELETE'])
def item_view(request, collection, pk):
    if collection not in COLLECTIONS:
        return JsonResponse({'error': 'Unknown collection'}, status=404)
    model, serializer = COLLECTIONS[collection]
    if request.method == 'DELETE':
        deleted, _ = model.objects.filter(pk=pk).delete()
        return JsonResponse({'deleted': deleted})
    try:
        data = body_json(request)
        data['id'] = pk
        with transaction.atomic():
            obj = UPSERT[collection](data, pk=pk)
        return JsonResponse(serializer(obj), json_dumps_params={'ensure_ascii': False})
    except Exception as exc:
        return JsonResponse({'error': str(exc)}, status=400, json_dumps_params={'ensure_ascii': False})
