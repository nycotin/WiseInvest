import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse

from .models import Course, Thumbnail, CourseItem, Favorite, Learning

# Create your views here.


def index(request):
    
    return render(request, 'education/index.html')


def get_courses(request):
    if request.method == "GET":
        data = Course.objects.all()
        courses = list(Course.objects.values())

        return JsonResponse({'courses': courses }, status=200)
    else:
        return JsonResponse({'message': 'Invalid request method.' }, status=400)


def get_course_details(request, courseId):
    if request.method == "GET":
        course = list(Course.objects.filter(pk=courseId).values())
        courseItems = list(CourseItem.objects.filter(courseId=courseId).values())
        # Return thumbnails!

        return JsonResponse({'course': course, "courseItems": courseItems }, status=200)
    else:
        return JsonResponse({'message': 'Invalid request method.' }, status=400)



# Only for seeding DB from scratch
def seed_db(request):
    courses = {
        "courses": [        
            {
                "playlistId": "PLUkh9m2BorqmKaLrNBjKtFDhpdFdi8f7C",
                "createdBy": "Aswath Damodaran",   
                "title": "Accounting 101 (taught by a non-accountant)",
                "description": "I am not an accountant and I don't want to be one. That said, much of the raw material that I start with for my corporate financial analysis and valuation comes from accounting statements. While you could take an accounting class, I think that it is overkill and may do more harm than good. This is my version of all-the-accounting- you-need-for-finance class, and I hope that you find it useful.",
                "itemCount": 12,
                "url": "https://www.youtube.com/playlist?list=PLUkh9m2BorqmKaLrNBjKtFDhpdFdi8f7C",
                "player": "\u003ciframe width=\"640\" height=\"360\" src=\"http://www.youtube.com/embed/videoseries?list=PLUkh9m2BorqmKaLrNBjKtFDhpdFdi8f7C\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen\u003e\u003c/iframe\u003e",
                "cover": "https://i.ytimg.com/vi/Jbp3-AU9v_g/sddefault.jpg"
            },
            {
                "playlistId": "PLpOAgnrYfQqFcWd5FNHWw5BX-CgZAWrwk",
                "createdBy": "Kostadin Ristovski",   
                "title": "Simple Valuation Course",
                "description": "",
                "itemCount": 5,
                "url": "https://www.youtube.com/playlist?list=PLpOAgnrYfQqFcWd5FNHWw5BX-CgZAWrwk",
                "player": "\u003ciframe width=\"640\" height=\"360\" src=\"http://www.youtube.com/embed/videoseries?list=PLpOAgnrYfQqFcWd5FNHWw5BX-CgZAWrwk\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen\u003e\u003c/iframe\u003e",
                "cover": "https://i.ytimg.com/vi/-WsxbeOzNR0/sddefault.jpg"
            }
        ]
    }

    items = {
        "items": [
            {
                "itemId": "Jbp3-AU9v_g",
                "courseId": "PLUkh9m2BorqmKaLrNBjKtFDhpdFdi8f7C",
                "title": "Accounting 101: A Preview",
                "description": "In this session, I provide a very short preview of what I aim to do in this class, and why I think less is more when it comes to accounting.", 
                "position": 0,
                "thumbnail": 0,
                "publishedAt": "2020-09-03T21:53:23Z"
            },
            {
                "itemId": "7rW7lpQZpqY",
                "courseId": "PLUkh9m2BorqmKaLrNBjKtFDhpdFdi8f7C",
                "title": "Session 1: The Financial Statements - An Overview",
                "description": "In this session, I look at the three key accounting statements, the balance sheet, the income statement and statement of cash flows, and examine the three questions that accountants should be answering about a business:\n1. What does the business own?\n2. What does it owe?\n3. How much did the business make in the period in question?\nWhile I do not go into the details of each statement, I explain which question each one is designed to answer and how they are interconnected.\nSlides: http://www.stern.nyu.edu/~adamodar/pdfiles/Accounting101/slides/session1.pdf",
                "position": 1,
                "thumbnail": 1,
                "publishedAt": "2020-09-03T22:39:22Z"
            },
            {
                "itemId": "Q8wKr1QDSwg",
                "courseId": "PLUkh9m2BorqmKaLrNBjKtFDhpdFdi8f7C",
                "title": "Session 2: The Income Statement",
                "description": "In this session, I look at the income statement, where accountants record transactions and report income. I start with a discussion of accrual accounting and how it permeates the income statement, and how accountants draw a contrast between cost of goods sold, other operating expenses and financing expense to derive different measures of income.\nSlides: http://www.stern.nyu.edu/~adamodar/pdfiles/Accounting101/slides/session2.pdf\nPost class test: http://www.stern.nyu.edu/~adamodar/pdfiles/Accounting101/postclass/session2test.pdf\nPost class test solution:  http://www.stern.nyu.edu/~adamodar/pdfiles/Accounting101/postclass/session2soln.pdf",
                "position": 2,
                "thumbnail": 2,
                "publishedAt": "2020-09-03T23:00:05Z"
            },
            {
                "itemId": "UYxJl2GvdGw",
                "courseId": "PLUkh9m2BorqmKaLrNBjKtFDhpdFdi8f7C",
                "title": "Session 2A: The Income Statement (Examples)",
                "description": "In this session, I use the income statements of a diverse group of companies to illustrate both what they share in common and differences across companies. Along the way, I also look at how income statements change as companies age, and across sectors. \nSlides: http://www.stern.nyu.edu/~adamodar/pdfiles/Accounting101/slides/session2A.pdf\nPost class test: http://www.stern.nyu.edu/~adamodar/pdfiles/Accounting101/postclass/session2Atest.pdf\nPost class test solution:  http://www.stern.nyu.edu/~adamodar/pdfiles/Accounting101/postclass/session2Asoln.pdf",
                "position": 3,
                "thumbnail": 3,
                "publishedAt": "2020-09-03T21:53:38Z"
            },
            {
                "itemId": "cSuc2HHQpxc",
                "courseId": "PLUkh9m2BorqmKaLrNBjKtFDhpdFdi8f7C",
                "title": "Session 3: The Balance Sheet",
                "description": "In this session, I look at the balance sheet, the accountants record of what a company owns and owes and examine the rules that govern different asset types. In the process, I will argue that there are inconsistencies in how fixed assets get recorded, relative to financial assets, that the biggest intangible asset (goodwill) on a balance sheet is a sham and that shareholders' equity is not just backward looking but flawed.\nSlides: http://www.stern.nyu.edu/~adamodar/pdfiles/Accounting101/slides/session3.pdf\nPost class test: http://www.stern.nyu.edu/~adamodar/pdfiles/Accounting101/postclass/session3test.pdf\nPost class test solution:  http://www.stern.nyu.edu/~adamodar/pdfiles/Accounting101/postclass/session3soln.pdf",
                "position": 4,
                "thumbnail": 4,
                "publishedAt": "2020-09-03T21:53:42Z"
            },
            {
                "itemId": "Gr4JwDB1iRM",
                "courseId": "PLUkh9m2BorqmKaLrNBjKtFDhpdFdi8f7C",
                "title": "Session 3A: The Balance Sheet (Examples)",
                "description": "In this session, I use the balance sheets of a diverse group of companies to illustrate both what they share in common and differences. Along the way, I grapple with differences in accounting rules and naming that can be confusing when you first start looking at financial statements.\nSlides: http://www.stern.nyu.edu/~adamodar/pdfiles/Accounting101/slides/session3A.pdf\nPost class test: http://www.stern.nyu.edu/~adamodar/pdfiles/Accounting101/postclass/session3Atest.pdf\nPost class test solution:  http://www.stern.nyu.edu/~adamodar/pdfiles/Accounting101/postclass/session3Asoln.pdf",
                "position": 5,
                "thumbnail": 5,
                "publishedAt": "2020-09-03T21:53:45Z"
            },
            {
                "title": "Session 4: The Statement of Cash Flows",
                "courseId": "PLUkh9m2BorqmKaLrNBjKtFDhpdFdi8f7C",
                "description": "In this session, I look at the statement of cash flows, where the presumed end game is explaining the change in the cash balance of a company, but along the way, you are provided information on how much cash flows a company is generating from operations, investing and financing, and why this information can help in financial analysis.\nSlides: http://www.stern.nyu.edu/~adamodar/pdfiles/Accounting101/slides/session4.pdf\nPost class test: http://www.stern.nyu.edu/~adamodar/pdfiles/Accounting101/postclass/session4test.pdf\nPost class test solution:  http://www.stern.nyu.edu/~adamodar/pdfiles/Accounting101/postclass/session4soln.pdf",
                "position": 6,
                "thumbnail": 6,
                "playlistId": "PLUkh9m2BorqmKaLrNBjKtFDhpdFdi8f7C",
                "itemId": "XobT12fvkXc",
                "publishedAt": "2020-09-03T21:53:56Z"
            },
            {
                "itemId": "U954oEU7_0w",
                "courseId": "PLUkh9m2BorqmKaLrNBjKtFDhpdFdi8f7C",
                "title": "Session 4A: The Statement of Cash Flows (Examples)",
                "description": "In this session, I look at the statements of cash flows of diverse companies, highlighting shifts in operating, investing and financing cash flows, as companies age and in different sectors.\nSlides: http://www.stern.nyu.edu/~adamodar/pdfiles/Accounting101/slides/session4A.pdf\nPost class test: http://www.stern.nyu.edu/~adamodar/pdfiles/Accounting101/postclass/session4Atest.pdf\nPost class test solution:  http://www.stern.nyu.edu/~adamodar/pdfiles/Accounting101/postclass/session4Asoln.pdf",
                "position": 7,
                "thumbnail": 7,       
                "publishedAt": "2020-09-03T21:53:59Z"
            },
            {
                "itemId": "un6-H_wOizM",
                "courseId": "PLUkh9m2BorqmKaLrNBjKtFDhpdFdi8f7C",
                "title": "Session 5: Accounting Inconsistencies",
                "description": "In this session, I look at accounting inconsistencies that skew earnings and book value at companies. I start with tax rates, contrasting marginal, effective and cash tax rates, and how they play out in deferred taxes. I then look at contractual commitments like leases, and how they should be (and finally are in IFRS and GAAP) converted to debt. I move on capital expenditures in intangibles (like R&D, brand name advertising, customer acquisition costs) and how their mis-categorization can be remedied. I end with stock-based compensation and how they are clearly expenses, and why they should not treated as non-cash expenses to be added back.\nSlides: http://www.stern.nyu.edu/~adamodar/pdfiles/Accounting101/slides/session5.pdf\nPost class test: http://www.stern.nyu.edu/~adamodar/pdfiles/Accounting101/postclass/session5test.pdf\nPost class test solution:  http://www.stern.nyu.edu/~adamodar/pdfiles/Accounting101/postclass/session5soln.pdf",
                "position": 8,
                "thumbnail": 8,       
                "publishedAt": "2020-09-03T21:54:03Z"
            },
            {
                "itemId": "o4_GwR_6jR4",
                "courseId": "PLUkh9m2BorqmKaLrNBjKtFDhpdFdi8f7C",
                "title": "Session 5A: Accounting Inconsistencies (Examples)",
                "description": "In this session, I look at the accounting inconsistencies and how they play out in real companies, starting with taxes at six different and very diverse companies, move on to operating leases and how accountants are finally converting them to debt at Nordstroms and then examine how treating R&D as a capital expense can change your perspectives on Amgen. In the final section, I look at how stock-based compensation is treated in income statements today, and the information that you need to get out of the footnotes.\nSlides: http://www.stern.nyu.edu/~adamodar/pdfiles/Accounting101/slides/session5A.pdf\nPost class test: http://www.stern.nyu.edu/~adamodar/pdfiles/Accounting101/postclass/session5Atest.pdf\nPost class test solution:  http://www.stern.nyu.edu/~adamodar/pdfiles/Accounting101/postclass/session5Asoln.pdf",
                "position": 9,
                "thumbnail": 9,
                "publishedAt": "2020-09-03T21:54:08Z"

            },
            {
                "itemId": "ZXXF-rSaE9E",
                "courseId": "PLUkh9m2BorqmKaLrNBjKtFDhpdFdi8f7C",
                "title": "Session 6: Financial Ratios",
                "description": "In this session, I look at the financial ratios, where we scale numbers to a common denominator to make them comparable across companies, across time and to benchmarks. I start with profit margins, drawing distinctions between different margin measures and the information in each one. I then examine accounting returns on equity and invested capital, and the measurement issues with each. In the third section, I examine how efficiency ratios can be used to measure how painlessly companies can scale up.  In the final sections, I look at debt scaled to capital and to cash flows (EBITDA) and I end with an assessment of coverage and liquidity ratios.\nSlides: http://www.stern.nyu.edu/~adamodar/pdfiles/Accounting101/slides/session6.pdf\nPost class test: http://www.stern.nyu.edu/~adamodar/pdfiles/Accounting101/postclass/session6test.pdf\nPost class test solution:  http://www.stern.nyu.edu/~adamodar/pdfiles/Accounting101/postclass/session6soln.pdf",
                "position": 10,
                "thumbnail": 10,
                "publishedAt": "2020-09-03T21:54:11Z"
            },
            {
                "itemId": "pL2wIDWXN68",
                "courseId": "PLUkh9m2BorqmKaLrNBjKtFDhpdFdi8f7C",
                "title": "Session 6A: Financial Ratios (Examples)",
                "description": "In this session, I use financial ratios, grouped into profit margins, returns on equity/invested capital, efficiency ratios, debt ratios and coverage ratios to analyze a diverse set of companies. As I do this, I also note how these ratios evolve as companies age.\nSlides: http://www.stern.nyu.edu/~adamodar/pdfiles/Accounting101/slides/session6A.pdf\nPost class test: http://www.stern.nyu.edu/~adamodar/pdfiles/Accounting101/postclass/session6Atest.pdf\nPost class test solution:  http://www.stern.nyu.edu/~adamodar/pdfiles/Accounting101/postclass/session6Asoln.pdf",
                "position": 11,
                "thumbnail": 11,
                "publishedAt": "2020-09-03T21:54:15Z"
            },
            {
                "itemId": "-WsxbeOzNR0",
                "courseId": "PLpOAgnrYfQqFcWd5FNHWw5BX-CgZAWrwk",
                "title": "Free valuation course - Introduction",
                "description": "The free valuation course is finally here! It was a challenge to find the balance between providing value through these videos and the length of each one. I hope that you enjoy it!\n\nSupport the channel via the links below:\nPaypal: https://www.paypal.com/donate?hosted_button_id=VTHHMH6QP4LCL\nBuy me a coffee: https://www.buymeacoffee.com/Kostadin\nPatreon: https://www.patreon.com/Kostadin\n\n0:00 Introduction & structure of the course\n1:00 Few important points\n2:47 Getting publicly available information",
                "position": 0,
                "thumbnail": 12,
                "publishedAt": "2022-09-24T11:31:28Z"
            },
            {
                "itemId": "4qq14AMDp2o",
                "courseId": "PLpOAgnrYfQqFcWd5FNHWw5BX-CgZAWrwk",
                "title": "How to read 10k / 10q reports like a pro",
                "description": "Having the knowledge of how to read 10k and 10q (annual and quarterly) reports is very important for anyone who wants to understand and value a company. \n\nSupport the channel via the links below:\nPaypal: https://www.paypal.com/donate?hosted_button_id=VTHHMH6QP4LCL\nBuy me a coffee: https://www.buymeacoffee.com/Kostadin\nPatreon: https://www.patreon.com/Kostadin\n\n0:00 Introduction\n1:20 How to read a 10k\n14:38 How to read a 10q\n16:20 Reading Nike's 10k",
                "position": 1,
                "thumbnail": 13,
                "publishedAt": "2022-09-24T17:18:54Z" 
            },
            {
                "itemId": "v7XVmGnmiCY",
                "courseId": "PLpOAgnrYfQqFcWd5FNHWw5BX-CgZAWrwk",
                "title": "Free DCF valuation template with instructions",
                "description": "The DCF template that I have is inspired by professor Aswath Damodaran, with some tweaks here and there. The video provides instructions on how to use it as well as a rationale for why it is built that way.\n\nSupport the channel via the links below:\nPaypal: https://www.paypal.com/donate?hosted_button_id=VTHHMH6QP4LCL\nBuy me a coffee: https://www.buymeacoffee.com/Kostadin\nPatreon: https://www.patreon.com/Kostadin\n\nLink to valuation template: https://docs.google.com/spreadsheets/d/1Z0CWHWshgjQBtgdcalyhJpqOb-Rabrn6/edit?usp=sharing&ouid=104219770389108844152&rtpof=true&sd=true\n\nRisk-free rate: https://www.cnbc.com/quotes/US10Y\nOptions calculator: https://goodcalculators.com/black-scholes-calculator/",
                "position": 2,
                "thumbnail": 14,
                "publishedAt": "2022-09-24T20:03:31Z" 
            },
            {
                "itemId": "pn5SKzx8SHA",
                "courseId": "PLpOAgnrYfQqFcWd5FNHWw5BX-CgZAWrwk",
                "title": "How to analyze the 3 main financial statements",
                "description": "This is the 4th video of the valuation course covering the three main financial statements, the income statement, the balance sheet, and the cash flow statement.\n\nSupport the channel via the links below:\nPaypal: https://www.paypal.com/donate?hosted_button_id=VTHHMH6QP4LCL\nBuy me a coffee: https://www.buymeacoffee.com/Kostadin\nPatreon: https://www.patreon.com/Kostadin\n\nLink to Tikr: https://app.tikr.com/register?ref=sutqzq",
                "position": 3,
                "thumbnail": 15,
                "publishedAt": "2022-09-26T18:59:51Z" 
            },
            {
                "itemId": "a60nEBy-Qy4",
                "courseId": "PLpOAgnrYfQqFcWd5FNHWw5BX-CgZAWrwk",
                "title": "Making assumptions and completing the DCF valuation",
                "description": "Nobody knows what the future brings, but we can definitely try and make assumptions. We will be wrong 100% of the time, the goal is to be less wrong than the market. This is the final video of the course, hope it has increased your knowledge in this field!\n\nSupport the channel via the links below:\nPaypal: https://www.paypal.com/donate?hosted_button_id=VTHHMH6QP4LCL\nBuy me a coffee: https://www.buymeacoffee.com/Kostadin\nPatreon: https://www.patreon.com/Kostadin\n\n\nUseful websites:\nhttps://www.marketscreener.com/\nhttps://finance.yahoo.com/\nhttps://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/capex.html",
                "position": 4,
                "thumbnail": 16,
                "publishedAt": "2022-09-26T21:15:19Z" 
            }
        ]
    }

    thumbs = {
        "thumbnails": [    
            {
                "position": 0,
                "url": "https://i.ytimg.com/vi/Jbp3-AU9v_g/default.jpg",
                "width": 120,
                "height": 90
            },
            {
                "position": 1,
                "url": "https://i.ytimg.com/vi/7rW7lpQZpqY/default.jpg",
                "width": 120,
                "height": 90
            },
            {
                "position": 2,
                "url": "https://i.ytimg.com/vi/Q8wKr1QDSwg/default.jpg",
                "width": 120,
                "height": 90
            },
            {
                "position": 3,
                "url": "https://i.ytimg.com/vi/UYxJl2GvdGw/default.jpg",
                "width": 120,
                "height": 90
            },
            {
                "position": 4,
                "url": "https://i.ytimg.com/vi/cSuc2HHQpxc/default.jpg",
                "width": 120,
                "height": 90
            },
            { 
                "position": 5,
                "url": "https://i.ytimg.com/vi/Gr4JwDB1iRM/default.jpg",
                "width": 120,
                "height": 90
            },
            {
                "position": 6,
                "url": "https://i.ytimg.com/vi/XobT12fvkXc/default.jpg",
                "width": 120,
                "height": 90
            },
            {
                "position": 7,
                "url": "https://i.ytimg.com/vi/U954oEU7_0w/default.jpg",
                "width": 120,
                "height": 90
            },
            {
                "position": 8,
                "url": "https://i.ytimg.com/vi/un6-H_wOizM/default.jpg",
                "width": 120,
                "height": 90
            },
            {
                "position": 9,
                "url": "https://i.ytimg.com/vi/o4_GwR_6jR4/default.jpg",
                "width": 120,
                "height": 90
            },
            {
                "position": 10,
                "url": "https://i.ytimg.com/vi/ZXXF-rSaE9E/default.jpg",
                "width": 120,
                "height": 90
            },
            {
                "position": 11,
                "url": "https://i.ytimg.com/vi/pL2wIDWXN68/default.jpg",
                "width": 120,
                "height": 90
            },
            {
                "position": 12,
                "url": "https://i.ytimg.com/vi/-WsxbeOzNR0/default.jpg",
                "width": 120,
                "height": 90
            },
            {
                "position": 13,
                "url": "https://i.ytimg.com/vi/4qq14AMDp2o/default.jpg",
                "width": 120,
                "height": 90
            },
            {
                "position": 14,
                "url": "https://i.ytimg.com/vi/v7XVmGnmiCY/default.jpg",
                "width": 120,
                "height": 90
            },
            {
                "position": 15,
                "url": "https://i.ytimg.com/vi/pn5SKzx8SHA/default.jpg",
                "width": 120,
                "height": 90
            },
            {
                "position": 16,
                "url": "https://i.ytimg.com/vi/a60nEBy-Qy4/default.jpg",
                "width": 120,
                "height": 90
            }
        ]
    }

    for i in range(len(thumbs["thumbnails"])):
        thumbnail = Thumbnail(url=thumbs["thumbnails"][i]["url"], width=thumbs["thumbnails"][i]["width"], height=thumbs["thumbnails"][i]["height"])
        thumbnail.save()
        
    print("Thumbnails created!")

    for x in range(len(courses["courses"])):
        course = Course(playlistId=courses["courses"][x]["playlistId"], createdBy=courses["courses"][x]["createdBy"], title=courses["courses"][x]["title"], description=courses["courses"][x]["description"], itemCount=courses["courses"][x]["itemCount"], url=courses["courses"][x]["url"], player=courses["courses"][x]["player"], cover=courses["courses"][x]["cover"])
        course.save()

    print("Course created!")

    courses = Course.objects.all()

    for x in range(len(items["items"])):
        item = CourseItem(itemId=items["items"][x]["itemId"], title=items["items"][x]["title"], description=items["items"][x]["description"], position=items["items"][x]["position"], publishedAt=items["items"][x]["publishedAt"])
        
        if items["items"][x]["courseId"] == courses[0].playlistId:
            item.courseId = courses[0]
        else:
            item.courseId = courses[1]

        for y in range(len(thumbs["thumbnails"])):
            if items["items"][x]["thumbnail"] == thumbs["thumbnails"][y]["position"]:
                thumbnail = Thumbnail.objects.filter(url=thumbs["thumbnails"][y]["url"])
                item.thumbnail = thumbnail[0]
        
        item.save()

    print("Course items created!")

    return HttpResponse(200)