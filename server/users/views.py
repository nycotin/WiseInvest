import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.db import IntegrityError
from django.http import HttpResponse, JsonResponse
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.middleware.csrf import get_token

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import User

# Create your views here.

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)

        print(request.headers)
        # print(get_token(request))

        user = authenticate(request, username=data["username"], password=data["password"])

        if user is not None:
            login(request, user)
            return JsonResponse({ "user_id": user.id, "username": user.username, "csrftoken": get_token(request)
            }, status=200)
        else:
            return JsonResponse({ "message": "Invalid credentials." }, status=403)

    else:
        return JsonResponse({ "message": "Invalid request method." }, status=401)


def logout_view(request):
    logout(request)
    return JsonResponse({ "message": "Logged out." }, status=200)


@csrf_exempt
def register_view(request):
    if request.method == "POST":
        data = json.loads(request.body)

        if data["password"] != data["confirmation"]:
            return JsonResponse({ "message": "Password doesn't match." }, status=400)

        try:
            user = User.objects.create_user(data["username"], data["email"], data["password"])
            user.first_name = data["first_name"]
            user.last_name = data["last_name"]
            user.save()
            login(request, user)

            return JsonResponse({ "user_id": user.id, "username": user.username, "csrftoken": get_token(request)
            }, status=200)
        except IntegrityError:
            return JsonResponse({ "message": "Invalid username." }, status=400)

    else:
        return JsonResponse({ "message": "Invalid request method." }, status=401)