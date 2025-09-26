# backend/api/serializers.py

from django.contrib.auth.models import User
from django.db import transaction
from rest_framework import serializers
from .models import Vaga, Tag, ContratanteProfile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


# Serializer para o token de login (NÃO FOI ALTERADO)
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        if hasattr(user, 'contratante_profile'):
            token['user_type'] = 'contratante'
        else:
            token['user_type'] = 'aplicante'
        return token

# Serializer para o cadastro de Aplicantes (NÃO FOI ALTERADO)
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data.get('email') or validated_data.get('username'),
            email=validated_data.get('email'),
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

# ======================================================================
# CLASSE ALTERADA PARA ACEITAR PF E PJ
# ======================================================================
class ContratanteRegisterSerializer(serializers.ModelSerializer):
    # Definimos todos os campos que podem vir do frontend
    first_name = serializers.CharField(write_only=True, required=True)
    last_name = serializers.CharField(write_only=True, required=True)
    contractor_type = serializers.ChoiceField(choices=ContratanteProfile.CONTRACTOR_TYPE_CHOICES, write_only=True)
    cpf = serializers.CharField(write_only=True, required=False, allow_blank=True)
    nome_empresa = serializers.CharField(write_only=True, required=False, allow_blank=True)
    cnpj = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ('email', 'password', 'first_name', 'last_name', 'contractor_type', 'cpf', 'nome_empresa', 'cnpj')
        extra_kwargs = {'password': {'write_only': True}}
    
    # Validação para garantir que os campos corretos sejam enviados
    def validate(self, data):
        if data.get('contractor_type') == 'PF' and not data.get('cpf'):
            raise serializers.ValidationError({"cpf": "CPF é obrigatório para Pessoa Física."})
        if data.get('contractor_type') == 'PJ' and (not data.get('nome_empresa') or not data.get('cnpj')):
            raise serializers.ValidationError({"cnpj": "Nome da Empresa e CNPJ são obrigatórios para Pessoa Jurídica."})
        return data

    @transaction.atomic
    def create(self, validated_data):
        # Separa os dados do Perfil dos dados do Usuário
        profile_data = {
            'contractor_type': validated_data.pop('contractor_type'),
            'cpf': validated_data.pop('cpf', None),
            'nome_empresa': validated_data.pop('nome_empresa', None),
            'cnpj': validated_data.pop('cnpj', None)
        }
        
        # Cria o Usuário
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )

        # Cria o Perfil do Contratante com os dados corretos
        ContratanteProfile.objects.create(user=user, **profile_data)
        return user

# Serializer para exibir as Vagas (NÃO FOI ALTERADO)
class VagaSerializer(serializers.ModelSerializer):
    tags = serializers.StringRelatedField(many=True, read_only=True)
    nome_contratante = serializers.CharField(source='contratante.contratante_profile.nome_empresa', read_only=True)

    class Meta:
        model = Vaga
        fields = [
            'id', 'titulo', 'local', 'salario', 'idioma', 
            'descricao_breve', 'tags', 'nome_contratante', 'recomendada'
        ]

# Serializer para exibir as Tags (NÃO FOI ALTERADO)
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['nome']


#Novos Campos: Adicionamos os campos contractor_type, cpf e last_name para que o serializer possa receber todos os dados possíveis do formulário dinâmico.

#Validação Inteligente: Adicionamos uma função validate. Ela é a parte mais importante, pois verifica se o contractor_type é 'PF' (e exige o CPF) ou 'PJ' (e exige CNPJ e Nome da Empresa). Isso torna sua API mais segura e robusta.

#Método create Atualizado: A função que cria o usuário agora separa os dados do perfil dos dados do usuário e salva tudo corretamente nos modelos User e ContratanteProfile de uma só vez.