from rest_framework import serializers
from .models import Department ,Employee ,Patient ,Appointment ,Operation


class DepartmentSerializers(serializers.ModelSerializer):
    class Meta :
        model = Department
        fields = '__all__'

class EmployeeSerializers(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True) 
    class Meta :
        model = Employee
        fields = [
            'id',
            'name',
            'national_id',
            'job_type',
            'specialization',
            'phone',
            'hire_date',
            'department',
            'department_name',
        ]

class PatientSerializers(serializers.ModelSerializer):
    class Meta :
        model = Patient
        fields = '__all__'


class AppointmentSerializers(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.name', read_only=True)
    doctor_name = serializers.CharField(source='doctor.name', read_only=True)
    department_name = serializers.CharField(source='department.name', read_only=True)
    class Meta :
        model = Appointment
        fields = [
            'id', 
            'patient',        
            'doctor',         
            'department', 
            'patient_name', 
            'doctor_name', 
            'department_name', 
            'appointment_type', 
            'appointment_date', 
            'status'
        ]


class OperationSerializers(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.name', read_only=True)
    doctor_name = serializers.CharField(source='doctor.name', read_only=True)
    department_name = serializers.CharField(source='department.name', read_only=True)
    class Meta :
        model = Operation
        fields = [
                    'id',
                    'patient',         
                    'doctor',          
                    'department', 
                    'patient_name',
                    'doctor_name',
                    'department_name',
                    'operation_type',
                    'operation_date',
                    'status',
                    'cost',
        ]
