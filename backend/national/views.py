from django.contrib.auth.decorators import login_required, permission_required
from django.views.decorators.http import require_GET
from django.http import JsonResponse
from backend.permissions import group_required
from certificat.models import CertificatElectronique, CertificatPapier, CertificatInsee
from django.db.models import Count, Sum, F, FloatField
from django.db.models.expressions import Window
from django.db.models.functions import Lag, Cast, Round


#@require_GET
@login_required
#@group_required('national')
#@permission_required('national.view_t1')
def National10View(request):
    return JsonResponse({
        'electronique' :
            list(
                CertificatElectronique.objects
                    .values('annee_deces')
                    .annotate(nombre = Count('id'))
            )
        ,
        'papier' :
            list(
                CertificatPapier.objects
                    .values('annee_deces')
                    .annotate(nombre = Sum('nombre'))
            )
        ,
    }, safe = False)

@login_required
def National11View(request):
    return JsonResponse({
        'horsEtablissement' :
            list(
                CertificatElectronique.objects
                    .values('annee_deces')
                    .annotate(nombre = Count('id'))
                    .filter(hors_etablissement=1)
                    .order_by('annee_deces')
            )
        ,
        'enEtablissement' :
            list(
                CertificatElectronique.objects
                    .values('annee_deces')
                    .annotate(nombre = Count('id'))
                    .filter(hors_etablissement=0)
                    .order_by('annee_deces')
            )
        ,
    }, safe = False)

@login_required
def National12View(request):
    return JsonResponse({
        'enEtablissement' :
            list(CertificatElectronique.objects
                .values('annee_deces', 'trimestre_deces')
                .annotate(
                    region_id = F('lieu_deces_geo_code_departement__region_id'),
                    region_libelle = F('lieu_deces_geo_code_departement__region__libelle'),
                    nombre = Count('id')
                )
                .filter(hors_etablissement = 0)
                .order_by('lieu_deces_geo_code_departement__region__libelle', 'annee_deces', 'trimestre_deces')
            )
        ,
    }, safe = False)

@login_required
def National13View(request):
    return JsonResponse({
        'enEtablissement' :
            list(CertificatElectronique.objects
                .values('annee_deces', 'trimestre_deces')
                .annotate(nombre = Count('id'))
                .filter(hors_etablissement = 0)
                .order_by('annee_deces', 'trimestre_deces')
            )
        ,
    }, safe = False)

@login_required
def National30View(request):
    return JsonResponse({
        'electronique' :
            list(CertificatElectronique.objects
                .values('annee_deces')
                .annotate(
                    departement_id = F('lieu_deces_geo_code_departement__id'),
                    departement_libelle = F('lieu_deces_geo_code_departement__libelle'),
                    nombre = Count('id'),
                    evolution = Round((F('nombre') - Window(expression = Lag(Count('id')), partition_by = [F('lieu_deces_geo_code_departement')], order_by = [F('annee_deces')])) * Cast(100, output_field=FloatField()) / Window(expression = Lag(Count('id')), partition_by = [F('lieu_deces_geo_code_departement')], order_by = [F('annee_deces')]))
                )
                .order_by('lieu_deces_geo_code_departement__id', 'annee_deces')
            )
        ,
    }, safe = False)
