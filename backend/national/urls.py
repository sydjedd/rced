from django.urls import path
from . import views


urlpatterns = [
    path('n10/', views.National10View, name = 'n10'),
    path('n11/', views.National11View, name = 'n11'),
    path('n12/', views.National12View, name = 'n12'),
    path('n13/', views.National13View, name = 'n13'),
    path('n30/', views.National30View, name = 'n30'),
]
