# backend/api/models.py

from django.db import models
from django.contrib.auth.models import User

# Modelo para o perfil de um Contratante (AGORA SUPORTA PF e PJ)
class ContratanteProfile(models.Model):
    # Opções para o novo campo de tipo de contratante
    CONTRACTOR_TYPE_CHOICES = (
        ('PF', 'Pessoa Física'),
        ('PJ', 'Pessoa Jurídica'),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='contratante_profile')
    
    # --- ALTERAÇÃO FEITA AQUI ---
    # Adicionado default='PJ' para resolver a questão da migração.
    contractor_type = models.CharField(max_length=2, choices=CONTRACTOR_TYPE_CHOICES, default='PJ')
    
    # Campos de Pessoa Jurídica (agora opcionais)
    nome_empresa = models.CharField(max_length=255, blank=True, null=True)
    cnpj = models.CharField(max_length=14, unique=True, blank=True, null=True)

    # Novo campo para Pessoa Física
    cpf = models.CharField(max_length=11, unique=True, blank=True, null=True)

    def __str__(self):
        if self.contractor_type == 'PJ' and self.nome_empresa:
            return self.nome_empresa
        return self.user.get_full_name() or self.user.username

# Modelo para as Tags das vagas (NÃO FOI ALTERADO)
class Tag(models.Model):
    nome = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.nome

# Modelo para as Vagas (NÃO FOI ALTERADO)
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

# ======================================================================
# NOTAS SOBRE AS ALTERAÇÕES E ESTRUTURA (25/09/2025) *cv*
# ======================================================================
#
# O que este arquivo faz:
# ----------------------
# Este arquivo define a "planta" do nosso banco de dados. Cada classe
# representa uma tabela e cada variável dentro da classe representa uma
# coluna nessa tabela.
#
# -- Classe ContratanteProfile --
#
# Propósito: Armazena informações adicionais para usuários que são
# contratantes. Foi projetada para lidar tanto com Pessoas Físicas (PF)
# quanto Pessoas Jurídicas (PJ).
#
# Alterações realizadas:
# 1.  `contractor_type`: Foi adicionado um novo campo de texto para guardar
#     a escolha do usuário no momento do cadastro ('PF' ou 'PJ').
#     - `default='PJ'`: Adicionamos este valor padrão para que o Django
#       saiba o que colocar neste campo para os usuários contratantes
#       que já existiam no banco de dados antes da mudança. Isso resolve
#       o problema que apareceu ao rodar o `makemigrations`.
#
# 2.  `cpf`: Foi adicionado um campo de texto para guardar o CPF, que será
#     usado apenas se o `contractor_type` for 'PF'.
#
# 3.  Campos Opcionais (`nome_empresa`, `cnpj`): Foram marcados como
#     opcionais (`blank=True, null=True`) porque um contratante PF não
#     terá essas informações. O mesmo foi feito para o `cpf`, já que
#     um contratante PJ não o terá.
#
# -- Classes Tag e Vaga --
#
# Propósito: Estas classes não foram alteradas. Elas continuam a definir
# a estrutura para as vagas e as tags (palavras-chave) associadas a elas.
#
# ======================================================================