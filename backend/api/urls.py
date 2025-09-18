"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# backend/backend/urls.py
# Novo arquivo: backend/api/urls.py

from django.urls import path
from .views import RegisterView
from . import views

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('overview/', views.overview_api, name='overview_api'),
    path('employer/<int:pk>/', views.employer_profile_api, name='employer_profile_api'),
]
