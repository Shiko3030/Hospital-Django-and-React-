from django.contrib import admin
from .models import  Department ,Employee ,Patient ,Appointment ,Hospital ,JobType

admin.site.register(Department)
admin.site.register(Employee)
admin.site.register(Patient)
admin.site.register(Appointment)
admin.site.register(Hospital)
admin.site.register(JobType)

