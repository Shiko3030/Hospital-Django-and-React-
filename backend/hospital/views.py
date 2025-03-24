from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import DepartmentSerializers, EmployeeSerializers, PatientSerializers, AppointmentSerializers , HospitalSerializer , JobTypeSerializers
from rest_framework import status
from .models import Department ,Employee ,Patient ,Appointment, JobType ,Hospital
from django.db.models import Q


# ==============================
#       LIST ALL DEPARTMENTS
# ==============================
@api_view(['GET'])
def Department_List(request):
    # الحصول على استعلام البحث من الطلب
    search_query = request.GET.get('search', '')
    
    # جلب جميع الأقسام
    departments = Department.objects.all()
    
    # تطبيق الفلترة إذا كان هناك استعلام بحث
    if search_query:
        departments = departments.filter(
            Q(department_name__icontains=search_query) |        # اسم القسم
            Q(hospital__hospital_name__icontains=search_query)  # اسم المستشفى
        )
    
    # تحويل البيانات إلى JSON
    serializers = DepartmentSerializers(departments, many=True)
    return Response(serializers.data)

# ==============================
#       Get DEPARTMENT
# ==============================
@api_view(['GET'])
def Department_Get(request,pk):
    try :
        department = Department.objects.get(id=pk)
        serializers = DepartmentSerializers(department)
        return Response(serializers.data)
    except Department.DoesNotExist:
        return Response(
            {'error': 'Department not found!'},
            status=status.HTTP_404_NOT_FOUND
        )
   

# ==============================
#        CREATE DEPARTMENT
# ==============================
@api_view(['POST'])
def Create_Department(request):
    serializer = DepartmentSerializers(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(
            {'success': 'Department created successfully!'},
            status=status.HTTP_201_CREATED
        )
    
    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )

# ==============================
#        UPDATE DEPARTMENT
# ==============================
@api_view(['PUT', 'PATCH'])
def Update_Department(request, pk):
    try:
        department = Department.objects.get(id=pk)
    except Department.DoesNotExist:
        return Response(
            {'error': 'Department not found!'},
            status=status.HTTP_404_NOT_FOUND
        )
    
    serializer = DepartmentSerializers(department, data=request.data, partial=True)  # `partial=True` للسماح بتحديث جزئي
    if serializer.is_valid():
        serializer.save()
        return Response(
            {'success': 'Department updated successfully!'},
            status=status.HTTP_200_OK
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )

# ==============================
#        DELETE DEPARTMENT
# ==============================
@api_view(['DELETE'])
def Delete_Department(request, pk):
    try:
        department = Department.objects.get(id=pk)
        department.delete()
        return Response(
            {'success': 'Department deleted successfully!'},
            status=status.HTTP_204_NO_CONTENT
        )
    except Department.DoesNotExist:
        return Response(
            {'error': 'Department not found!'},
            status=status.HTTP_404_NOT_FOUND
        )



########################################################################################################################




# ==============================
#       LIST ALL Employees
# ==============================
@api_view(['GET'])
def Employee_List(request):
    # الحصول على استعلام البحث من الطلب
    search_query = request.GET.get('search', '')
    
    # جلب جميع الموظفين
    employees = Employee.objects.all()
    
    # تطبيق الفلترة إذا كان هناك استعلام بحث
    if search_query:
        employees = employees.filter(
            Q(first_name__icontains=search_query) |           # الاسم الأول
            Q(last_name__icontains=search_query) |            # الاسم الأخير
            Q(specialty__icontains=search_query) |            # التخصص
            Q(license_number__icontains=search_query) |       # رقم الترخيص
            Q(job__job_name__icontains=search_query) |        # اسم الوظيفة
            Q(department__department_name__icontains=search_query) |  # اسم القسم
            Q(hospital__hospital_name__icontains=search_query)        # اسم المستشفى
        )
    
    # تحويل البيانات إلى JSON
    serializers = EmployeeSerializers(employees, many=True)
    return Response(serializers.data)
# ==============================
#       LIST ALL Doctors
# ==============================
@api_view(['GET'])
def Doctors_List(request):
    try:
        # فلتر الأطباء بناءً على job_name داخل JobType
        doctors = Employee.objects.filter(job__job_name__iexact='doctor')
        serializer = EmployeeSerializers(doctors, many=True)
        return Response(serializer.data)
    except Employee.DoesNotExist:
        return Response({"error": "No doctors found."}, status=status.HTTP_404_NOT_FOUND)
  

