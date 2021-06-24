from django.contrib import admin
from .models import *
from import_export import resources
from import_export.admin import ImportExportModelAdmin


class RegionResource(resources.ModelResource):

    class Meta:
        model = Region


class RegionAdmin(ImportExportModelAdmin):
    list_display = ('id', 'libelle',)
    search_fields = ('libelle',)
    resource_class = RegionResource


class DepartementResource(resources.ModelResource):

    class Meta:
        model = Departement


class DepartementAdmin(ImportExportModelAdmin):
    list_display = ('id', 'libelle')
    search_fields = ('libelle',)
    resource_class = DepartementResource


class LieuDecesResource(resources.ModelResource):

    class Meta:
        model = LieuDeces


class LieuDecesAdmin(ImportExportModelAdmin):
    list_display = ('id', 'libelle')
    search_fields = ('libelle',)
    resource_class = LieuDecesResource


admin.site.register(Region, RegionAdmin)
admin.site.register(Departement, DepartementAdmin)
admin.site.register(LieuDeces, LieuDecesAdmin)
