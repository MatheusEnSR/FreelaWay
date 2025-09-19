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
class Employer(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    company_name = models.CharField(max_length=100, blank=True, null=True)
    # Adicione outros campos relevantes aqui
    
    def __str__(self):
        return self.name


class Freelancer(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    skills = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    employer = models.ForeignKey(Employer, on_delete=models.CASCADE, related_name="projects")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
