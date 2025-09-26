# backend/api/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterView, 
    ContratanteRegisterView, 
    VagaViewSet,
    MyTokenObtainPairView  # 1. Importe sua view de token
)

# O Router continua igual, criando as URLs para o VagaViewSet
router = DefaultRouter()
router.register(r'vagas', VagaViewSet, basename='vaga')

urlpatterns = [
    # Rotas de Cadastro
    path('register/', RegisterView.as_view(), name='register_aplicante'),
    path('register/contratante/', ContratanteRegisterView.as_view(), name='register_contratante'),
    
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Inclui as rotas geradas pelo router (/vagas/, etc.)
    path('', include(router.urls)),
]