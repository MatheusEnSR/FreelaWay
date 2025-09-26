# backend/api/views.py

from django.contrib.auth.models import User
from rest_framework import generics, viewsets, filters
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from .models import Vaga
from .serializers import RegisterSerializer, ContratanteRegisterSerializer, VagaSerializer, MyTokenObtainPairSerializer


# Permitirá que o frontend busque os dados do usuário logado para exibir no perfil e na sidebar.
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        profile = user.contratante_profile
        data = {
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'contractor_type': profile.contractor_type,
            'nome_empresa': profile.nome_empresa,
            'cnpj': profile.cnpj,
            'cpf': profile.cpf,
        }
        return Response(data)

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
class VagaViewSet(viewsets.ModelViewSet):
    queryset = Vaga.objects.all().order_by('-data_criacao')
    serializer_class = VagaSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['titulo', 'descricao_breve', 'tags__nome', 'local']

    def get_permissions(self):
        # Ações públicas
        if self.action in ['list', 'retrieve', 'recomendadas']:
            permission_classes = [AllowAny]
        # Ações que exigem login
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    # Ação para criar a vaga associada ao usuário logado
    def perform_create(self, serializer):
        serializer.save(contratante=self.request.user)

    # Ação para as vagas recomendadas da página inicial
    @action(detail=False, methods=['get'])
    def recomendadas(self, request):
        vagas_recomendadas = Vaga.objects.filter(recomendada=True)[:6]
        serializer = self.get_serializer(vagas_recomendadas, many=True)
        return Response(serializer.data)

    # --- AÇÃO NOVA PARA "MEUS ANÚNCIOS" ---
    @action(detail=False, methods=['get'], url_path='meus-anuncios')
    def meus_anuncios(self, request):
        """
        Retorna apenas as vagas pertencentes ao usuário autenticado.
        """
        user = request.user
        queryset = self.get_queryset().filter(contratante=user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    # --- AÇÃO NOVA PARA O "PANORAMA GERAL" ---
    @action(detail=False, methods=['get'])
    def overview(self, request):
        """
        Retorna estatísticas do dashboard para o usuário autenticado.
        """
        user = request.user
        # Futuramente, você pode adicionar um campo 'status' ao modelo Vaga
        anuncios_ativos = Vaga.objects.filter(contratante=user).count() 

        data = {
            'anunciosAtivos': anuncios_ativos,
            'acessosUltimos30dias': 0, # Placeholder
            'pretendentesTotal': 0,     # Placeholder
            'novosPretendentes': 0,     # Placeholder
        }
        return Response(data)