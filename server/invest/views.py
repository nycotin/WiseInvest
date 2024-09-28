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
from users.models import User

# Create your views here.


def index(request):
    
    return HttpResponse(200)


@login_required
def get_live_stocks(request):
    if request.method == "GET":
        external_api_url = 'https://serpapi.com/search.json?engine=google_finance_markets&trend=indexes'

        try:  
            params = {
                "engine": "google_finance_markets",
                "trend": "indexes",
                "api_key": "1b7725b30ea73b6fd049d8669b6acdeec5fa8122f917914543b8f7973c220d33"
            }

            params["index_market"] = "americas"
            response = requests.get(external_api_url, params=params)
            us_data = response.json()

            params["index_market"] = "europe-middle-east-africa"
            response = requests.get(external_api_url, params=params)
            eu_data = response.json()

            params["index_market"] = "asia-pacific"
            response = requests.get(external_api_url, params=params)
            as_data = response.json()

            us_stocks = us_data["market_trends"][0]["results"]
            eu_stocks = eu_data["market_trends"][0]["results"]
            as_stocks = as_data["market_trends"][0]["results"]

            all_stocks = []

            for i in us_stocks:
                i["market"] = "us"
                all_stocks.append(i)
            for i in eu_stocks:
                i["market"] = "europe"
                all_stocks.append(i)
            for i in as_stocks:
                i["market"] = "asia"
                all_stocks.append(i)

            if response.status_code == 200:
                return JsonResponse({ "message": "Request was Successful", "stocks": all_stocks }, status=200)
            else:
                return JsonResponse({ "message": "Request was not Successful" }, status=400)

        except requests.exceptions.RequestException as e:
            print(f"Error: {e}")
            return JsonResponse({ "message": "Request was not Successful" }, status=400)
    else:
        return JsonResponse({ "message": "Invalid request method." }, status=400)


# @login_required
def get_user_stocks(request):
    if request.method == "GET":
        # user = User.objects.get(pk=request.user.id)
        user = User.objects.get(pk=2)
        data = UserStock.objects.filter(user_id=user).values()

        user_stocks = []

        for stock in data:
            new_stock = {}
            new_stock["stock_symbol"] = Stock.objects.get(pk=stock["stock_id_id"]).symbol
            new_stock["stock_name"] = Stock.objects.get(pk=stock["stock_id_id"]).name
            new_stock["link"] = Stock.objects.get(pk=stock["stock_id_id"]).link
            new_stock["price_on_purchase"] = float(stock["price_on_purchase"])
            new_stock["quantity"] = stock["quantity"]
            new_stock["purchased_on"] = stock["purchased_on"]
            user_stocks.append(new_stock)

        return JsonResponse({ "message": "Request was Successful", "user_stocks": user_stocks }, status=200)

    else:
        return JsonResponse({ "message": "Invalid request method." }, status=400)










