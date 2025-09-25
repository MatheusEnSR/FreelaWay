# backend/api/views.py

from django.contrib.auth.models import User
from rest_framework import generics, viewsets, filters
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Vaga
from .serializers import RegisterSerializer, ContratanteRegisterSerializer, VagaSerializer, MyTokenObtainPairSerializer


# Cria uma View de Token Customizada
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# View para cadastro de Aplicantes (usuário simples)
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

# View para cadastro de Contratantes (usuário com perfil de empresa)
class ContratanteRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = ContratanteRegisterSerializer

# ViewSet para lidar com a listagem e busca de Vagas
class VagaViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Este ViewSet fornece as ações `list` e `retrieve` para vagas,
    além de uma busca e um endpoint customizado para vagas recomendadas.
    """
    queryset = Vaga.objects.all().order_by('-data_criacao')
    serializer_class = VagaSerializer

    # Habilitando o filtro de busca por palavra-chave
    filter_backends = [filters.SearchFilter]
    search_fields = ['titulo', 'descricao_breve', 'tags__nome', 'local']

    # Endpoint customizado: /api/vagas/recomendadas/
    @action(detail=False, methods=['get'])
    def recomendadas(self, request):
        """
        Retorna as 6 vagas mais recentes marcadas como "recomendadas".
        """
        vagas_recomendadas = self.get_queryset().filter(recomendada=True)[:6]
        serializer = self.get_serializer(vagas_recomendadas, many=True)
        return Response(serializer.data)