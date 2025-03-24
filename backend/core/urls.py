from django.contrib import admin
from django.urls import path , include 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),  # إضافة '/' في النهاية
    path('auth/', include('djoser.urls.jwt')),  # توحيد نفس المسار
    path('api/', include('hospital.urls'))
]
