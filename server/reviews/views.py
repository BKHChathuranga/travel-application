from django.shortcuts import render
from .models import Review
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
# Create your views here.
@csrf_exempt
def add_review(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data['name']
            email = data['email']
            message = data['message']
            review = Review.objects.create(name=name, email=email, message=message)
            return JsonResponse({'status': 'success', 'message': 'Review added successfully'})
        except KeyError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON format. Required fields: name, email, message'}, status=400)
    else:
        return JsonResponse({'status': 'error', 'message': 'Only POST requests are allowed'}, status=405)