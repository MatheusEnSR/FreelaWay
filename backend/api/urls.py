# backend/api/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    UserRegisterView,
    ProfileView,
    VagaViewSet,
    MyTokenObtainPairView,
    TagListView,
    ChangePasswordView  # NOVO: Importamos a view de troca de senha
)

router = DefaultRouter()
router.register(r'vagas', VagaViewSet, basename='vaga')

urlpatterns = [
    # Rotas de Cadastro, Perfil e Vagas
    path('register/', UserRegisterView.as_view(), name='user_register'),
    path('profile/', ProfileView.as_view(), name='user_profile'),
    
    # Rotas de Autenticação (Login e Troca de Senha)
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('change-password/', ChangePasswordView.as_view(), name='change_password'), # NOVO
    path('tags/', TagListView.as_view(), name='tag-list'),

    # Inclui as rotas geradas pelo router (/vagas/, etc.)
    path('', include(router.urls)),
]