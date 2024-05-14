from django.contrib import admin
from django.urls import path
from .views import add_review
urlpatterns = [
    path('add-review/',add_review , name="add-review")
    ]
