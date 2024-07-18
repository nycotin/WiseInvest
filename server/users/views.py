import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.db import IntegrityError
from django.http import HttpResponse, JsonResponse
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import User

# Create your views here.

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse(200)
        else:
            return JsonResponse({ "message": "Invalid credentials." }, status=403)

    else:
        return JsonResponse({ "message": "Invalid request method." }, status=401)


@csrf_exempt
def logout_view(request):
    logout(request)
    return JsonResponse({ "message": "Logged out." }, status=200)


@csrf_exempt
def register_view(request):
    if request.method == "POST":
        first_name = request.POST["firstname"]
        last_name = request.POST["lastname"]
        email = request.POST["email"]
        username = request.POST["username"]
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]

        if password != confirmation:
            return JsonResponse({ "message": "Password doesn't match." }, status=400)

        try:
            user = User.objects.create_user(username, email, password)
            user.first_name = first_name
            user.last_name = last_name
            user.save()
            login(request, user)
        except IntegrityError:
            return JsonResponse({ "message": "Invalid username." }, status=400)
        
        return HttpResponse(200)

    else:
        return JsonResponse({ "message": "Invalid request method." }, status=401)