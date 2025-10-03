# backend/api/models.py

from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# --- NOVO MODELO DE PERFIL UNIFICADO ---
# Este modelo substitui o antigo ContratanteProfile e servirá para TODOS os usuários.
class Profile(models.Model):
    USER_TYPE_CHOICES = (
        ('aplicante', 'Aplicante'),
        ('contratante', 'Contratante'),
    )
    CONTRACTOR_TYPE_CHOICES = (
        ('PF', 'Pessoa Física'),
        ('PJ', 'Pessoa Jurídica'),
    )
    STATUS_CHOICES = (
        ('Disponível', 'Disponível'),
        ('Indisponível', 'Indisponível'),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    
    # Campo para diferenciar os tipos de usuário principais
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES, default='aplicante')
    
    # Campos específicos para Contratante
    contractor_type = models.CharField(max_length=2, choices=CONTRACTOR_TYPE_CHOICES, blank=True, null=True)
    cpf = models.CharField(max_length=11, unique=True, blank=True, null=True)
    nome_empresa = models.CharField(max_length=255, blank=True, null=True)
    cnpj = models.CharField(max_length=14, unique=True, blank=True, null=True)

    # Novos campos para a página de perfil (servem para todos)
    bio = models.TextField(blank=True, null=True)
    especializacoes = models.CharField(max_length=255, blank=True, null=True)
    tags = models.CharField(max_length=255, blank=True, null=True, help_text="Tags separadas por vírgula")
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Disponível')
    foto_perfil = models.ImageField(upload_to='profile_pics/', blank=True, null=True)

    def __str__(self):
        return f'{self.user.username} - {self.user_type}'

# --- SINAIS PARA CRIAR/SALVAR O PERFIL AUTOMATICAMENTE ---
# Isso garante que todo usuário novo tenha um perfil associado
@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    instance.profile.save()


# --- SEUS OUTROS MODELOS (NÃO FORAM ALTERADOS) ---
class Tag(models.Model):
    nome = models.CharField(max_length=50, unique=True)
    def __str__(self):
        return self.nome

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