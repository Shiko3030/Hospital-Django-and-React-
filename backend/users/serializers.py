from djoser.serializers import   UserCreateSerializer
from django.contrib.auth import get_user_model
User=get_user_model()




class UserCreateSerializers(UserCreateSerializer):
    class Meta (UserCreateSerializer):
        model = User
        fields=['id','username','passowrd']