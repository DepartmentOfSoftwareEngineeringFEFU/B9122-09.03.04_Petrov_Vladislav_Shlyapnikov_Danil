from django.core.exceptions import ValidationError
from django.db import models


class Landlord(models.Model):
    id = models.CharField(max_length=20, primary_key=True)
    name = models.CharField(max_length=255)
    inn = models.CharField(max_length=12, unique=True)
    legal_address = models.TextField()
    bank_details = models.TextField()

    def __str__(self):
        return self.name


class Tenant(models.Model):
    PERSON = 'физическое лицо'
    COMPANY = 'юридическое лицо'
    TENANT_TYPES = [(PERSON, PERSON), (COMPANY, COMPANY)]

    id = models.CharField(max_length=20, primary_key=True)
    tenant_type = models.CharField(max_length=32, choices=TENANT_TYPES)
    inn = models.CharField(max_length=12, blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20, blank=True)

    def __str__(self):
        if self.tenant_type == self.COMPANY and hasattr(self, 'company_profile'):
            return self.company_profile.company_name
        if hasattr(self, 'person_profile'):
            p = self.person_profile
            return f'{p.last_name} {p.first_name} {p.middle_name}'.strip()
        return self.id


class TenantPerson(models.Model):
    tenant = models.OneToOneField(Tenant, primary_key=True, related_name='person_profile', on_delete=models.CASCADE)
    last_name = models.CharField(max_length=80)
    first_name = models.CharField(max_length=80)
    middle_name = models.CharField(max_length=80)
    passport_series = models.CharField(max_length=4)
    passport_number = models.CharField(max_length=6)
    birth_date = models.DateField()
    passport_issue_date = models.DateField()

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['passport_series', 'passport_number'], name='unique_passport')
        ]


class TenantCompany(models.Model):
    tenant = models.OneToOneField(Tenant, primary_key=True, related_name='company_profile', on_delete=models.CASCADE)
    company_name = models.CharField(max_length=255)
    legal_address = models.TextField()
    ogrn = models.CharField(max_length=15, unique=True)
    bank_name = models.CharField(max_length=255)
    checking_account = models.CharField(max_length=32)
    director_last_name = models.CharField(max_length=80)
    director_first_name = models.CharField(max_length=80)
    director_middle_name = models.CharField(max_length=80)


class Room(models.Model):
    FREE = 'Свободно'
    BUSY = 'Занято'
    REPAIR = 'в ремонте'
    ROOM_STATUSES = [(FREE, FREE), (BUSY, BUSY), (REPAIR, REPAIR)]

    id = models.CharField(max_length=20, primary_key=True)
    area = models.DecimalField(max_digits=9, decimal_places=2)
    floor = models.PositiveSmallIntegerField()
    address = models.TextField()
    status = models.CharField(max_length=20, choices=ROOM_STATUSES, default=FREE)

    def __str__(self):
        return f'Помещение №{self.id}'


class Contract(models.Model):
    id = models.CharField(max_length=20, primary_key=True)
    contract_number = models.CharField(max_length=40, unique=True)
    room = models.ForeignKey(Room, related_name='contracts', on_delete=models.PROTECT)
    landlord = models.ForeignKey(Landlord, related_name='contracts', on_delete=models.PROTECT)
    tenant = models.ForeignKey(Tenant, related_name='contracts', on_delete=models.PROTECT)
    start_date = models.DateField()
    end_date = models.DateField()
    rent_cost = models.DecimalField(max_digits=12, decimal_places=2)
    payment = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    last_payment_date = models.DateField()

    def __str__(self):
        return self.contract_number


class ActCondition(models.TextChoices):
    EXCELLENT = 'отличное', 'отличное'
    GOOD = 'хорошее', 'хорошее'
    SATISFACTORY = 'удовлетворительное', 'удовлетворительное'
    NEEDS_REPAIR = 'требует ремонта', 'требует ремонта'


