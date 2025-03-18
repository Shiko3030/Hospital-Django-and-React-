from django.contrib import admin
from .models import  Department ,Employee ,Patient ,Appointment ,Operation

admin.site.register(Department)
admin.site.register(Employee)
admin.site.register(Patient)
admin.site.register(Appointment)
admin.site.register(Operation)