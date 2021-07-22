from django.urls import path
from . import views


urlpatterns = [
    path('n10/', views.National10View, name = 'n10'),
    path('n11/', views.National11View, name = 'n11'),
    path('n12/', views.National12View, name = 'n12'),
    path('n13/', views.National13View, name = 'n13'),
    path('n20/', views.National20View, name = 'n20'),
    path('n21/', views.National21View, name = 'n21'),
    path('n22/', views.National22View, name = 'n22'),
    path('n30/', views.National30View, name = 'n30'),
    path('n50/', views.National50View, name = 'n50'),
    path('n51/', views.National51View, name = 'n51'),
    path('n52/', views.National52View, name = 'n52'),
    path('n53/', views.National53View, name = 'n53'),
]