class TransferAct(models.Model):
    id = models.CharField(max_length=20, primary_key=True)
    contract = models.ForeignKey(Contract, related_name='acts', on_delete=models.CASCADE)
    settlement_date = models.DateField()
    room_condition = models.CharField(max_length=32, choices=ActCondition.choices)

    def __str__(self):
        return self.id


class MeterType(models.Model):
    name = models.CharField(max_length=80, unique=True)

    def __str__(self):
        return self.name


class MeterReading(models.Model):
    act = models.ForeignKey(TransferAct, related_name='meter_readings', on_delete=models.CASCADE)
    meter_type = models.ForeignKey(MeterType, on_delete=models.PROTECT)
    meter_value = models.DecimalField(max_digits=12, decimal_places=2)

    class Meta:
        constraints = [models.UniqueConstraint(fields=['act', 'meter_type'], name='unique_meter_per_act')]


class OwnershipCertificate(models.Model):
    id = models.CharField(max_length=20, primary_key=True)
    contract = models.ForeignKey(Contract, related_name='certificates', on_delete=models.CASCADE)
    cadastral_number = models.CharField(max_length=32)
    registration_date = models.DateField()
    registration_number = models.CharField(max_length=64)

    class Meta:
        constraints = [models.UniqueConstraint(fields=['cadastral_number', 'registration_number'], name='unique_certificate_registration')]


class ServiceRequest(models.Model):
    REGISTERED = 'зарегистрирована'
    IN_PROGRESS = 'в работе'
    DONE = 'выполнена'
    REQUEST_STATUSES = [(REGISTERED, REGISTERED), (IN_PROGRESS, IN_PROGRESS), (DONE, DONE)]

    id = models.CharField(max_length=20, primary_key=True)
    contract = models.ForeignKey(Contract, related_name='requests', on_delete=models.CASCADE)
    room = models.ForeignKey(Room, related_name='requests', on_delete=models.PROTECT)
    description = models.TextField()
    request_date = models.DateField()
    status = models.CharField(max_length=32, choices=REQUEST_STATUSES, default=REGISTERED)

    def clean(self):
        if self.contract_id and self.room_id and str(self.contract.room_id) != str(self.room_id):
            raise ValidationError('Заявка должна ссылаться на помещение из выбранного договора.')


class RentPayment(models.Model):
    PAID = 'оплачен'
    PARTIAL = 'частично оплачен'
    OVERDUE = 'просрочен'
    PAYMENT_STATUSES = [(PAID, PAID), (PARTIAL, PARTIAL), (OVERDUE, OVERDUE)]

    BANK_TRANSFER = 'безналичный перевод'
    CASH = 'наличные через кассу'
    CARD = 'банковская карта'
    PAYMENT_METHODS = [(BANK_TRANSFER, BANK_TRANSFER), (CASH, CASH), (CARD, CARD)]

    id = models.CharField(max_length=20, primary_key=True)
    contract = models.ForeignKey(Contract, related_name='payments', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    payment_date = models.DateField()
    period_start = models.DateField()
    period_end = models.DateField()
    method = models.CharField(max_length=32, choices=PAYMENT_METHODS)
    status = models.CharField(max_length=32, choices=PAYMENT_STATUSES, default=PAID)
    note = models.TextField(blank=True)

    class Meta:
        ordering = ['-payment_date', 'id']

    def clean(self):
        if self.period_start and self.period_end and self.period_start > self.period_end:
            raise ValidationError('Начало расчетного периода не может быть позже его окончания.')

    def __str__(self):
        return f'{self.id}: {self.contract_id} — {self.amount}'


class DebtNotice(models.Model):
    id = models.CharField(max_length=20, primary_key=True)
    contract = models.ForeignKey(Contract, related_name='notices', on_delete=models.CASCADE)
    room = models.ForeignKey(Room, related_name='notices', on_delete=models.PROTECT)
    debt_amount = models.DecimalField(max_digits=12, decimal_places=2)
    formation_date = models.DateField()
    repayment_deadline = models.DateField()

    def clean(self):
        if self.contract_id and self.room_id and str(self.contract.room_id) != str(self.room_id):
            raise ValidationError('Уведомление должно ссылаться на помещение из выбранного договора.')
