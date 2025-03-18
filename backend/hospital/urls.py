from django.urls import path
from .views import (

    # Department
    Department_List,
    Department_Get, 
    Department_Get,
    Create_Department,
    Update_Department,
    Delete_Department,
    # Employee
    Doctors_List,
    Employee_List,
    Employee_Get,
    Create_Employee,
    Update_Employee,
    Delete_Employee,
    # Appointment
    Appointment_List,
    Appointment_Get,
    Create_Appointment,
    Update_Appointment,
    Delete_Appointment,
    # Patient
    Patient_List,
    Patient_Get,
    Create_Patient,
    Update_Patient,
    Delete_Patient,
    # Operation_
    Operation_List,
    Operation_Get,
    Create_Operation,
    Update_Operation,
    Delete_Operation
)

urlpatterns = [
    # Department
    path('departments/', Department_List, name='department-list'),
    path('departments/<int:pk>', Department_Get , name='department-get'),
    path('departments/create/', Create_Department, name='create-department'),
    path('departments/<int:pk>/update/', Update_Department, name='update-department'),
    path('departments/<int:pk>/delete/', Delete_Department, name='delete-department'),
    # Employee
    path('employees/', Employee_List, name='employee-list'),
    path('doctors/', Doctors_List, name='doctors-list'),
    path('employees/<int:pk>', Employee_Get , name='employee-get'),
    path('employees/create/', Create_Employee, name='create-employee'),
    path('employees/<int:pk>/update/', Update_Employee, name='update-employee'),
    path('employees/<int:pk>/delete/', Delete_Employee, name='delete-employee'),
    # Appointment
    path('appointment/', Appointment_List, name='appointment-list'),
    path('appointment/<int:pk>', Appointment_Get , name='appointment-get'),
    path('appointment/create/', Create_Appointment, name='create-appointment'),
    path('appointment/<int:pk>/update/', Update_Appointment, name='update-appointment'),
    path('appointment/<int:pk>/delete/', Delete_Appointment, name='delete-appointment'),
    # Patient
    path('patient/', Patient_List, name='patient-list'),
    path('patient/<int:pk>', Patient_Get , name='patient-get'),
    path('patient/create/', Create_Patient, name='create-patient'),
    path('patient/<int:pk>/update/', Update_Patient, name='update-patient'),
    path('patient/<int:pk>/delete/', Delete_Patient, name='delete-patient'),
    # operation
    path('operation/', Operation_List, name='operation-list'),
    path('operation/<int:pk>', Operation_Get , name='operation-get'),
    path('operation/create/', Create_Operation, name='create-operation'),
    path('operation/<int:pk>/update/', Update_Operation, name='update-operation'),
    path('operation/<int:pk>/delete/', Delete_Operation, name='delete-operation'),

]
