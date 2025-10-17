# api/admin.py
from django.contrib import admin
from .models import Profile, Vaga, Tag

# Crie uma classe de Admin para Vaga
class VagaAdmin(admin.ModelAdmin):
    list_display = ('id', 'titulo', 'contratante', 'data_criacao') # Campos que aparecerão na lista
    list_filter = ('contratante', 'recomendada') # Adiciona filtros na lateral
    search_fields = ('titulo', 'descricao_breve') # Adiciona uma barra de busca

# Registre os modelos
admin.site.register(Profile)
admin.site.register(Vaga, VagaAdmin) # Registra Vaga usando a classe customizada
admin.site.register(Tag)