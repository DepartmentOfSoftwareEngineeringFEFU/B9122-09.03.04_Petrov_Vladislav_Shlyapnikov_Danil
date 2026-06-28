from django.contrib import admin
from . import models

for model in [
    models.Landlord, models.Tenant, models.TenantPerson, models.TenantCompany,
    models.Room, models.Contract, models.TransferAct, models.MeterType,
    models.MeterReading, models.OwnershipCertificate, models.ServiceRequest,
    models.DebtNotice,
]:
    admin.site.register(model)
