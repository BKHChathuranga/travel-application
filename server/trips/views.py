# from django.shortcuts import render

# Create your views here.
# from rest_framework import generics
# from .models import Accommodation
# from .serializer import AccommodationSerializer



# class accommodation_list(generics.ListAPIView):
#   queryset = Accommodation.objects.all()
#   serializer_class = AccommodationSerializer
  

from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from test.travelling_guide import TravelGuide
from test.travelling_guide_random import TravelGuideRandomPicker
import pandas as pd


@api_view(['POST'])
def set_destination_category(request):
    if request.method == 'POST':
        category = request.data.get('category')
        guide = TravelGuide()
        guide.setDestinationCategory(category)
        category_locations = guide.getCategoryLocations()
        return Response({'category_locations': category_locations})

@api_view(['POST'])
def set_destination_location(request):
    if request.method == 'POST':
        location = request.data.get('location')
        guide = TravelGuide()
        guide.setCategoryLocation(location)
        return Response({'success': True})

def structure_response(data):
    response = {
        "destinations": [],
        "accommodations": [],
        "hospitals": [],
        "transportation": [],
        "police_stations": []
    }

    # Structure destinations
    for name, district, destination_type, rating, latitude, longitude, encoded_type in zip(data['picked']['Destination'], data['picked']['District'], data['picked']['Destination Type'], data['picked']['Rating'], data['picked']['Latitude'], data['picked']['Longitude'], data['picked']['Destination Type (encoded)']):
        response['destinations'].append({
            "name": name,
            "district": district,
            "destination_type": destination_type,
            "rating": rating,
            "latitude": latitude,
            "longitude": longitude,
            "encoded_type": encoded_type
        })

    # Structure accommodations
    for name, address, rooms, grade, district, aga_division, ps_mc_uc, latitude, longitude in zip(data['accommodations']['Name'], data['accommodations']['Address'], data['accommodations']['Rooms'], data['accommodations']['Grade'], data['accommodations']['District'], data['accommodations']['AGA Division'], data['accommodations']['PS/MC/UC'], data['accommodations']['Latitude'], data['accommodations']['Longitude']):
        response['accommodations'].append({
            "name": name,
            "address": address,
            "rooms": rooms,
            "grade": grade,
            "district": district,
            "aga_division": aga_division,
            "ps_mc_uc": ps_mc_uc,
            "latitude": latitude,
            "longitude": longitude
        })

    # Structure hospitals
    for name, district, contact, latitude, longitude in zip(data['hospitals']['Hospital'], data['hospitals']['District'], data['hospitals']['Contact '], data['hospitals']['Latitude'], data['hospitals']['Longitude']):
        response['hospitals'].append({
            "name": name,
            "district": district,
            "contact": contact,
            "latitude": latitude,
            "longitude": longitude
        })

    # Structure transportation
    for district, vehicle_type, name, contact, price, review in zip(data['transportation']['District'], data['transportation']['vehicle type'], data['transportation']['Name'], data['transportation']['Contact'], data['transportation']['price'], data['transportation']['review']):
        response['transportation'].append({
            "district": district,
            "vehicle_type": vehicle_type,
            "name": name,
            "contact": contact,
            "price": price,
            "review": review
        })

    # Structure police stations
    for province, division, police_station, contact, latitude, longitude in zip(data['police_stations']['Province'], data['police_stations']['Division'], data['police_stations']['Police Station'], data['police_stations']['Contact'], data['police_stations']['Latitude'], data['police_stations']['Longitude']):
        response['police_stations'].append({
            "province": province,
            "division": division,
            "police_station": police_station,
            "contact": contact,
            "latitude": latitude,
            "longitude": longitude
        })

    return response

@api_view(['POST'])
def set_accommodation_category(request):
    if request.method == 'POST':
        category = request.data.get('category')
        guide = TravelGuide()
        location = request.data.get('location')
        guide = TravelGuide()
        guide.setCategoryLocation(location)
        
        guide.setAccomodationCategory(category)
        picked, recommended = guide.getRecommendedLocations()
        accommodations = guide.getRecommendedAccomodations()
        print(accommodations)
        hospitals = guide.getRecommendedHospitals()
        police_stations = guide.getRecommendedPoliceStations()
        transportation = guide.getRecommendedTransportations()
        return Response(structure_response({'picked': picked, 'recommended': recommended, 'accommodations': accommodations, 'hospitals':hospitals,'transportation':transportation,'police_stations':police_stations}))
    


guide_picker = TravelGuideRandomPicker()

@api_view(['GET'])
def get_destinations(request):
    if request.method == 'GET':
        destinations = guide_picker.PickDestinations()
        # Convert DataFrame to JSON and return
        return Response(destinations.to_dict(orient='records'))

@api_view(['GET'])
def get_accommodations(request):
    if request.method == 'GET':
        guide_picker.setDestinationCountPerDistrict(8)
        guide_picker.setAccomodationCountPerDistrict(5)
        guide_picker.seTransportationCountPerDistrict(5)
        accommodations = guide_picker.PickAccomodations()
        accommodations = accommodations.drop(columns=['Longitude', 'Latitude'])
        accommodations = accommodations.where(pd.notnull(accommodations), None)
        # Convert DataFrame to JSON and return
        return Response(accommodations.to_dict(orient='records'))

@api_view(['GET'])
def get_hospitals(request):
    if request.method == 'GET':
        hospitals = guide_picker.PickHospitals()
        hospitals = hospitals.drop(columns=['Longitude', 'Latitude'])
        hospitals = hospitals.where(pd.notnull(hospitals), None)
        # Convert DataFrame to JSON and return
        return Response(hospitals.to_dict(orient='records'))

@api_view(['GET'])
def get_police_stations(request):
    if request.method == 'GET':
        police_stations = guide_picker.PickPoliceStations()
        police_stations = police_stations.drop(columns=['Longitude', 'Latitude'])
        police_stations = police_stations.where(pd.notnull(police_stations), None)
        # Convert DataFrame to JSON and return
        return Response(police_stations.to_dict(orient='records'))

@api_view(['GET'])
def get_transportations(request):
    if request.method == 'GET':
        transportations = guide_picker.PickTransportations()
        # transportations = transportations.drop(columns=['Longitude', 'Latitude'])
        transportations = transportations.where(pd.notnull(transportations), None)
        # Convert DataFrame to JSON and return
        return Response(transportations.to_dict(orient='records'))