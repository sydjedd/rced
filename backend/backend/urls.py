"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import include, path, re_path

"""
from django.views.decorators.csrf import ensure_csrf_cookie
from django.conf import settings

if settings.ENV == 'development':
    from django.http import HttpResponseRedirect
    def index(request):
        return HttpResponseRedirect(settings.FRONTEND_URL)
else:
    from django.shortcuts import render
    @ensure_csrf_cookie
    def index(request):
        return render(request, 'index.html', context=None)
"""

urlpatterns = [
    path('admin/', admin.site.urls, name = 'admin'),
    path('auth/', include('authentication.urls'), name = 'auth'),
    path('referentiel/', include('referentiel.urls'), name = 'referentiel'),
    path('national/', include('national.urls'), name = 'national')
    #path('accounts/', include('django.contrib.auth.urls')),
    #path('', index, name='index'),
    #re_path(r'^.*$', index, name='index'),
]

# Modification des titres dans la partie admin
admin.site.site_header = 'RCED Administration'
admin.site.site_title = 'RCED'
admin.site.index_title = 'RCED Administration'
admin.site.site_urls = '/admin'
