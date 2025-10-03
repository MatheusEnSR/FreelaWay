# backend/api/views.py

from django.contrib.auth.models import User
from rest_framework import generics, viewsets, filters, status # Adicionado 'status'
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Vaga, Profile
from .serializers import (
    UserRegisterSerializer,
    VagaSerializer,
    ProfileSerializer,
    ChangePasswordSerializer # NOVO: Importamos o serializer de troca de senha
)
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer

# View de Token (não foi alterada)
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# View de Cadastro Unificada (não foi alterada)
class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserRegisterSerializer

# View para o Perfil do Usuário (não foi alterada)
class ProfileView(generics.RetrieveUpdateAPIView):
    """
    View para buscar (GET) e atualizar (PUT/PATCH) o perfil do usuário logado.
    """
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.profile

# ==========================================================
# NOVA VIEW PARA TROCA DE SENHA
# ==========================================================
class ChangePasswordView(generics.UpdateAPIView):
    """
    Endpoint para que um usuário logado possa trocar sua própria senha.
    """
    serializer_class = ChangePasswordSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.request.user

        # Verifica se a senha antiga está correta
        if not user.check_password(serializer.data.get("old_password")):
            return Response({"old_password": ["Senha atual incorreta."]}, status=status.HTTP_400_BAD_REQUEST)

        # Define a nova senha (o set_password já faz o hash de segurança)
        user.set_password(serializer.data.get("new_password"))
        user.save()
        
        return Response({"detail": "Senha atualizada com sucesso."}, status=status.HTTP_200_OK)


# ViewSet de Vagas (não foi alterada)
class VagaViewSet(viewsets.ModelViewSet):
    """
    ViewSet para Vagas, agora permitindo criar, editar e deletar vagas,
    além das ações customizadas.
    """
    queryset = Vaga.objects.all().order_by('-data_criacao')
    serializer_class = VagaSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['titulo', 'descricao_breve', 'tags__nome', 'local']

    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'recomendadas']:
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()

    def perform_create(self, serializer):
        serializer.save(contratante=self.request.user)
    
    @action(detail=False, methods=['get'])
    def recomendadas(self, request):
        vagas_recomendadas = self.get_queryset().filter(recomendada=True)[:6]
        serializer = self.get_serializer(vagas_recomendadas, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='meus-anuncios')
    def meus_anuncios(self, request):
        user = request.user
        queryset = self.get_queryset().filter(contratante=user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def overview(self, request):
        user = request.user
        anuncios_ativos = Vaga.objects.filter(contratante=user).count()
        data = {
            'anunciosAtivos': anuncios_ativos,
            'acessosUltimos30dias': 0,
            'pretendentesTotal': 0,
            'novosPretendentes': 0,
        }
        return Response(data)