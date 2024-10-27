from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, JsonResponse
from django.db.models import Sum

import yfinance as yf

from .models import StockExchange, Stock, Transaction
from users.models import User

# Create your views here.

@login_required
def get_stocks(request):
    if request.method == "GET":
        all_stocks = list(Stock.objects.all().values())

        return JsonResponse({ "message": "Request was successful", "stocks": all_stocks }, status=200)
        
    else:
        return JsonResponse({ "message": "Invalid request method." }, status=405)


@login_required
def get_transactions(request):
    if request.method == "GET":
        user = User.objects.get(pk=request.user.id)
        transactions_history = list(Transaction.objects.filter(user=user).values().order_by("-purchased_on"))

        for i in transactions_history:
            db_stock_data = Stock.objects.get(symbol=i["stock_id"])
            i["company_name"] = db_stock_data.company_name
            i["currency_symbol"] = db_stock_data.currency_symbol

        return JsonResponse({ "message": "Request was successful", "transactions_history": transactions_history }, status=200)

    else:
        return JsonResponse({ "message": "Invalid request method." }, status=405)


@login_required
def get_portfolio(request):
    if request.method == "GET":
        # Get user stocks via grouping transactions based on stock symbol
        user = User.objects.get(pk=request.user.id)
        all_data = Transaction.objects.filter(user=user).values("stock_id", "price_on_purchase", "quantity")

        grouped_stocks = all_data.values("stock").annotate(quantity=Sum("quantity"), total_investment=Sum("total_expense"))

        portfolio_data = []

        for i in grouped_stocks:
            db_stock_data = Stock.objects.get(symbol=i["stock"])
            new_data = {}
            new_data["symbol"] = i["stock"]
            new_data["company_name"] = db_stock_data.company_name
            new_data["exchange"] = db_stock_data.exchange_id
            new_data["currency"] = db_stock_data.currency
            new_data["currency_symbol"] = db_stock_data.currency_symbol
            new_data["market_area"] = db_stock_data.market_area
            new_data["quantity"] = i["quantity"]
            new_data["total_investment"] = float("{:.2f}".format(i["total_investment"]))

            current_stock_data = yf.Ticker(i["stock"]).info
            current_stock_price = current_stock_data.get("currentPrice")
            
            tot_value = current_stock_price * i["quantity"]
            new_data["total_value"] = float("{:.2f}".format(tot_value))
            new_data["currency"] = current_stock_data.get("financialCurrency")

            portfolio_data.append(new_data)
        
        return JsonResponse({ "message": "Request was successful", "portfolio_data": portfolio_data }, status=200)
    else:
        return JsonResponse({ "message": "Invalid request method." }, status=405)


@login_required
def get_current_price(request, stock_symbol):
    stock = yf.Ticker(stock_symbol)
    stock_price = stock.info.get("currentPrice")

    return JsonResponse({ "current_price": float("{:.2f}".format(stock_price)) }, status=200)


@login_required
def purchase_stocks(request, stock_symbol, qty):
    if request.method == "POST":
        user = User.objects.get(pk=request.user.id)

        stock = Stock.objects.get(symbol=stock_symbol)
        stock_price = yf.Ticker(stock_symbol).info.get("currentPrice")

        new_transaction = Transaction(user=user, stock=stock, price_on_purchase=stock_price, quantity=qty)
        new_transaction.save()

        return JsonResponse({ "message": f"Successfully purchased {qty} stock(s) for {stock.company_name}."}, status=200)
    else:
        return JsonResponse({ "message": "Invalid request method." }, status=405)













