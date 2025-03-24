from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserAccountManager(BaseUserManager):
    # إنشاء مستخدم عادي
    def create_user(self, username, password=None):
        if not username:
            raise ValueError('User must have a username')

        user = self.model(username=username)
        user.set_password(password)  # تشفير كلمة المرور
        user.save(using=self._db)  # استخدام قاعدة البيانات الصحيحة
        return user

    # إنشاء مستخدم مشرف (superuser)
    def create_superuser(self, username,password):
        user = self.create_user(username, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255, unique=True)  # تغيير email إلى username
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    # تحديد أن تسجيل الدخول يكون عبر اسم المستخدم
    USERNAME_FIELD = 'username'  # تغيير من 'email' إلى 'username'
    REQUIRED_FIELDS = ['password']

    objects = UserAccountManager()  # ربط الكلاس بمدير المستخدمين

    def __str__(self):
        return self.username  # تغيير من email إلى username

    class Meta:
        verbose_name = "User Account"
        verbose_name_plural = "User Accounts"