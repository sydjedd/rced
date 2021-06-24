from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST

import json

@ensure_csrf_cookie
def get_csrf(request):
    return JsonResponse({'csrftoken': get_token(request)})


@require_POST
def login(request):
    data = request.POST
    username = data.get('username')
    password = data.get('password')
    if username is None or password is None:
        return JsonResponse({'detail': 'Please provide username and password'}, status = 400)
    user = authenticate(username=username, password=password)
    if user is None:
        return JsonResponse({'detail': 'Invalid credentials'}, status = 400)
    auth_login(request, user)
    return JsonResponse({
        'username': request.user.username,
        'first_name': request.user.first_name,
        'last_name': request.user.last_name,
        'email': request.user.email,
        'is_staff': request.user.is_staff,
        'is_superuser': request.user.is_superuser,
    })


def logout(request):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'You\'re not logged'}, status = 400)
    auth_logout(request)
    return JsonResponse({'detail': 'Successfully logged out'})


@ensure_csrf_cookie
def check(request):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'You\'re not logged'})
    return JsonResponse({
        'username': request.user.username,
        'first_name': request.user.first_name,
        'last_name': request.user.last_name,
        'email': request.user.email,
        'is_staff': request.user.is_staff,
        'is_superuser': request.user.is_superuser,
    })
