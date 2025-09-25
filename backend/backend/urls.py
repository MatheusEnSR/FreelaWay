# backend/backend/urls.py

from django.contrib import admin
from django.urls import path, include

# A CORREÇÃO ESTÁ AQUI: Importamos nossa view customizada do lugar certo.
from api.views import MyTokenObtainPairView 
# (Se você usa o refresh token, o TokenRefreshView continua vindo da biblioteca)
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    
    # Usando nossa view customizada para a rota de login
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # A rota de refresh continua usando a view padrão da biblioteca
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]