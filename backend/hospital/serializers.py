from rest_framework import serializers
from .models import Department, Employee, Patient, Appointment, Hospital, JobType

class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = '__all__'

class JobTypeSerializers(serializers.ModelSerializer):
    class Meta:
        model = JobType
        fields = '__all__'

class DepartmentSerializers(serializers.ModelSerializer):
    hospital_name = serializers.CharField(source='hospital.hospital_name', read_only=True)

    class Meta:
        model = Department
        fields = ['id', 'department_name', 'hospital', 'hospital_name']

class EmployeeSerializers(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.department_name', read_only=True)
    hospital_name = serializers.CharField(source='hospital.hospital_name', read_only=True)
    job_name = serializers.CharField(source='job.job_name', read_only=True)


    class Meta:
        model = Employee
        fields = [
            'id',
            'first_name',  # استبدال name بـ first_name
            'last_name',   # إضافة last_name
            'specialty',
            'license_number',  # إضافة الحقل الاختياري
            'job_name',
            'hospital',
            'hospital_name',
            'job',
            'department',
            'department_name',
        ]

class PatientSerializers(serializers.ModelSerializer):
    hospital_name = serializers.CharField(source='hospital.hospital_name', read_only=True)
    patient_name = serializers.SerializerMethodField() 

    class Meta:
        model = Patient
        fields = [
            'id',
            'first_name',
            'last_name',
            'gender',
            'date_of_birth',
            'phone_number',
            'email',
            'hospital',
            'hospital_name',
            'patient_name',
        ]
    def get_patient_name(self, obj):
        return obj.name
class AppointmentSerializers(serializers.ModelSerializer):
    patient_name = serializers.SerializerMethodField()  # حقل جديد لاسم المريض الكامل
    first_name = serializers.CharField(source='doctor.first_name', read_only=True)
    last_name = serializers.CharField(source='doctor.last_name', read_only=True)
    department_name = serializers.CharField(source='department.department_name', read_only=True)
    hospital_name = serializers.CharField(source='hospital.hospital_name', read_only=True)

    class Meta:
        model = Appointment
        fields = [
            'id',
            'patient',
            'doctor',
            'hospital',
            'first_name',
            'last_name',
            'department',
            'department_name',
            'appointment_date',
            'hospital_name',
            'status',
            'patient_name',
        ]
    def get_patient_name(self, obj):
    # الوصول إلى خاصية name في نموذج Patient
        return obj.patient.name