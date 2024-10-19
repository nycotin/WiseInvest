import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.db import IntegrityError
from django.http import HttpResponse, JsonResponse
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.middleware.csrf import get_token
import datetime

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import User

# Create your views here.

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)

        # print(get_token(request))

        user = authenticate(request, username=data["username"], password=data["password"])

        if user is not None:
            login(request, user)
            return JsonResponse({ "user_id": user.id, "username": user.username }, status=200)
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
            user.firstname = data["firstname"]
            user.lastname = data["lastname"]
            user.save()
            login(request, user)

            return JsonResponse({ "user_id": user.id, "username": user.username }, status=200)
        except IntegrityError:
            return JsonResponse({ "message": "Invalid username." }, status=400)

    else:
        return JsonResponse({ "message": "Invalid request method." }, status=401)


@login_required
def user_profile(request):
    user_info = User.objects.get(pk=request.user.id)

    date = datetime.datetime.strftime(user_info.date_joined, '%d/%m/%y')
    login = datetime.datetime.strftime(user_info.last_login, '%d/%m/%y at %H:%M')

    user = { "firstname": user_info.firstname, "lastname": user_info.lastname, "email": user_info.email, "username" : user_info.username, "date_joined": date, "last_login": login }

    return JsonResponse({ "user": user }, status=200)


@login_required
def update_user_profile(request):
    if request.method == "PUT":
        data = json.loads(request.body)
        field_id = data["field_id"]
        new_value = data["new_value"].strip()

        user_info = User.objects.filter(pk=request.user.id).values(field_id)
        
        if new_value != user_info[0][field_id] and new_value != '':
            user = User.objects.get(pk=request.user.id)

            if field_id == "firstname":
                user.firstname = new_value
            elif field_id == "laststname":
                user.lastname = new_value
            else:
                user.email = new_value
            
            user.save()

            return JsonResponse({ "message": "User profile successfully updated" }, status=200)        
        else:
            return JsonResponse({ "message": "No changes." }, status=200)
        
    else:
        return JsonResponse({ "message": "Invalid request method." }, status=401)