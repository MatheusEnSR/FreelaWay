# backend/api/serializers.py

from django.contrib.auth.models import User
from django.db import transaction
from rest_framework import serializers
from .models import Vaga, Tag, Profile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


# Serializer para o token de login
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['user_type'] = user.profile.user_type
        return token

# Serializer para o perfil do usuário
class ProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = Profile
        fields = [
            'first_name', 'last_name', 'email', 'bio', 
            'especializacoes', 'tags', 'status', 'foto_perfil',
            'user_type', 'contractor_type', 'cpf', 'nome_empresa', 'cnpj'
        ]
        read_only_fields = ['user_type']

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        user = instance.user
        user.first_name = user_data.get('first_name', user.first_name)
        user.last_name = user_data.get('last_name', user.last_name)
        user.save()
        return super().update(instance, validated_data)

# Serializer de cadastro unificado
class UserRegisterSerializer(serializers.ModelSerializer):
    user_type = serializers.ChoiceField(choices=Profile.USER_TYPE_CHOICES, write_only=True)
    contractor_type = serializers.ChoiceField(choices=Profile.CONTRACTOR_TYPE_CHOICES, write_only=True, required=False)
    cpf = serializers.CharField(write_only=True, required=False, allow_blank=True)
    nome_empresa = serializers.CharField(write_only=True, required=False, allow_blank=True)
    cnpj = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ('email', 'password', 'first_name', 'last_name', 'user_type', 'contractor_type', 'cpf', 'nome_empresa', 'cnpj')
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        if data.get('user_type') == 'contratante':
            if data.get('contractor_type') == 'PF' and not data.get('cpf'):
                raise serializers.ValidationError({"cpf": "CPF é obrigatório para Pessoa Física."})
            if data.get('contractor_type') == 'PJ' and (not data.get('nome_empresa') or not data.get('cnpj')):
                raise serializers.ValidationError({"cnpj": "Nome da Empresa e CNPJ são obrigatórios para Pessoa Jurídica."})
        return data

    @transaction.atomic
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        profile = user.profile
        profile.user_type = validated_data.get('user_type')
        if profile.user_type == 'contratante':
            profile.contractor_type = validated_data.get('contractor_type')
            profile.cpf = validated_data.get('cpf')
            profile.nome_empresa = validated_data.get('nome_empresa')
            profile.cnpj = validated_data.get('cnpj')
        profile.save()
        return user

# Serializer de Vagas (a classe que estava faltando)
class VagaSerializer(serializers.ModelSerializer):
    # Campo para EXIBIR as tags (somente leitura)
    tags_display = serializers.StringRelatedField(source='tags', many=True, read_only=True)
    
    # NOVO CAMPO: Para RECEBER os IDs das tags ao criar/editar
    tags = serializers.PrimaryKeyRelatedField(
        many=True, 
        queryset=Tag.objects.all(), 
        write_only=True,
        required=False # Torna opcional enviar tags
    )
    
    nome_contratante = serializers.CharField(source='contratante.profile.nome_empresa', read_only=True, allow_null=True)

    class Meta:
        model = Vaga
        fields = [
            'id', 'titulo', 'local', 'salario', 'idioma', 
            'descricao_breve', 'descricao_detalhada', # Adicionei a desc detalhada
            'tags_display', # Campo de leitura
            'nome_contratante', 'recomendada', 'data_criacao',
            'tags' # Campo de escrita
        ]
        read_only_fields = ['id', 'nome_contratante', 'tags_display', 'data_criacao']

    # O create agora é mais simples. O DRF lida com as tags
    def create(self, validated_data):
        return super().create(validated_data)
    
# Serializer de Tags
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'nome'] # ALTERAÇÃO: Adicionado 'id'

# Serializer para troca de senha
class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)