# backend/api/views.py

from django.contrib.auth.models import User
from .serializers import RegisterSerializer
from rest_framework import generics
from django.db.models import Count
from django.http import JsonResponse, Http404
from .models import Employer, Freelancer, Project

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

def overview_api(request):

    #Retorna dados agregados para o panorama geral da plataforma.
    total_employers = Employer.objects.count()
    total_freelancers = Freelancer.objects.count()
    total_projects = Project.objects.count()

    data = {
        'total_employers': total_employers,
        'total_freelancers': total_freelancers,
        'total_projects': total_projects,
    }
    
    return JsonResponse(data)

def employer_profile_api(request, pk):
    
    #Retorna os dados de um empregador específico, usando seu ID (primary key).
    try:
        employer = Employer.objects.get(pk=pk)
        
        data = {
            'id': employer.pk,
            'name': employer.name,
            'email': employer.email,
            'company_name': employer.company_name,
            # Inclua outros campos que você tenha no modelo
        }
        return JsonResponse(data)
        
    except Employer.DoesNotExist:
        # Se o empregador não for encontrado, retorna um erro 404
        raise Http404("Empregador não encontrado")

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