from .serializers import UserCreateSerializers
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth import get_user_model
from .serializers import UserCreateSerializers
User=get_user_model()





# @api_view(['GET'])
# def Users_List(request):
#     users=User.objects.all()
#     serializers=UserCreateSerializers(users , )

