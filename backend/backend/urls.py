# backend/backend/urls.py

from django.contrib import admin
from django.urls import path, include

# 1. ADICIONE ESTAS DUAS IMPORTAÇÕES
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    # Esta linha já inclui TODAS as URLs do seu aplicativo 'api'
    path('api/', include('api.urls')),
]

# 2. ADICIONE ESTE BLOCO NO FINAL DO ARQUIVO
# Isso serve os arquivos de mídia (fotos de perfil) em modo de desenvolvimento
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)