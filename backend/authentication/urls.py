from django.urls import path
from . import views


urlpatterns = [
    path('csrf/', views.get_csrf, name='csrf'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('check/', views.check, name='check'),
]
