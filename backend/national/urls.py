from django.urls import path
from . import views


urlpatterns = [
    path('n1/', views.National1View, name = 'n1'),
    path('n2/', views.National2View, name = 'n2'),
    path('n3/', views.National3View, name = 'n3'),
    path('n4/', views.National4View, name = 'n4'),
    path('n5/', views.National5View, name = 'n5'),
]