# Only for seeding stocks from scratch
def seedDB(request):

    stock_exchanges = [
        {
            "mic": "XNYS",
            "exchange_name": "New York Stock Exchange",
            "city": "New York",
            "region": "North America",
            "top_stocks": ["BRK-B", "C", "JPM", "JNJ", "V", "PFE", "PG", "XOM", "TNET"],
            "currency": "USD",
            "currency_symbol": "$"
        },
        {
            "mic": "XNAS",
            "exchange_name": "NASDAQ Stock Exchange",
            "city": "New York",
            "region": "North America",
            "top_stocks": ["AAPL", "MSFT", "GOOGL", "AMZN", "META", "NVDA", "TSLA", "ADBE", "PEP", "NFLX"],
            "currency": "USD",
            "currency_symbol": "$"
        },
        {
            "mic": "XTSE",
            "exchange_name": "Toronto Stock Exchange",
            "city": "Toronto",
            "region": "North America",
            "top_stocks": ["RY.TO", "TD.TO", "ENB.TO", "BMO.TO", "BNS.TO", "CNQ.TO", "BCE.TO", "CNR.TO", "TRP.TO", "SHOP.TO"],
            "currency": "CAD",
            "currency_symbol": "$"
        },
        {
            "mic": "XLON",
            "exchange_name": "London Stock Exchange",
            "city": "London",
            "region": "Europe",
            "top_stocks": ["HSBA.L", "BP.L", "AZN.L", "DGE.L", "ULVR.L", "GSK.L", "BARC.L", "RIO.L", "LLOY.L", "BHP.L"],
            "currency": "GBP",
            "currency_symbol": "£"
        },
        {
            "mic": "XPAR",
            "exchange_name": "Euronext Paris",
            "city": "Paris",
            "region": "Europe",
            "top_stocks": ["MC.PA", "AIR.PA", "OR.PA", "SAN.PA", "BNP.PA", "DG.PA", "VIV.PA", "CAP.PA", "ENGI.PA", "LR.PA"],
            "currency": "EUR",
            "currency_symbol": "€"
        },
        {
            "mic": "XHKG",
            "exchange_name": "Hong Kong Stock Exchange",
            "city": "Hong Kong",
            "region": "Asia",
            "top_stocks": ["0700.HK", "9988.HK", "0939.HK", "2318.HK", "3690.HK", "1299.HK", "2388.HK", "0005.HK", "0011.HK", "0388.HK", "0001.HK", "0016.HK"],
            "currency": "HKD",
            "currency_symbol": "$"
        },
        {
            "mic": "XTKS",
            "exchange_name": "Tokyo Stock Exchange",
            "city": "Tokyo",
            "region": "Asia",
            "top_stocks": ["7203.T", "6758.T", "9432.T", "9984.T", "7267.T", "8035.T", "6902.T", "6861.T", "4568.T", "8411.T"],
            "currency": "JPY",
            "currency_symbol": "¥"
        },
        {
            "mic": "XBOM",
            "exchange_name": "Bombay Stock Exchange",
            "city": "Mumbai",
            "region": "Asia",
            "top_stocks": ["RELIANCE.BO", "TCS.BO", "HDFCBANK.BO", "HINDUNILVR.BO", "INFY.BO", "ICICIBANK.BO", "KOTAKBANK.BO", "LT.BO", "SBIN.BO", "ITC.BO"],
            "currency": "INR",
            "currency_symbol": "₹"
        },
        {
            "mic": "XSHG",
            "exchange_name": "Shanghai Stock Exchange",
            "city": "Shanghai",
            "region": "Asia",
            "top_stocks": ["600519.SS", "601398.SS", "601857.SS", "601288.SS", "600036.SS", "601988.SS", "601939.SS", "600276.SS", "600028.SS", "601628.SS"],
            "currency": "CNY",
            "currency_symbol": "¥"
        },
        {
            "mic": "XJSE",
            "exchange_name": "Johannesburg Stock Exchange",
            "city": "Johannesburg",
            "region": "Africa",
            "top_stocks": ["AGL.JO", "SOL.JO", "NPN.JO", "BTI.JO", "FSR.JO", "SBK.JO", "MTN.JO", "CFR.JO", "ANG.JO"],
            "currency": "ZAR",
            "currency_symbol": "R"
        },
        {
            "mic": "ASX",
            "exchange_name": "Australian Securities Exchange",
            "city": "Sydney",
            "region": "Oceania",
            "top_stocks": ["CBA.AX", "BHP.AX", "WBC.AX", "CSL.AX", "NAB.AX", "ANZ.AX", "WES.AX", "WOW.AX", "RIO.AX", "TLS.AX"],
            "currency": "AUD",
            "currency_symbol": "$"
        },
        {
            "mic": "BMV",
            "exchange_name": "Mexican Stock Exchange",
            "city": "Mexico City",
            "region": "North America",
            "top_stocks": ["CEMEXCPO.MX", "GFNORTEO.MX", "BIMBOA.MX", "TLEVISACPO.MX", "GMEXICOB.MX", "FEMSAUBD.MX", "ALSEA.MX", "WALMEX.MX", "LIVEPOLC-1.MX"],
            "currency": "MXN",
            "currency_symbol": "$"
        },
        {
            "mic": "B3SA",
            "exchange_name": "B3 - Brazil Stock Exchange",
            "city": "São Paulo",
            "region": "South America",
            "top_stocks": ["VALE3.SA", "PETR4.SA", "ITUB4.SA", "BBDC4.SA", "BBAS3.SA", "ABEV3.SA", "B3SA3.SA", "MGLU3.SA", "WEGE3.SA", "RENT3.SA"],
            "currency": "BRL",
            "currency_symbol": "R$"
        },
        {
            "mic": "XKAR",
            "exchange_name": "Karachi Stock Exchange",
            "city": "Karachi",
            "region": "Asia",
            "top_stocks": [],
            "currency": "PKR",
            "currency_symbol": "₨"
        },
        {
            "mic": "XKRX",
            "exchange_name": "Korea Exchange",
            "city": "Seoul",
            "region": "Asia",
            "top_stocks": ["005930.KS", "000660.KS", "005935.KS", "207940.KS", "051910.KS", "006400.KS", "035420.KS", "068270.KS", "017670.KS", "028260.KS"],
            "currency": "KRW",
            "currency_symbol": "₩"
        },
        {
            "mic": "XTAE",
            "exchange_name": "Tel Aviv Stock Exchange",
            "city": "Tel Aviv",
            "region": "Middle East",
            "top_stocks": [],
            "currency": "ILS",
            "currency_symbol": "₪"
        },
        {
            "mic": "XAMS",
            "exchange_name": "Euronext Amsterdam",
            "city": "Amsterdam",
            "region": "Europe",
            "top_stocks": ["ASML.AS", "PHIA.AS", "INGA.AS", "ADYEN.AS", "RAND.AS", "AALB.AS", "AKZA.AS", "DSFIR.AS", "HEIA.AS", "MT.AS"],
            "currency": "EUR",
            "currency_symbol": "€"
        },
        {
            "mic": "XMAD",
            "exchange_name": "Madrid Stock Exchange",
            "city": "Madrid",
            "region": "Europe",
            "top_stocks": ["ITX.MC", "SAN.MC", "IBE.MC", "TEF.MC", "REP.MC", "BBVA.MC", "ACS.MC", "FER.MC", "AENA.MC", "BKT.MC"],
            "currency": "EUR",
            "currency_symbol": "€"
        },
        {
            "mic": "XSGO",
            "exchange_name": "Santiago Stock Exchange",
            "city": "Santiago",
            "region": "South America",
            "top_stocks": ["CCU.SN", "FALABELLA.SN", "SQM-B.SN", "CENCOSUD.SN", "COPEC.SN", "ENELCHILE.SN", "BCI.SN", "COLBUN.SN", "BESALCO.SN", "CMPC.SN"],
            "currency": "CLP",
            "currency_symbol": "$"
        },
        {
            "mic": "XBRU",
            "exchange_name": "Euronext Brussels",
            "city": "Brussels",
            "region": "Europe",
            "top_stocks": ["ABI.BR", "COLR.BR", "UMI.BR", "SOF.BR", "ACKB.BR", "AGS.BR", "BEKB.BR", "GBLB.BR", "KBC.BR"],
            "currency": "EUR",
            "currency_symbol": "€"
        },
        {
            "mic": "XOSL",
            "exchange_name": "Oslo Stock Exchange",
            "city": "Oslo",
            "region": "Europe",
            "top_stocks": [],
            "currency": "EUR",
            "currency_symbol": "€"
        },
        {
            "mic": "XWBO",
            "exchange_name": "Vienna Stock Exchange",
            "city": "Vienna",
            "region": "Europe",
            "top_stocks": ["VOE.VI", "EBS.VI", "OMV.VI", "ANDR.VI", "IIA.VI", "RBI.VI", "VER.VI", "UNI.VI", "ATS.VI", "WIE.VI"],
            "currency": "EUR",
            "currency_symbol": "€"
        },
        {
            "mic": "XWAR",
            "exchange_name": "Warsaw Stock Exchange",
            "city": "Warsaw",
            "region": "Europe",
            "top_stocks": [],
            "currency": "PLN",
            "currency_symbol": "zł"
        },
        {
            "mic": "XLIS",
            "exchange_name": "Euronext Lisbon",
            "city": "Lisbon",
            "region": "Europe",
            "top_stocks": [],
            "currency": "EUR",
            "currency_symbol": "€"
        },
        {
            "mic": "XCSE",
            "exchange_name": "Copenhagen Stock Exchange",
            "city": "Copenhagen",
            "region": "Europe",
            "top_stocks": ["NOVO-B.CO", "DSV.CO", "ORSTED.CO", "CARL-B.CO", "MAERSK-B.CO"],
            "currency": "DKK",
            "currency_symbol": "kr"
        },
        {
            "mic": "XHEL",
            "exchange_name": "Helsinki Stock Exchange",
            "city": "Helsinki",
            "region": "Europe",
            "top_stocks": ["NOKIA.HE", "NDA-FI.HE", "KNEBV.HE", "UPM.HE", "OUT1V.HE"],
            "currency": "EUR",
            "currency_symbol": "e"
        },
        {
            "mic": "XSTO",
            "exchange_name": "Stockholm Stock Exchange",
            "city": "Stockholm",
            "region": "Europe",
            "top_stocks": [],
            "currency": "SEK",
            "currency_symbol": "kr"
        },
        {
            "mic": "XICE",
            "exchange_name": "Iceland Stock Exchange",
            "city": "Reykjavik",
            "region": "Europe",
            "top_stocks": [],
            "currency": "ISK",
            "currency_symbol": "kr"
        },
        {
            "mic": "XBKK",
            "exchange_name": "Stock Exchange of Thailand",
            "city": "Bangkok",
            "region": "Asia",
            "top_stocks": ["PTT.BK", "AOT.BK", "SCB.BK", "ADVANC.BK", "CPALL.BK"],
            "currency": "THB",
            "currency_symbol": "฿"
        },
        {
            "mic": "XPHS",
            "exchange_name": "Philippine Stock Exchange",
            "city": "Manila",
            "region": "Asia",
            "top_stocks": [],
            "currency": "PHP",
            "currency_symbol": "₱"
        },
        {
            "mic": "XSAU",
            "exchange_name": "Saudi Stock Exchange (Tadawul)",
            "city": "Riyadh",
            "region": "Middle East",
            "top_stocks": ["2222.SR", "2010.SR", "1120.SR", "1180.SR", "7010.SR"],
            "currency": "SAR",
            "currency_symbol": "﷼"
        },
        {
            "mic": "XCAS",
            "exchange_name": "Casablanca Stock Exchange",
            "city": "Casablanca",
            "region": "Africa",
            "top_stocks": [],
            "currency": "MAD",
            "currency_symbol": " د. م"
        },
        {
            "mic": "XNAI",
            "exchange_name": "Nairobi Securities Exchange",
            "city": "Nairobi",
            "region": "Africa",
            "top_stocks": [],
            "currency": "KES",
            "currency_symbol": "KSh"
        },
        {
            "mic": "XBAA",
            "exchange_name": "Buenos Aires Stock Exchange",
            "city": "Buenos Aires",
            "region": "South America",
            "top_stocks": ["GGAL.BA", "YPFD.BA", "PAMP.BA", "SUPV.BA", "BBAR.BA"],
            "currency": "ARS",
            "currency_symbol": "$"
        },
        {
            "mic": "XLIM",
            "exchange_name": "Lima Stock Exchange",
            "city": "Lima",
            "region": "South America",
            "top_stocks": [],
            "currency": "PEN",
            "currency_symbol": "S/"
        },
        {
            "mic": "XIST",
            "exchange_name": "Borsa Istanbul",
            "city": "Istanbul",
            "region": "Middle East",
            "top_stocks": [],
            "currency": "TRY",
            "currency_symbol": "₺"
        },
        {
            "mic": "XDFM",
            "exchange_name": "Dubai Financial Market",
            "city": "Dubai",
            "region": "Middle East",
            "top_stocks": ["EMAAR.AE", "DFM.AE", "DIB.AE", "DU.AE", "ARMX.AE"],
            "currency": "AED",
            "currency_symbol": "د."
        },
        {
            "mic": "XFRA",
            "exchange_name": "German Stock Exchange",
            "city": "Frankfurt am Main",
            "region": "Europe",
            "top_stocks": ["DTE.DE", "BAS.DE", "VOW3.DE", "SAP.DE", "SIE.DE", "BMW.DE", "ALV.DE", "RWE.DE", "BAYN.DE", "ADS.DE"],
            "currency": "EUR",
            "currency_symbol": "€"
        },
        {
            "mic": "XSHE",
            "exchange_name": "Shenzhen Stock Exchange",
            "city": "Shenzhen",
            "region": "Asia",
            "top_stocks": ["000858.SZ", "000333.SZ", "000001.SZ", "002415.SZ", "000651.SZ"],
            "currency": "CNY",
            "currency_symbol": "¥"
        },
        {
            "mic": "XNSE",
            "exchange_name": "National Stock Exchange",
            "city": "Mumbai",
            "region": "Asia",
            "top_stocks": ["RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", "ICICIBANK.NS"],
            "currency": "INR",
            "currency_symbol": "₹"
        },
        {
            "mic": "XMON",
            "exchange_name": "Euronext Milan",
            "city": "Milan",
            "region": "Europe",
            "top_stocks": ["ENI.MI", "ISP.MI", "UCG.MI", "STLAM.MI", "RACE.MI"],
            "currency": "EUR",
            "currency_symbol": "€"
        }
    ]

    for exchange in stock_exchanges:
        new_exchange = StockExchange.objects.create(mic=exchange["mic"], exchange_name=exchange["exchange_name"], city=exchange["city"], region=exchange["region"])
        new_exchange.save()

        print(new_exchange.exchange_name)
        
        if len(exchange["top_stocks"]) != 0:
            print(f"Creating {len(exchange["top_stocks"])} stocks for {new_exchange.exchange_name}")

            for stock_symbol in exchange["top_stocks"]:
                stock = yf.Ticker(stock_symbol)
                info = stock.info

                company_name = ""

                if info.get("longName") == None:
                    company_name = "EMPTY NAME"
                else:
                    company_name = info.get("longName")

                new_stock = Stock.objects.create(symbol=info.get("symbol"), company_name=company_name, market_area=exchange["region"], exchange=new_exchange, currency=exchange["currency"], currency_symbol=exchange["currency_symbol"], link=f"https://finance.yahoo.com/quote/{stock_symbol}")
                new_stock.save()
                
                print(new_stock.company_name)
            
            print("Stocks created")
        else:
            print(f"No top stocks for {new_exchange.exchange_name}")

    return HttpResponse(200)