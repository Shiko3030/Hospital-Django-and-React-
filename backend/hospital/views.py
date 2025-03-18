from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import DepartmentSerializers, EmployeeSerializers, PatientSerializers, AppointmentSerializers, OperationSerializers
from rest_framework import status
from .models import Department ,Employee ,Patient ,Appointment ,Operation



# ==============================
#       LIST ALL DEPARTMENTS
# ==============================
@api_view(['GET'])
def Department_List(request):
    departments = Department.objects.all()
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
    employees = Employee.objects.all()
    serializers = EmployeeSerializers(employees, many=True)
    return Response(serializers.data)


# ==============================
#       LIST ALL Doctors
# ==============================
@api_view(['GET'])
def Doctors_List(request):
    Doctors = Employee.objects.filter(job_type='doctor')
    serializers = EmployeeSerializers(Doctors, many=True)
    return Response(serializers.data)


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
@api_view(['GET'])
def Appointment_List(request):
    appointments = Appointment.objects.all()
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
    patientes = Patient.objects.all()
    serializers = PatientSerializers(patientes, many=True)
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
#       LIST ALL Operation
# ==============================
@api_view(['GET'])
def Operation_List(request):
    operationes = Operation.objects.all()
    serializers = OperationSerializers(operationes, many=True)
    return Response(serializers.data)

# ==============================
#       Get Operation
# ==============================
@api_view(['GET'])
def Operation_Get(request,pk):
    try :
        operation = Operation.objects.get(id=pk)
        serializers = OperationSerializers(operation)
        return Response(serializers.data)
    except Operation.DoesNotExist:
        return Response(
            {'error': 'Operation not found!'},
            status=status.HTTP_404_NOT_FOUND
        )



# ==============================
#        CREATE Operation
# ==============================
@api_view(['POST'])
def Create_Operation(request):
    serializer = OperationSerializers(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(
            {'success': 'Operation created successfully!'},
            status=status.HTTP_201_CREATED
        )
    
    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )

# ==============================
#        UPDATE Operation
# ==============================
@api_view(['PUT', 'PATCH'])
def Update_Operation(request, pk):
    try:
        operationes = Operation.objects.get(id=pk)
    except Operation.DoesNotExist:
        return Response(
            {'error': 'Operation not found!'},
            status=status.HTTP_404_NOT_FOUND
        )
    
    serializer = OperationSerializers(operationes, data=request.data, partial=True)  # `partial=True` للسماح بتحديث جزئي
    if serializer.is_valid():
        serializer.save()
        return Response(
            {'success': 'operationes updated successfully!'},
            status=status.HTTP_200_OK
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )

# ==============================
#        DELETE Operation
# ==============================
@api_view(['DELETE'])
def Delete_Operation(request, pk):
    try:
        operationes = Operation.objects.get(id=pk)
        operationes.delete()
        return Response(
            {'success': 'operationes deleted successfully!'},
            status=status.HTTP_204_NO_CONTENT
        )
    except Operation.DoesNotExist:
        return Response(
            {'error': 'Operation not found!'},
            status=status.HTTP_404_NOT_FOUND
        )