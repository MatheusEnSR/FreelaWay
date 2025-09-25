# backend/api/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, ContratanteRegisterView, VagaViewSet

# O Router cria as URLs para o VagaViewSet automaticamente
# (ex: /api/vagas/ e /api/vagas/recomendadas/)
router = DefaultRouter()
router.register(r'vagas', VagaViewSet, basename='vaga')

urlpatterns = [
    # Rotas de Cadastro
    path('register/', RegisterView.as_view(), name='register_aplicante'),
    path('register/contratante/', ContratanteRegisterView.as_view(), name='register_contratante'),
    
    # Inclui as rotas geradas pelo router
    path('', include(router.urls)),
]