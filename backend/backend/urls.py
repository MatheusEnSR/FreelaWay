# backend/backend/urls.py

from django.contrib import admin
from django.urls import path, include
from api.views import MyTokenObtainPairView, UserProfileView
# (Se usarmos o refresh token, o TokenRefreshView continua vindo da biblioteca)
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls),

    # Inclui todas as URLs da 'api' (como /register/ e /vagas/)
    path('api/', include('api.urls')),

    # Rotas de Autenticação
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Rota para o perfil do usuário logado (estava faltando)
    path('api/users/me/', UserProfileView.as_view(), name='user_profile'),

]