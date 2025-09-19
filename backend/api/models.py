# api/models.py
from django.db import models

class Vaga(models.Model):
    titulo = models.CharField(max_length=200)
    descricao = models.TextField()
    habilidades = models.CharField(max_length=255, help_text="Habilidades separadas por vírgula")
    empresa = models.CharField(max_length=100, blank=True, null=True)
    
    # CAMPOS NOVOS ADICIONADOS AQUI
    local = models.CharField(max_length=100, blank=True, null=True)
    salario = models.CharField(max_length=100, blank=True, null=True, help_text="Ex: R$ 3.000 - R$ 4.500")
    idioma = models.CharField(max_length=100, blank=True, null=True)
    
    data_criacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titulo


# Create your models here.
