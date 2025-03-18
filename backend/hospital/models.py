from django.db import models
import datetime 
# نموذج الأقسام داخل المستشفى (Form 3)
class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)  # اسم القسم
    bed_count = models.PositiveIntegerField(default=0)  # عدد الأسرّة في القسم

    def __str__(self):
        return self.name  # عرض اسم القسم في الواجهة

# نموذج العاملين (Form 1)
class Employee(models.Model):
    JOB_TYPES = (
        ('doctor', 'Doctor'),
        ('nurse', 'Nurse'),
        ('staff', 'Staff'),
    )
    name = models.CharField(max_length=100)  # اسم العامل
    national_id = models.CharField(max_length=14, unique=True)  # الرقم القومي
    job_type = models.CharField(max_length=20, choices=JOB_TYPES)  # نوع الوظيفة
    specialization = models.CharField(max_length=100, blank=True, null=True)  # التخصص (للأطباء فقط)
    phone = models.CharField(max_length=15)  # رقم الهاتف
    hire_date = models.DateField()  # تاريخ التعيين
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)  # القسم التابع له

    def __str__(self):
        return f"{self.name} ({self.job_type})"

# نموذج المرضى (Form 2)
class Patient(models.Model):
    name = models.CharField(max_length=100)  # اسم المريض
    national_id = models.CharField(max_length=14, unique=True)  # الرقم القومي
    age = models.PositiveIntegerField()  # العمر
    gender = models.CharField(max_length=10, choices=(('male', 'Male'), ('female', 'Female')))  # الجنس
    phone = models.CharField(max_length=15)  # رقم الهاتف
    address = models.TextField()  # العنوان
    registration_date = models.DateField(auto_now_add=True)  # تاريخ التسجيل (تلقائي)

    def __str__(self):
        return self.name

# نموذج حجز الكشف (Form 4)
class Appointment(models.Model):
    APPOINTMENT_TYPES = (
        ('general', 'General Checkup'),
        ('cardiology', 'Cardiology'),
        ('orthopedics', 'Orthopedics'),
        ('neurology', 'Neurology'),
        # يمكنك إضافة أنواع أخرى حسب الحاجة
    )

    STATUS_CHOICES = (
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    )

    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)  # المريض
    doctor = models.ForeignKey(Employee, on_delete=models.SET_NULL, null=True, limit_choices_to={'job_type': 'doctor'})  # الطبيب
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True)  # القسم
    appointment_type = models.CharField(max_length=50, choices=APPOINTMENT_TYPES)  # نوع الكشف
    appointment_date = models.DateField()  # تاريخ ووقت الحجز
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='confirmed')  # حالة الحجز

    def __str__(self):
        return f"{self.patient.name} - {self.appointment_type} on {self.appointment_date}"

# نموذج العمليات والإجراءات (Form 5)
class Operation(models.Model):
    OPERATION_STATUS = (
        ('successful', 'Successful'),
        ('failed', 'Failed'),
        ('ongoing', 'Ongoing'),
    )

    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)  # المريض
    doctor = models.ForeignKey(Employee, on_delete=models.SET_NULL, null=True, limit_choices_to={'job_type': 'doctor'})  # الطبيب المسؤول
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True)  # القسم
    operation_type = models.CharField(max_length=100)  # نوع العملية
    operation_date = models.DateField()  # تاريخ ووقت العملية
    status = models.CharField(max_length=20, choices=OPERATION_STATUS)  # حالة العملية
    cost = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)  # تكلفة العملية

    def __str__(self):
        return f"{self.operation_type} for {self.patient.name} on {self.operation_date}"