# Only for seeding stocks from scratch
def seedStocks(request):

    stocks = {
        "stocks": [
            {
                "symbol": ".INX:INDEXSP",
                "link": "https://www.google.com/finance/quote/.INX:INDEXSP",
                "name": "S&P 500",
                "market": "us"
            },
            {
                "symbol": ".DJI:INDEXDJX",
                "link": "https://www.google.com/finance/quote/.DJI:INDEXDJX",
                "name": "Dow Jones Industrial Average",
                "market": "us"
            },
            {
                "symbol": ".IXIC:INDEXNASDAQ",
                "link": "https://www.google.com/finance/quote/.IXIC:INDEXNASDAQ",
                "name": "Nasdaq Composite",
                "market": "us"
            },
            {
                "symbol": "RUT:INDEXRUSSELL",
                "link": "https://www.google.com/finance/quote/RUT:INDEXRUSSELL",
                "name": "Russell 2000 Index",
                "market": "us"
            },
            {
                "symbol": "OSPTX:INDEXTSI",
                "link": "https://www.google.com/finance/quote/OSPTX:INDEXTSI",
                "name": "S&P/TSX Composite Index",
                "market": "us"
            },
            {
                "symbol": "IBOV:INDEXBVMF",
                "link": "https://www.google.com/finance/quote/IBOV:INDEXBVMF",
                "name": "IBOVESPA",
                "market": "us"
            },
            {
                "symbol": "NYA:INDEXNYSEGIS",
                "link": "https://www.google.com/finance/quote/NYA:INDEXNYSEGIS",
                "name": "NYSE Composite",
                "market": "us"
            },
            {
                "symbol": "DJT:INDEXDJX",
                "link": "https://www.google.com/finance/quote/DJT:INDEXDJX",
                "name": "Dow Jones Transportation Average",
                "market": "us"
            },
            {
                "symbol": "DJU:INDEXDJX",
                "link": "https://www.google.com/finance/quote/DJU:INDEXDJX",
                "name": "Dow Jones Utility Average",
                "market": "us"
            },
            {
                "symbol": "SPLAC:INDEXSP",
                "link": "https://www.google.com/finance/quote/SPLAC:INDEXSP",
                "name": "S&P Latin America 40",
                "market": "us"
            },
            {
                "symbol": "VIX:INDEXCBOE",
                "link": "https://www.google.com/finance/quote/VIX:INDEXCBOE",
                "name": "VIX",
                "market": "us"
            },
            {
                "symbol": "RUI:INDEXRUSSELL",
                "link": "https://www.google.com/finance/quote/RUI:INDEXRUSSELL",
                "name": "Russell 1000 Index",
                "market": "us"
            },
            {
                "symbol": "DWCF:INDEXDJX",
                "link": "https://www.google.com/finance/quote/DWCF:INDEXDJX",
                "name": "Dow Jones U.S. Total Stock Market Index",
                "market": "us"
            },
            {
                "symbol": "XCMP:INDEXNASDAQ",
                "link": "https://www.google.com/finance/quote/XCMP:INDEXNASDAQ",
                "name": "NASDAQ Composite Total Return",
                "market": "us"
            },
            {
                "symbol": "NDX:INDEXNASDAQ",
                "link": "https://www.google.com/finance/quote/NDX:INDEXNASDAQ",
                "name": "Nasdaq-100",
                "market": "us"
            },
            {
                "symbol": "XNDX:INDEXNASDAQ",
                "link": "https://www.google.com/finance/quote/XNDX:INDEXNASDAQ",
                "name": "NASDAQ-100 Total Return",
                "market": "us"
            },
            {
                "symbol": "TRAN:INDEXNASDAQ",
                "link": "https://www.google.com/finance/quote/TRAN:INDEXNASDAQ",
                "name": "NASDAQ Transportation Index",
                "market": "us"
            },
            {
                "symbol": "NBI:INDEXNASDAQ",
                "link": "https://www.google.com/finance/quote/NBI:INDEXNASDAQ",
                "name": "NASDAQ Biotechnology Index",
                "market": "us"
            },
            {
                "symbol": "IXF:INDEXNASDAQ",
                "link": "https://www.google.com/finance/quote/IXF:INDEXNASDAQ",
                "name": "Nasdaq Financial-100",
                "market": "us"
            },
            {
                "symbol": "BANK:INDEXNASDAQ",
                "link": "https://www.google.com/finance/quote/BANK:INDEXNASDAQ",
                "name": "Nasdaq Bank",
                "market": "us"
            },
            {
                "symbol": "INSR:INDEXNASDAQ",
                "link": "https://www.google.com/finance/quote/INSR:INDEXNASDAQ",
                "name": "Nasdaq Insurance",
                "market": "us"
            },
            {
                "symbol": "INDS:INDEXNASDAQ",
                "link": "https://www.google.com/finance/quote/INDS:INDEXNASDAQ",
                "name": "Nasdaq Industrial",
                "market": "us"
            },
            {
                "symbol": "IXCO:INDEXNASDAQ",
                "link": "https://www.google.com/finance/quote/IXCO:INDEXNASDAQ",
                "name": "Nasdaq Computer",
                "market": "us"
            },
            {
                "symbol": "SP400:INDEXSP",
                "link": "https://www.google.com/finance/quote/SP400:INDEXSP",
                "name": "S&P 400",
                "market": "us"
            },
            {
                "symbol": "SP600:INDEXSP",
                "link": "https://www.google.com/finance/quote/SP600:INDEXSP",
                "name": "S&P 600",
                "market": "us"
            },
            {
                "symbol": "R25I:INDEXRUSSELL",
                "link": "https://www.google.com/finance/quote/R25I:INDEXRUSSELL",
                "name": "Russell 2500 Index",
                "market": "us"
            },
            {
                "symbol": "RUA:INDEXRUSSELL",
                "link": "https://www.google.com/finance/quote/RUA:INDEXRUSSELL",
                "name": "Russell 3000 Index",
                "market": "us"
            },
            {
                "symbol": "XAX:INDEXNYSEGIS",
                "link": "https://www.google.com/finance/quote/XAX:INDEXNYSEGIS",
                "name": "NYSE American Composite Index",
                "market": "us"
            },
            {
                "symbol": "BTK:INDEXNYSEGIS",
                "link": "https://www.google.com/finance/quote/BTK:INDEXNYSEGIS",
                "name": "NYSE Arca Biotechnology Index",
                "market": "us"
            },
            {
                "symbol": "DRG:INDEXNYSEGIS",
                "link": "https://www.google.com/finance/quote/DRG:INDEXNYSEGIS",
                "name": "NYSE Arca Pharmaceutical Index",
                "market": "us"
            },
            {
                "symbol": "BKX:INDEXNASDAQ",
                "link": "https://www.google.com/finance/quote/BKX:INDEXNASDAQ",
                "name": "KBW Nasdaq Bank Index",
                "market": "us"
            },
            {
                "symbol": "XAU:INDEXNASDAQ",
                "link": "https://www.google.com/finance/quote/XAU:INDEXNASDAQ",
                "name": "Philadelphia Gold and Silver Index",
                "market": "us"
            },
            {
                "symbol": "OSX:INDEXNASDAQ",
                "link": "https://www.google.com/finance/quote/OSX:INDEXNASDAQ",
                "name": "PHLX Oil Service Sector",
                "market": "us"
            },
            {
                "symbol": "SOX:INDEXNASDAQ",
                "link": "https://www.google.com/finance/quote/SOX:INDEXNASDAQ",
                "name": "PHLX Semiconductor Sector",
                "market": "us"
            },
            {
                "symbol": "DAX:INDEXDB",
                "link": "https://www.google.com/finance/quote/DAX:INDEXDB",
                "name": "DAX PERFORMANCE-INDEX",
                "market": "europe"
            },
            {
                "symbol": "UKX:INDEXFTSE",
                "link": "https://www.google.com/finance/quote/UKX:INDEXFTSE",
                "name": "FTSE 100 Index",
                "market": "europe"
            },
            {
                "symbol": "PX1:INDEXEURO",
                "link": "https://www.google.com/finance/quote/PX1:INDEXEURO",
                "name": "CAC 40",
                "market": "europe"
            },
            {
                "symbol": "INDI:INDEXBME",
                "link": "https://www.google.com/finance/quote/INDI:INDEXBME",
                "name": "IBEX 35",
                "market": "europe"
            },
            {
                "symbol": "SX5E:INDEXSTOXX",
                "link": "https://www.google.com/finance/quote/SX5E:INDEXSTOXX",
                "name": "EURO STOXX 50",
                "market": "europe"
            },
            {
                "symbol": "SPEURO:INDEXSP",
                "link": "https://www.google.com/finance/quote/SPEURO:INDEXSP",
                "name": "S&P EURO",
                "market": "europe"
            },
            {
                "symbol": "DE30:INDEXDJX",
                "link": "https://www.google.com/finance/quote/DE30:INDEXDJX",
                "name": "Dow Jones Germany Titans 30 Index (EUR)",
                "market": "europe"
            },
            {
                "symbol": "137:TLV",
                "link": "https://www.google.com/finance/quote/137:TLV",
                "name": "TA-125 Index",
                "market": "europe"
            },
            {
                "symbol": "AEX:INDEXEURO",
                "link": "https://www.google.com/finance/quote/AEX:INDEXEURO",
                "name": "AEX index",
                "market": "europe"
            },
            {
                "symbol": "PSI20:INDEXEURO",
                "link": "https://www.google.com/finance/quote/PSI20:INDEXEURO",
                "name": "PSI-20",
                "market": "europe"
            },
            {
                "symbol": "WIG:WSE",
                "link": "https://www.google.com/finance/quote/WIG:WSE",
                "name": "WIG",
                "market": "europe"
            },
            {
                "symbol": "TASI:TADAWUL",
                "link": "https://www.google.com/finance/quote/TASI:TADAWUL",
                "name": "Tadawul All-Share Index",
                "market": "europe"
            },
            {
                "symbol": "SMI:INDEXSWX",
                "link": "https://www.google.com/finance/quote/SMI:INDEXSWX",
                "name": "Swiss Market Index",
                "market": "europe"
            },
            {
                "symbol": "SPE350:INDEXSP",
                "link": "https://www.google.com/finance/quote/SPE350:INDEXSP",
                "name": "S&P Europe 350",
                "market": "europe"
            },
            {
                "symbol": "SXXP:INDEXSTOXX",
                "link": "https://www.google.com/finance/quote/SXXP:INDEXSTOXX",
                "name": "STOXX Europe 600",
                "market": "europe"
            },
            {
                "symbol": "AXX:INDEXFTSE",
                "link": "https://www.google.com/finance/quote/AXX:INDEXFTSE",
                "name": "FTSE AIM All-Share Index",
                "market": "europe"
            },
            {
                "symbol": "ASX:INDEXFTSE",
                "link": "https://www.google.com/finance/quote/ASX:INDEXFTSE",
                "name": "FTSE All-Share Index",
                "market": "europe"
            },
            {
                "symbol": "OMXC20:INDEXNASDAQ",
                "link": "https://www.google.com/finance/quote/OMXC20:INDEXNASDAQ",
                "name": "OMX Copenhagen 20",
                "market": "europe"
            },
            {
                "symbol": "OMXC25:INDEXNASDAQ",
                "link": "https://www.google.com/finance/quote/OMXC25:INDEXNASDAQ",
                "name": "OMX Copenhagen 25",
                "market": "europe"
            },
            {
                "symbol": "WIG20:WSE",
                "link": "https://www.google.com/finance/quote/WIG20:WSE",
                "name": "WIG20",
                "market": "europe"
            },
            {
                "symbol": "WIG30:WSE",
                "link": "https://www.google.com/finance/quote/WIG30:WSE",
                "name": "WIG30",
                "market": "europe"
            },
            {
                "symbol": "PX4:INDEXEURO",
                "link": "https://www.google.com/finance/quote/PX4:INDEXEURO",
                "name": "SBF 120",
                "market": "europe"
            },
            {
                "symbol": "CACLG:INDEXEURO",
                "link": "https://www.google.com/finance/quote/CACLG:INDEXEURO",
                "name": "CAC LARGE 60",
                "market": "europe"
            },
            {
                "symbol": "XU100:INDEXIST",
                "link": "https://www.google.com/finance/quote/XU100:INDEXIST",
                "name": "BIST 100",
                "market": "europe"
            },
            {
                "symbol": "XU030:INDEXIST",
                "link": "https://www.google.com/finance/quote/XU030:INDEXIST",
                "name": "BIST 30",
                "market": "europe"
            },
            {
                "symbol": "HDAX:INDEXDB",
                "link": "https://www.google.com/finance/quote/HDAX:INDEXDB",
                "name": "HDAX PERFORMANCE-INDEX",
                "market": "europe"
            },
            {
                "symbol": "OMXH25:INDEXNASDAQ",
                "link": "https://www.google.com/finance/quote/OMXH25:INDEXNASDAQ",
                "name": "OMX Helsinki 25",
                "market": "europe"
            },
            {
                "symbol": "SPI20:INDEXSWX",
                "link": "https://www.google.com/finance/quote/SPI20:INDEXSWX",
                "name": "SPI 20 PR",
                "market": "europe"
            },
            {
                "symbol": "SXGE:INDEXSWX",
                "link": "https://www.google.com/finance/quote/SXGE:INDEXSWX",
                "name": "Swiss Performance Index",
                "market": "europe"
            },
            {
                "symbol": "AMX:INDEXEURO",
                "link": "https://www.google.com/finance/quote/AMX:INDEXEURO",
                "name": "AMX index",
                "market": "europe"
            },
            {
                "symbol": "BEL20:INDEXEURO",
                "link": "https://www.google.com/finance/quote/BEL20:INDEXEURO",
                "name": "BEL 20",
                "market": "europe"
            },
            {
                "symbol": "BVLGR:INDEXEURO",
                "link": "https://www.google.com/finance/quote/BVLGR:INDEXEURO",
                "name": "PSI ALL-SHARE GR",
                "market": "europe"
            },
            {
                "symbol": "ATX:INDEXVIE",
                "link": "https://www.google.com/finance/quote/ATX:INDEXVIE",
                "name": "Austrian Traded Index",
                "market": "europe"
            },
            {
                "symbol": "OMXS30:INDEXNASDAQ",
                "link": "https://www.google.com/finance/quote/OMXS30:INDEXNASDAQ",
                "name": "OMX Stockholm 30",
                "market": "europe"
            },
            {
                "symbol": "OMXSBGI:INDEXNASDAQ",
                "link": "https://www.google.com/finance/quote/OMXSBGI:INDEXNASDAQ",
                "name": "OMX Stockholm Benchmark_GI",
                "market": "europe"
            },
            {
                "symbol": "OMXIPI:INDEXNASDAQ",
                "link": "https://www.google.com/finance/quote/OMXIPI:INDEXNASDAQ",
                "name": "OMX Iceland All-Share PI",
                "market": "europe"
            },
            {
                "symbol": "OMXRGI:INDEXNASDAQ",
                "link": "https://www.google.com/finance/quote/OMXRGI:INDEXNASDAQ",
                "name": "OMX Riga_GI",
                "market": "europe"
            },
            {
                "symbol": "OMXTGI:INDEXNASDAQ",
                "link": "https://www.google.com/finance/quote/OMXTGI:INDEXNASDAQ",
                "name": "OMX Tallinn",
                "market": "europe"
            },
            {
                "symbol": "OMXVGI:INDEXNASDAQ",
                "link": "https://www.google.com/finance/quote/OMXVGI:INDEXNASDAQ",
                "name": "OMX Vilnius_GI",
                "market": "europe"
            },
            {
                "symbol": "142:TLV",
                "link": "https://www.google.com/finance/quote/142:TLV",
                "name": "TA-35 Index",
                "market": "europe"
            },
            {
                "symbol": "DAX:INDEXDB",
                "link": "https://www.google.com/finance/quote/DAX:INDEXDB",
                "name": "DAX PERFORMANCE-INDEX",
                "market": "europe"
            },
            {
                "symbol": "UKX:INDEXFTSE",
                "link": "https://www.google.com/finance/quote/UKX:INDEXFTSE",
                "name": "FTSE 100 Index",
                "market": "europe"
            },
            {
                "symbol": "PX1:INDEXEURO",
                "link": "https://www.google.com/finance/quote/PX1:INDEXEURO",
                "name": "CAC 40",
                "market": "europe"
            },
            {
                "symbol": "INDI:INDEXBME",
                "link": "https://www.google.com/finance/quote/INDI:INDEXBME",
                "name": "IBEX 35",
                "market": "europe"
            },
            {
                "symbol": "SX5E:INDEXSTOXX",
                "link": "https://www.google.com/finance/quote/SX5E:INDEXSTOXX",
                "name": "EURO STOXX 50",
                "market": "europe"
            },
            {
                "symbol": "SPEURO:INDEXSP",
                "link": "https://www.google.com/finance/quote/SPEURO:INDEXSP",
                "name": "S&P EURO",
                "market": "europe"
            },
            {
                "symbol": "DE30:INDEXDJX",
                "link": "https://www.google.com/finance/quote/DE30:INDEXDJX",
                "name": "Dow Jones Germany Titans 30 Index (EUR)",
                "market": "europe"
            },
            {
                "symbol": "137:TLV",
                "link": "https://www.google.com/finance/quote/137:TLV",
                "name": "TA-125 Index",
                "market": "europe"
            },
            {
                "symbol": "AEX:INDEXEURO",
                "link": "https://www.google.com/finance/quote/AEX:INDEXEURO",
                "name": "AEX index",
                "market": "europe"
            },
            {
                "symbol": "PSI20:INDEXEURO",
                "link": "https://www.google.com/finance/quote/PSI20:INDEXEURO",
                "name": "PSI-20",
                "market": "europe"
            },
            {
                "symbol": "WIG:WSE",
                "link": "https://www.google.com/finance/quote/WIG:WSE",
                "name": "WIG",
                "market": "europe"
            },
            {
                "symbol": "TASI:TADAWUL",
                "link": "https://www.google.com/finance/quote/TASI:TADAWUL",
                "name": "Tadawul All-Share Index",
                "market": "europe"
            },
            {
                "symbol": "SMI:INDEXSWX",
                "link": "https://www.google.com/finance/quote/SMI:INDEXSWX",
                "name": "Swiss Market Index",
                "market": "europe"
            },
            {
                "symbol": "SPE350:INDEXSP",
                "link": "https://www.google.com/finance/quote/SPE350:INDEXSP",
                "name": "S&P Europe 350",
                "market": "europe"
            },
            {
                "symbol": "SXXP:INDEXSTOXX",
                "link": "https://www.google.com/finance/quote/SXXP:INDEXSTOXX",
                "name": "STOXX Europe 600",
                "market": "europe"
            },
            {
                "symbol": "AXX:INDEXFTSE",
                "link": "https://www.google.com/finance/quote/AXX:INDEXFTSE",
                "name": "FTSE AIM All-Share Index",
                "market": "europe"
            },
            {
                "symbol": "ASX:INDEXFTSE",
                "link": "https://www.google.com/finance/quote/ASX:INDEXFTSE",
                "name": "FTSE All-Share Index",
                "market": "europe"
            },
            {
                "symbol": "OMXC20:INDEXNASDAQ",
                "link": "https://www.google.com/finance/quote/OMXC20:INDEXNASDAQ",
                "name": "OMX Copenhagen 20",
                "market": "europe"
            },
            {
                "symbol": "OMXC25:INDEXNASDAQ",
                "link": "https://www.google.com/finance/quote/OMXC25:INDEXNASDAQ",
                "name": "OMX Copenhagen 25",
                "market": "europe"
            },
            {
                "symbol": "WIG20:WSE",
                "link": "https://www.google.com/finance/quote/WIG20:WSE",
                "name": "WIG20",
                "market": "europe"
            },
            {
                "symbol": "WIG30:WSE",
                "link": "https://www.google.com/finance/quote/WIG30:WSE",
                "name": "WIG30",
                "market": "europe"
            },
            {
                "symbol": "PX4:INDEXEURO",
                "link": "https://www.google.com/finance/quote/PX4:INDEXEURO",
                "name": "SBF 120",
                "market": "europe"
            },
            {
                "symbol": "CACLG:INDEXEURO",
                "link": "https://www.google.com/finance/quote/CACLG:INDEXEURO",
                "name": "CAC LARGE 60",
                "market": "europe"
            },
            {
                "symbol": "XU100:INDEXIST",
                "link": "https://www.google.com/finance/quote/XU100:INDEXIST",
                "name": "BIST 100",
                "market": "europe"
            },
            {
                "symbol": "XU030:INDEXIST",
                "link": "https://www.google.com/finance/quote/XU030:INDEXIST",
                "name": "BIST 30",
                "market": "europe"
            },
            {
                "symbol": "HDAX:INDEXDB",
                "link": "https://www.google.com/finance/quote/HDAX:INDEXDB",
                "name": "HDAX PERFORMANCE-INDEX",
                "market": "europe"
            },
            {
                "symbol": "OMXH25:INDEXNASDAQ",
                "link": "https://www.google.com/finance/quote/OMXH25:INDEXNASDAQ",
                "name": "OMX Helsinki 25",
                "market": "europe"
            },
            {
                "symbol": "SPI20:INDEXSWX",
                "link": "https://www.google.com/finance/quote/SPI20:INDEXSWX",
                "name": "SPI 20 PR",
                "market": "europe"
            },
            {
                "symbol": "SXGE:INDEXSWX",
                "link": "https://www.google.com/finance/quote/SXGE:INDEXSWX",
                "name": "Swiss Performance Index",
                "market": "europe"
            },
            {
                "symbol": "AMX:INDEXEURO",
                "link": "https://www.google.com/finance/quote/AMX:INDEXEURO",
                "name": "AMX index",
                "market": "europe"
            },
            {
                "symbol": "BEL20:INDEXEURO",
                "link": "https://www.google.com/finance/quote/BEL20:INDEXEURO",
                "name": "BEL 20",
                "market": "europe"
            },
            {
                "symbol": "BVLGR:INDEXEURO",
                "link": "https://www.google.com/finance/quote/BVLGR:INDEXEURO",
                "name": "PSI ALL-SHARE GR",
                "market": "europe"
            },
            {
                "symbol": "ATX:INDEXVIE",
                "link": "https://www.google.com/finance/quote/ATX:INDEXVIE",
                "name": "Austrian Traded Index",
                "market": "europe"
            },
            {
                "symbol": "OMXS30:INDEXNASDAQ",
                "link": "https://www.google.com/finance/quote/OMXS30:INDEXNASDAQ",
                "name": "OMX Stockholm 30",
                "market": "europe"
            },
            {
                "symbol": "OMXSBGI:INDEXNASDAQ",
                "link": "https://www.google.com/finance/quote/OMXSBGI:INDEXNASDAQ",
                "name": "OMX Stockholm Benchmark_GI",
                "market": "europe"
            },
            {
                "symbol": "OMXIPI:INDEXNASDAQ",
                "link": "https://www.google.com/finance/quote/OMXIPI:INDEXNASDAQ",
                "name": "OMX Iceland All-Share PI",
                "market": "europe"
            },
            {
                "symbol": "OMXRGI:INDEXNASDAQ",
                "link": "https://www.google.com/finance/quote/OMXRGI:INDEXNASDAQ",
                "name": "OMX Riga_GI",
                "market": "europe"
            },
            {
                "symbol": "OMXTGI:INDEXNASDAQ",
                "link": "https://www.google.com/finance/quote/OMXTGI:INDEXNASDAQ",
                "name": "OMX Tallinn",
                "market": "europe"
            },
            {
                "symbol": "OMXVGI:INDEXNASDAQ",
                "link": "https://www.google.com/finance/quote/OMXVGI:INDEXNASDAQ",
                "name": "OMX Vilnius_GI",
                "market": "europe"
            },
            {
                "symbol": "142:TLV",
                "link": "https://www.google.com/finance/quote/142:TLV",
                "name": "TA-35 Index",
                "market": "europe"
            }
        ]
    }

    for i in stocks["stocks"]:
        stock = Stock(symbol=i["symbol"], name=i["name"], market=i["market"], link=i["link"])
        stock.save()
    
    print("Stocks created")
    return HttpResponse(200)
    