# ==============================
#       Get Employee
# ==============================
@api_view(['GET'])
def Employee_Get(request,pk):
    try :
        employee = Employee.objects.get(id=pk)
        serializers = EmployeeSerializers(employee)
        return Response(serializers.data)
    except Employee.DoesNotExist:
        return Response(
            {'error': 'Employee not found!'},
            status=status.HTTP_404_NOT_FOUND
        )


# ==============================
#        CREATE Employee
# ==============================
@api_view(['POST'])
def Create_Employee(request):
    serializer = EmployeeSerializers(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(
            {'success': 'Employee created successfully!'},
            status=status.HTTP_201_CREATED
        )
    
    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )

# ==============================
#        UPDATE Employee
# ==============================
@api_view(['PUT', 'PATCH'])
def Update_Employee(request, pk):
    try:
        employees = Employee.objects.get(id=pk)
    except Employee.DoesNotExist:
        return Response(
            {'error': 'Employee not found!'},
            status=status.HTTP_404_NOT_FOUND
        )
    
    serializer = EmployeeSerializers(employees, data=request.data, partial=True)  # `partial=True` للسماح بتحديث جزئي
    if serializer.is_valid():
        serializer.save()
        return Response(
            {'success': 'Employee updated successfully!'},
            status=status.HTTP_200_OK
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )

# ==============================
#        DELETE Employee
# ==============================
@api_view(['DELETE'])
def Delete_Employee(request, pk):
    try:
        employees = Employee.objects.get(id=pk)
        employees.delete()
        return Response(
            {'success': 'Employee deleted successfully!'},
            status=status.HTTP_204_NO_CONTENT
        )
    except Employee.DoesNotExist:
        return Response(
            {'error': 'Employee not found!'},
            status=status.HTTP_404_NOT_FOUND
        )




########################################################################################################################




# ==============================
#       LIST ALL Appointments
# ==============================
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def Appointment_List(request):
    # الحصول على استعلام البحث من الطلب
    search_query = request.GET.get('search', '')
    
    # جلب جميع المواعيد
    appointments = Appointment.objects.all()
    
    # تطبيق الفلترة إذا كان هناك استعلام بحث
    if search_query:
        appointments = appointments.filter(
            Q(patient__first_name__icontains=search_query) |  # اسم المريض الأول
            Q(patient__last_name__icontains=search_query) |   # اسم المريض الأخير
            Q(doctor__first_name__icontains=search_query) |   # اسم الطبيب الأول
            Q(doctor__last_name__icontains=search_query) |    # اسم الطبيب الأخير
            Q(department__department_name__icontains=search_query) |  # اسم القسم
            Q(hospital__hospital_name__icontains=search_query) |      # اسم المستشفى
            Q(appointment_date__icontains=search_query) |             # تاريخ الموعد
            Q(status__icontains=search_query)                         # الحالة
        )
    
    # تحويل البيانات إلى JSON
    serializers = AppointmentSerializers(appointments, many=True)
    return Response(serializers.data)

# ==============================
#       Get Appointment
# ==============================
@api_view(['GET'])
def Appointment_Get(request,pk):
    try :
        appointment = Appointment.objects.get(id=pk)
        serializers = AppointmentSerializers(appointment)
        return Response(serializers.data)
    except Appointment.DoesNotExist:
        return Response(
            {'error': 'Appointment not found!'},
            status=status.HTTP_404_NOT_FOUND
        )


