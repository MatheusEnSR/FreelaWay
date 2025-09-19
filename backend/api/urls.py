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

# api/urls.py

# 1. Importações necessárias (adicionamos include, DefaultRouter e VagaViewSet)
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, VagaViewSet # Sua RegisterView continua aqui, importamos também a VagaViewSet

# 2. Inicializamos o router, que vai gerenciar as rotas do ViewSet
router = DefaultRouter()

# 3. Registramos o nosso VagaViewSet.
# O router criará automaticamente as URLs: /vagas/ e /vagas/{id}/
router.register(r'vagas', VagaViewSet, basename='vaga')

# 4. Montamos a lista final de URLs
urlpatterns = [
    # A sua rota de registro manual continua exatamente como estava
    path('register/', RegisterView.as_view(), name='register'),
    path('overview/', views.overview_api, name='overview_api'),
    path('employer/<int:pk>/', views.employer_profile_api, name='employer_profile_api'),

    # Adicionamos todas as URLs geradas pelo router à nossa lista.
    # Isso inclui a 'Api Root' e as rotas de 'vagas'.
    path('', include(router.urls)),
]