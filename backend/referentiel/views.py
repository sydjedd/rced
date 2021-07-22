from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from referentiel.models import Region, Departement, LieuDeces


@login_required
def RegionView(request):
    return JsonResponse({
        'region' :
            list(
                Region.objects
                    .values('id', 'libelle')
                    .order_by('libelle')
            )
    }, safe = False)


@login_required
def DepartementView(request):
    return JsonResponse({
        'departement' :
            list(
                Departement.objects
                    .values('id', 'libelle')
                    .order_by('libelle')
            )
    }, safe = False)


@login_required
def LieuDecesView(request):
    return JsonResponse({
        'lieu_deces' :
            list(
                LieuDeces.objects
                    .values('id', 'libelle')
                    .order_by('libelle')
            )
    }, safe = False)