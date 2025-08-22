from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.create_user, name='create_user'),  # POST
    path('users/', views.get_users, name='get_users'),      # GET
]
