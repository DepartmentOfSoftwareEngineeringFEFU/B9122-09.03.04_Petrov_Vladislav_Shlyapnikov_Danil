import json
from pathlib import Path

from django.core.management.base import BaseCommand
from django.db import transaction

from core import views
from core.models import (
    DebtNotice, ServiceRequest, OwnershipCertificate, RentPayment, MeterReading, MeterType,
    TransferAct, Contract, Room, TenantCompany, TenantPerson, Tenant, Landlord,
)


class Command(BaseCommand):
    help = 'Заполняет SQLite демонстрационными данными для проекта аренды.'

    def handle(self, *args, **options):
        payload = json.loads((Path(__file__).resolve().parents[2] / 'demo_data.json').read_text(encoding='utf-8'))
        with transaction.atomic():
            for model in [DebtNotice, ServiceRequest, OwnershipCertificate, RentPayment, MeterReading, TransferAct, MeterType, Contract, Room, TenantCompany, TenantPerson, Tenant, Landlord]:
                model.objects.all().delete()

            for item in payload['landlords']:
                views.upsert_landlord(item)
            for item in payload['tenants']:
                views.upsert_tenant(item)
            for item in payload['rooms']:
                views.upsert_room(item)
            for item in payload['contracts']:
                views.upsert_contract(item)
            for item in payload.get('payments', []):
                views.upsert_payment(item)
            for item in payload['acts']:
                views.upsert_act(item)
            for item in payload['certificates']:
                views.upsert_certificate(item)
            for item in payload['requests']:
                views.upsert_request(item)
            for item in payload['notices']:
                views.upsert_notice(item)

        self.stdout.write(self.style.SUCCESS(
            'Демо-данные загружены: '
            f"{len(payload['tenants'])} арендаторов, {len(payload['rooms'])} помещений, "
            f"{len(payload['contracts'])} договоров, {len(payload.get('payments', []))} платежей, {len(payload['requests'])} заявок."
        ))
