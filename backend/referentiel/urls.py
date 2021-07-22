from django.urls import path
from . import views


urlpatterns = [
    path('region/', views.RegionView, name = 'region'),
    path('departement/', views.DepartementView, name = 'departement'),
    path('lieu_deces/', views.LieuDecesView, name = 'lieu_deces')
]
