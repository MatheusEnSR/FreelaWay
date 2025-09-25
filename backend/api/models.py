# backend/api/models.py

from django.db import models
from django.contrib.auth.models import User

# Modelo para o perfil de um Contratante
class ContratanteProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='contratante_profile')
    nome_empresa = models.CharField(max_length=255)
    cnpj = models.CharField(max_length=14, unique=True)

    def __str__(self):
        return self.nome_empresa

# Modelo para as Tags das vagas
class Tag(models.Model):
    nome = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.nome

# Modelo para as Vagas
class Vaga(models.Model):
    titulo = models.CharField(max_length=255)
    contratante = models.ForeignKey(User, on_delete=models.CASCADE, related_name='vagas')
    local = models.CharField(max_length=100)
    salario = models.CharField(max_length=100, blank=True)
    idioma = models.CharField(max_length=100)
    descricao_breve = models.TextField()
    descricao_detalhada = models.TextField()
    tags = models.ManyToManyField(Tag, related_name='vagas')
    recomendada = models.BooleanField(default=False)
    data_criacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titulo