# ==============================
#        CREATE Appointment
# ==============================
@api_view(['POST'])
def Create_Appointment(request):
    serializer = AppointmentSerializers(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(
            {'success': 'Appointment created successfully!'},
            status=status.HTTP_201_CREATED
        )
    
    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


# ==============================
#        UPDATE Appointment
# ==============================
@api_view(['PUT', 'PATCH'])
def Update_Appointment(request, pk):
    try:
        appointments = Appointment.objects.get(id=pk)
    except Appointment.DoesNotExist:
        return Response(
            {'error': 'Appointment not found!'},
            status=status.HTTP_404_NOT_FOUND
        )
    
    serializer = AppointmentSerializers(appointments, data=request.data, partial=True)  # `partial=True` للسماح بتحديث جزئي
    if serializer.is_valid():
        serializer.save()
        return Response(
            {'success': 'Appointment updated successfully!'},
            status=status.HTTP_200_OK
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


# ==============================
#        DELETE Appointment
# ==============================
@api_view(['DELETE'])
def Delete_Appointment(request, pk):
    try:
        appointments = Appointment.objects.get(id=pk)
        appointments.delete()
        return Response(
            {'success': 'Appointment deleted successfully!'},
            status=status.HTTP_204_NO_CONTENT
        )
    except Appointment.DoesNotExist:
        return Response(
            {'error': 'Appointment not found!'},
            status=status.HTTP_404_NOT_FOUND
        )





########################################################################################################################
# ==============================
#       LIST ALL Patient
# ==============================
@api_view(['GET'])
def Patient_List(request):
    # الحصول على استعلام البحث من الطلب
    search_query = request.GET.get('search', '')
    
    # جلب جميع المرضى
    patients = Patient.objects.all()
    
    # تطبيق الفلترة إذا كان هناك استعلام بحث
    if search_query:
        patients = patients.filter(
            Q(first_name__icontains=search_query) |          # الاسم الأول
            Q(last_name__icontains=search_query) |           # الاسم الأخير
            Q(gender__icontains=search_query) |              # الجنس
            Q(date_of_birth__icontains=search_query) |       # تاريخ الميلاد (كسلسلة نصية)
            Q(phone_number__icontains=search_query) |        # رقم الهاتف
            Q(email__icontains=search_query) |               # البريد الإلكتروني
            Q(hospital__hospital_name__icontains=search_query)  # اسم المستشفى
        )
    
    # تحويل البيانات إلى JSON
    serializers = PatientSerializers(patients, many=True)
    return Response(serializers.data)
# ==============================
#       Get Patient
# ==============================
@api_view(['GET'])
def Patient_Get(request,pk):
    try :
        patient = Patient.objects.get(id=pk)
        serializers = PatientSerializers(patient)
        return Response(serializers.data)
    except Patient.DoesNotExist:
        return Response(
            {'error': 'Patient not found!'},
            status=status.HTTP_404_NOT_FOUND
        )


# ==============================
#        CREATE Patient
# ==============================
@api_view(['POST'])
def Create_Patient(request):
    serializer = PatientSerializers(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(
            {'success': 'Patient created successfully!'},
            status=status.HTTP_201_CREATED
        )
    
    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )

# ==============================
#        UPDATE Patient
# ==============================
@api_view(['PUT', 'PATCH'])
def Update_Patient(request, pk):
    try:
        patientes = Patient.objects.get(id=pk)
    except Patient.DoesNotExist:
        return Response(
            {'error': 'Patient not found!'},
            status=status.HTTP_404_NOT_FOUND
        )
    
    serializer = PatientSerializers(patientes, data=request.data, partial=True)  # `partial=True` للسماح بتحديث جزئي
    if serializer.is_valid():
        serializer.save()
        return Response(
            {'success': 'patientes updated successfully!'},
            status=status.HTTP_200_OK
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )

# ==============================
#        DELETE Patient
# ==============================
@api_view(['DELETE'])
def Delete_Patient(request, pk):
    try:
        patientes = Patient.objects.get(id=pk)
        patientes.delete()
        return Response(
            {'success': 'patientes deleted successfully!'},
            status=status.HTTP_204_NO_CONTENT
        )
    except Patient.DoesNotExist:
        return Response(
            {'error': 'Patient not found!'},
            status=status.HTTP_404_NOT_FOUND
        )

########################################################################################################################
# ==============================
#       LIST ALL typejope
# ==============================
@api_view(['GET'])
def JobType_List(request):
    # الحصول على استعلام البحث من الطلب
    search_query = request.GET.get('search', '')
    
    # جلب جميع أنواع الوظائف
    job_types = JobType.objects.all()
    
    # تطبيق الفلترة إذا كان هناك استعلام بحث
    if search_query:
        job_types = job_types.filter(
            Q(job_name__icontains=search_query)  # البحث في اسم الوظيفة
        )
    
    # تحويل البيانات إلى JSON
    serializers = JobTypeSerializers(job_types, many=True)
    return Response(serializers.data)
# ==============================
#       Get typejope
# ==============================
@api_view(['GET'])
def JobType_Get(request,pk):
    try :
        typejopes = JobType.objects.get(id=pk)
        serializers = JobTypeSerializers(typejopes)
        return Response(serializers.data)
    except JobType.DoesNotExist:
        return Response(
            {'error': 'typejope not found!'},
            status=status.HTTP_404_NOT_FOUND
        )
# ==============================
#        CREATE typejope
# ==============================
@api_view(['POST'])
def Create_JobType(request):
    serializer = JobTypeSerializers(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(
            {'success': 'typejope created successfully!'},
            status=status.HTTP_201_CREATED
        )
    
    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )
# ==============================
#        UPDATE typejope
# ==============================
@api_view(['PUT', 'PATCH'])
def Update_JobType(request, pk):
    try:
        typejopes = JobType.objects.get(id=pk)
    except JobType.DoesNotExist:
        return Response(
            {'error': 'JobType not found!'},
            status=status.HTTP_404_NOT_FOUND
        )
    
    serializer = JobTypeSerializers(typejopes, data=request.data, partial=True)  # `partial=True` للسماح بتحديث جزئي
    if serializer.is_valid():
        serializer.save()
        return Response(
            {'success': 'JobType updated successfully!'},
            status=status.HTTP_200_OK
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )

# ==============================
#        DELETE JobTypes
# ==============================
@api_view(['DELETE'])
def Delete_JobType(request, pk):
    try:
        jobtypes = JobType.objects.get(id=pk)
        jobtypes.delete()
        return Response(
            {'success': 'JobTypes deleted successfully!'},
            status=status.HTTP_204_NO_CONTENT
        )
    except JobType.DoesNotExist:
        return Response(
            {'error': 'JobType not found!'},
            status=status.HTTP_404_NOT_FOUND
        )

# ==============================
#       LIST ALL Hospitals
# ==============================
@api_view(['GET'])
def Hospital_List(request):
    # الحصول على استعلام البحث من الطلب
    search_query = request.GET.get('search', '')
    
    # جلب جميع المستشفيات
    hospitals = Hospital.objects.all()
    
    # تطبيق الفلترة إذا كان هناك استعلام بحث
    if search_query:
        hospitals = hospitals.filter(
            Q(hospital_name__icontains=search_query) |
            Q(address__icontains=search_query) |
            Q(phone_number__icontains=search_query) |
            Q(email__icontains=search_query)
        )
    
    # تحويل البيانات إلى JSON
    serializers = HospitalSerializer(hospitals, many=True)
    return Response(serializers.data)

# ==============================
#       Get Hospital
# ==============================
@api_view(['GET'])
def Hospital_Get(request, pk):
    try:
        hospital = Hospital.objects.get(id=pk)
        serializer = HospitalSerializer(hospital)
        return Response(serializer.data)
    except Hospital.DoesNotExist:
        return Response(
            {'error': 'Hospital not found!'},
            status=status.HTTP_404_NOT_FOUND
        )

# ==============================
#        CREATE Hospital
# ==============================
@api_view(['POST'])
def Create_Hospital(request):
    serializer = HospitalSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(
            {'success': 'Hospital created successfully!'},
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )

# ==============================
#        UPDATE Hospital
# ==============================
@api_view(['PUT', 'PATCH'])
def Update_Hospital(request, pk):
    try:
        hospital = Hospital.objects.get(id=pk)
    except Hospital.DoesNotExist:
        return Response(
            {'error': 'Hospital not found!'},
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = HospitalSerializer(hospital, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {'success': 'Hospital updated successfully!'},
            status=status.HTTP_200_OK
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )

# ==============================
#        DELETE Hospital
# ==============================
@api_view(['DELETE'])
def Delete_Hospital(request, pk):
    try:
        hospital = Hospital.objects.get(id=pk)
        hospital.delete()
        return Response(
            {'success': 'Hospital deleted successfully!'},
            status=status.HTTP_204_NO_CONTENT
        )
    except Hospital.DoesNotExist:
        return Response(
            {'error': 'Hospital not found!'},
            status=status.HTTP_404_NOT_FOUND
        )
