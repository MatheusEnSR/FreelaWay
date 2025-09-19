# backend/api/views.py

from django.contrib.auth.models import User
# MUDANÇA 1: Importamos também o VagaSerializer
from .serializers import RegisterSerializer, VagaSerializer
# MUDANÇA 2: Adicionamos 'viewsets' e 'filters' à importação do rest_framework
from rest_framework import generics, viewsets, filters
# MUDANÇA 3: Adicionamos a importação para as permissões
from rest_framework.permissions import AllowAny
# MUDANÇA 4: Adicionamos a importação do Model Vaga
from .models import Vaga


# Sua view de registro (não mexemos aqui)
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    # MUDANÇA 5: Adicionamos a permissão aqui também para garantir
    permission_classes = [AllowAny]


# Sua view de Vagas, agora com tudo importado corretamente
class VagaViewSet(viewsets.ModelViewSet):
    queryset = Vaga.objects.all()
    serializer_class = VagaSerializer
    permission_classes = [AllowAny] # Agora 'AllowAny' é reconhecido

    # A mágica da busca acontece aqui!
    filter_backends = [filters.SearchFilter] # Agora 'filters' é reconhecido
    search_fields = ['titulo', 'descricao', 'habilidades']