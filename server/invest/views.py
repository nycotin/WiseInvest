import json
import requests
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse

from .models import Stock, UserStock

# Create your views here.


def index(request):
    
    return HttpResponse(200)







def seedStocks(request):

    external_api_url = 'https://serpapi.com/search.json?engine=google_finance_markets&trend=indexes'

    try:  
        params = {
            "engine": "google_finance_markets",
            "trend": "indexes",
            "api_key": "1b7725b30ea73b6fd049d8669b6acdeec5fa8122f917914543b8f7973c220d33"
        }

        response = requests.get(external_api_url, params=params)
        data = response.json()
        us_stocks = data["markets"]["us"]
        eu_stocks = data["markets"]["europe"]
        as_stocks = data["markets"]["asia"]
        # print(us_stocks)
        # print(eu_stocks)
        # print(as_stocks)    

        if response.status_code == 200:
            for i in us_stocks:
                stock = Stock(symbol=i["stock"], name=i["name"], market="us", link=i["link"])
                stock.save()
            
            print("US stocks created")

            for i in eu_stocks:
                stock = Stock(symbol=i["stock"], name=i["name"], market="europe", link=i["link"])
                stock.save()

            print("EU stocks created")

            for i in as_stocks:
                stock = Stock(symbol=i["stock"], name=i["name"], market="asia", link=i["link"])
                stock.save()

            print("AS stocks created")

            print("Request was Successful")
            return JsonResponse({"message": "Request was Successful"}, status=200)
        else:
            print("Request was not Successful")
            return JsonResponse({"message": "Request was not Successful"}, status=400)
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return JsonResponse({"message": "Request was not Successful"}, status=400)