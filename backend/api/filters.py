# api/filters.py
from django_filters import rest_framework as filters
from .models import Vaga

class VagaFilter(filters.FilterSet):
    # Filtro de texto para Localização (busca parcial, ex: "Bel" encontra "Belém")
    local = filters.CharFilter(field_name='local', lookup_expr='icontains')

    # Filtro de texto para Idiomas (busca parcial)
    idioma = filters.CharFilter(field_name='idioma', lookup_expr='icontains')

    # Filtro para Categoria (assumindo que "Categoria" são as tags)
    tags = filters.CharFilter(field_name='tags__nome', lookup_expr='icontains')

    # Filtro de intervalo para Orçamento (salário)
    min_salario = filters.NumberFilter(field_name="salario", lookup_expr='gte') # gte = Greater Than or Equal (maior ou igual a)
    max_salario = filters.NumberFilter(field_name="salario", lookup_expr='lte') # lte = Less Than or Equal (menor ou igual a)

    class Meta:
        model = Vaga
        # Lista de campos que queremos usar para filtrar
        fields = ['local', 'idioma', 'tags', 'min_salario', 'max_salario']