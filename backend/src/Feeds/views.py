import codecs
import csv
from django.core.files.storage import FileSystemStorage
from urllib import response
from django.shortcuts import render
from .models import Feeds
from .serializers import FeedsSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

fs = FileSystemStorage(location='tmp/')

feed_id = openapi.Parameter('id', in_=openapi.IN_QUERY, type=openapi.TYPE_STRING)
store_id = openapi.Parameter('store_id', in_=openapi.IN_QUERY, type=openapi.TYPE_STRING)
sku = openapi.Parameter('sku', in_=openapi.IN_QUERY, type=openapi.TYPE_STRING)
product_name = openapi.Parameter('product_name', in_=openapi.IN_QUERY, type=openapi.TYPE_STRING)
price = openapi.Parameter('price', in_=openapi.IN_QUERY, type=openapi.TYPE_NUMBER)
date = openapi.Parameter('date', in_=openapi.IN_QUERY, type=openapi.TYPE_STRING)

def Index(request):
    return render(request, 'Index.html')

@api_view(['GET'])
def FeedsAPI(request):
    feeds = Feeds.objects.all().order_by('id')
    serializer = FeedsSerializer(feeds, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def FeedsDetailsAPI(request, id):
    feed = get_object_or_404(Feeds, id=id)
    serializer = FeedsSerializer(feed, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)

@swagger_auto_schema(method = 'post',
    request_body = openapi.Schema(
    type = openapi.TYPE_OBJECT,
    properties={
        'store_id': store_id,
        'sku': sku,
        'product_name': product_name,
        'price': price,
        'date': date,
    })
)
@api_view(['POST'])
def AddFeedAPI(request):
    serializer = FeedsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(method = 'put',
    request_body = openapi.Schema(
    type = openapi.TYPE_OBJECT,
    properties={
        'store_id': store_id,
        'sku': sku,
        'product_name': product_name,
        'price': price,
        'date': date,
    })
)
@api_view(['PUT'])
def EditFeedAPI(request, id):
    feed = get_object_or_404(Feeds, id=id)
    serializer = FeedsSerializer(feed, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    print(request.data)
    return Response(serializer.errors, status=status.HTTP_304_NOT_MODIFIED)

@api_view(['DELETE'])
def DeleteFeedAPI(request, id):
    feed = get_object_or_404(Feeds, id=id)
    if feed:
        feed.delete()
        return Response('Feed successfully Deleted!', status=status.HTTP_200_OK)

    return Response("That Feed Doesn't Exists!", status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def BulkAddFeedAPI(request):
    file = request.FILES["file"]
    reader = csv.DictReader(codecs.iterdecode(file, "utf-8"), delimiter=",")
    data = list(reader)
    serializer = FeedsSerializer(data=data, many=True)
    if serializer.is_valid():
        feeds_list = []
        for row in serializer.data:
            feeds_list.append(
                Feeds(
                    store_id=row["store_id"],
                    sku=row["sku"],
                    product_name=row["product_name"],
                    price=row["price"],
                    date=row["date"],
                )
            )
        Feeds.objects.bulk_create(feeds_list)
        return Response("Created successfully", status=status.HTTP_201_CREATED)

    return Response("Some error occurred", status=status.HTTP_400_BAD_REQUEST)
    