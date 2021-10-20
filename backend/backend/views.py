from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from backend.settings import EMAIL_CEPIDC, EMAIL_TMA, EMAIL_CDS


@login_required
@require_http_methods(['POST'])
@csrf_exempt
def sendEmal(request):
    name = request.POST.get('name')
    phone = request.POST.get('phone')
    email = request.POST.get('email')
    to = request.POST.get('to')
    if to == 'cepidc':
        to = EMAIL_CEPIDC
    elif to == 'tma':
        to = EMAIL_TMA
    elif to == 'cds':
        to = EMAIL_CDS
    message = request.POST.get('message')

    # Envoie du courriel
    send_mail(
        '[RCED] Objet',
        'Message de : ' + name + '\r\nNuméro de éléphone: ' + phone + '\r\nCourriel: ' + email + '\r\nMessage: ' + message,
        None,
        [to],
        fail_silently = False
    )

    return JsonResponse({
        'status' : 'success',
        'data' : '',
        'message' : 'Votre message à bien été envoyé'
    }, safe = False)