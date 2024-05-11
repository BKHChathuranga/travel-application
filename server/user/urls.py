from django.urls import path
from . import views
from django.contrib import admin

urlpatterns = [
  path('admin/', admin.site.urls),
	path('register/', views.UserRegister.as_view(), name='register'),
	path('login/', views.UserLogin.as_view(), name='login'),
	path('logout/', views.UserLogout.as_view(), name='logout'),
	path('user/', views.UserView.as_view(), name='user'),
]