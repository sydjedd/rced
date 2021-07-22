from django.contrib.auth.decorators import login_required, permission_required
from django.views.decorators.http import require_GET
from django.http import JsonResponse
from backend.permissions import group_required
from certificat.models import CertificatElectronique, CertificatPapier, CertificatInsee
from django.db.models import Count, Sum, Max, Min, Value, F, FloatField, DateField
from django.db.models.expressions import Window
from django.db.models.functions import Lag, Cast, Round, Trunc, Concat


@login_required
#@require_GET
#@group_required('national')
#@permission_required('national.view_t1')
def National10View(request):
    return JsonResponse({
        'electronique' :
            list(
                CertificatElectronique.objects
                    .values('annee_deces')
                    .annotate(nombre = Count('id'))
                    .order_by('annee_deces')
            )
        ,
        'papier' :
            list(
                CertificatPapier.objects
                    .values('annee_deces')
                    .annotate(nombre = Sum('nombre'))
                    .order_by('annee_deces')
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
            list(
                CertificatElectronique.objects
                    .values('annee_deces', 'trimestre_deces')
                    .annotate(
                        region = F('departement__region__libelle'),
                        nombre = Count('id')
                    )
                    .filter(hors_etablissement = 0)
                    .order_by('departement__region__libelle', 'annee_deces', 'trimestre_deces')
            )
        ,
    }, safe = False)

@login_required
def National13View(request):
    return JsonResponse({
        'enEtablissement' :
            list(
                CertificatElectronique.objects
                    .values('annee_deces', 'trimestre_deces')
                    .annotate(nombre = Count('id'))
                    .filter(hors_etablissement = 0)
                    .order_by('annee_deces', 'trimestre_deces')
            )
        ,
    }, safe = False)

@login_required
def National20View(request):
    return JsonResponse({
        'electronique' :
            list(
                CertificatElectronique.objects
                    .values('semaine_deces_annee', 'semaine_deces')
                    .annotate(
                        nombre = Count('id'),
                        date_deces_debut = Trunc(Min('date_deces'), 'day', output_field = DateField()),
                        date_deces_fin = Trunc(Max('date_deces'), 'day', output_field = DateField())
                    )
                    .filter(semaine_deces_annee__in = [2020, 2021])
            )
        ,
        'total' :
            list(
                CertificatInsee.objects
                    .values('semaine_deces_annee', 'semaine_deces')
                    .annotate(
                        nombre = Count('id'),
                        date_deces_debut = Trunc(Min('date_deces'), 'day', output_field = DateField()),
                        date_deces_fin = Trunc(Max('date_deces'), 'day', output_field = DateField())
                    )
                    .filter(semaine_deces_annee__in = [2020, 2021])
            )
        ,
    }, safe = False)

@login_required
def National21View(request):
    return JsonResponse({
        'electronique' :
            list(
                CertificatElectronique.objects
                    .values('semaine_deces_annee', 'semaine_deces')
                    .annotate(
                        region = F('departement__region__libelle'),
                        nombre = Count('id')
                    )
                    .filter(semaine_deces_annee__gte = 2020)
                    .order_by('departement__region__libelle', 'semaine_deces_annee', 'semaine_deces')
            )
        ,
        'total' :
            list(
                CertificatInsee.objects
                    .values('semaine_deces_annee', 'semaine_deces')
                    .annotate(
                        region = F('departement__region__libelle'),
                        nombre = Count('id')
                    )
                    .filter(semaine_deces_annee__gte = 2020)
                    .order_by('departement__region__libelle', 'semaine_deces_annee', 'semaine_deces')
            )
        ,
    }, safe = False)

@login_required
def National22View(request):
    return JsonResponse({
        'electronique' :
            list(
                CertificatElectronique.objects
                    .values('semaine_deces_annee', 'semaine_deces')
                    .annotate(
                        departement = Concat(F('departement__id'), Value(' - '), F('departement__libelle')),
                        nombre = Count('id'),
                    )
                    .filter(semaine_deces_annee__gte = 2020)
                    .order_by('departement__id', 'semaine_deces_annee', 'semaine_deces')
            )
        ,
        'total' :
            list(
                CertificatInsee.objects
                    .values('semaine_deces_annee', 'semaine_deces')
                    .annotate(
                        departement = Concat(F('departement__id'), Value(' - '), F('departement__libelle')),
                        nombre = Count('id'),
                    )
                    .filter(semaine_deces_annee__gte = 2020)
                    .order_by('departement__id', 'semaine_deces_annee', 'semaine_deces')
            )
        ,
    }, safe = False)

@login_required
def National30View(request):
    return JsonResponse({
        'electronique' :
            list(
                CertificatElectronique.objects
                    .values('annee_deces')
                    .annotate(
                        departement = Concat(F('departement__id'), Value(' - '), F('departement__libelle')),
                        nombre = Count('id'),
                        evolution = Round((F('nombre') - Window(expression = Lag(Count('id')), partition_by = [F('departement')], order_by = [F('annee_deces')])) * Cast(100, output_field = FloatField()) / Window(expression = Lag(Count('id')), partition_by = [F('departement')], order_by = [F('annee_deces')]))
                    )
                    .order_by('departement__id', 'annee_deces')
            )
        ,
    }, safe = False)

@login_required
def National50View(request):
    return JsonResponse({
        'electronique' :
            list(
                CertificatElectronique.objects
                    .values('annee_deces')
                    .annotate(
                        region = F('departement__region__libelle'),
                        nombre = Count('id')
                    )
                    .filter(annee_deces__lte = 2019)
                    .order_by('departement__region__libelle', 'annee_deces')
            )
        ,
        'papier' :
            list(
                CertificatPapier.objects
                    .values('annee_deces')
                    .annotate(
                        region = F('departement__region__libelle'),
                        nombre = Count('id')
                    )
                    .filter(annee_deces__lte = 2019)
                    .order_by('departement__region__libelle', 'annee_deces')
            )
        ,
    }, safe = False)

@login_required
def National51View(request):
    return JsonResponse({
        'electronique' :
            list(
                CertificatElectronique.objects
                    .values('annee_deces')
                    .annotate(
                        departement = Concat(F('departement__id'), Value(' - '), F('departement__libelle')),
                        nombre = Count('id')
                    )
                    .filter(annee_deces__lte = 2019)
                    .order_by('departement__id', 'annee_deces')
            )
        ,
        'papier' :
            list(
                CertificatPapier.objects
                    .values('annee_deces')
                    .annotate(
                        departement = Concat(F('departement__id'), Value(' - '), F('departement__libelle')),
                        nombre = Count('id')
                    )
                    .filter(annee_deces__lte = 2019)
                    .order_by('departement__id', 'annee_deces')
            )
        ,
    }, safe = False)

@login_required
def National52View(request):
    return JsonResponse({
        'electronique' :
            list(
                CertificatElectronique.objects
                    .values('annee_deces')
                    .annotate(
                        lieu_deces = F('lieu_deces__libelle'),
                        nombre = Count('id')
                    )
                    .filter(annee_deces__lte = 2019)
                    .order_by('lieu_deces__libelle', 'annee_deces')
            )
        ,
        'papier' :
            list(
                CertificatPapier.objects
                    .values('annee_deces')
                    .annotate(
                        lieu_deces = F('lieu_deces__libelle'),
                        nombre = Sum('nombre')
                    )
                    .filter(annee_deces__lte = 2019)
                    .order_by('lieu_deces__libelle', 'annee_deces')
            )
    }, safe = False)

@login_required
def National53View(request):
    return JsonResponse({
        'electronique' :
            list(
                CertificatElectronique.objects
                    .values('annee_deces')
                    .annotate(
                        lieu_deces = F('lieu_deces__libelle'),
                        nombre = Count('id')
                    )
                    .filter(annee_deces__lte = 2019)
                    .order_by('lieu_deces__libelle', 'annee_deces')
            )
    }, safe = False)