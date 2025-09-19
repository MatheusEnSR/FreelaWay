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

    # Adicionamos todas as URLs geradas pelo router à nossa lista.
    # Isso inclui a 'Api Root' e as rotas de 'vagas'.
    path('', include(router.urls)),
]