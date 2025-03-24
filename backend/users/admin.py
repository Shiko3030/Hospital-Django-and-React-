from django.contrib import admin
from .models import UserAccount
from django.contrib.auth import get_user_model
User = get_user_model()
class UserAccount(admin.ModelAdmin):
    list_display = ('id', 'username','is_active','is_staff' )
    list_display_links = ('id', 'username' )
    list_per_page = 25

admin.site.register(User,UserAccount)
