

# backend/api/views.py

from django.contrib.auth.models import User
from .serializers import RegisterSerializer
from rest_framework import generics

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    
# Create your views here.
