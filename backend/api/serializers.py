# backend/api/serializers.py

from django.contrib.auth.models import User
from django.db import transaction
from rest_framework import serializers
from .models import Vaga, Tag, ContratanteProfile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


# Serializer para definir se a conta do usuário é contratante ou empregador.
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Adiciona informações customizadas ao token (opcional, mas útil)
        token['username'] = user.username

        # Checa se o usuário tem um perfil de contratante associado a ele
        if hasattr(user, 'contratante_profile'):
            token['user_type'] = 'contratante'
        else:
            token['user_type'] = 'aplicante'

        return token

# Serializer para o cadastro de Aplicantes
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['email'], # Usando email como username
            email=validated_data['email'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

# Serializer para o cadastro de Contratantes
class ContratanteRegisterSerializer(serializers.ModelSerializer):
    nome_empresa = serializers.CharField(write_only=True)
    cnpj = serializers.CharField(write_only=True)
    first_name = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('email', 'password', 'first_name', 'nome_empresa', 'cnpj')
        extra_kwargs = {'password': {'write_only': True}}

    @transaction.atomic
    def create(self, validated_data):
        profile_data = {
            'nome_empresa': validated_data.pop('nome_empresa'),
            'cnpj': validated_data.pop('cnpj')
        }
        user_data = {'first_name': validated_data.pop('first_name')}
        validated_data['username'] = validated_data['email']
        
        user = User.objects.create_user(**validated_data)
        user.first_name = user_data['first_name']
        user.save()

        ContratanteProfile.objects.create(user=user, **profile_data)
        return user

# Serializer para exibir as Vagas
class VagaSerializer(serializers.ModelSerializer):
    tags = serializers.StringRelatedField(many=True, read_only=True)
    nome_contratante = serializers.CharField(source='contratante.contratante_profile.nome_empresa', read_only=True)

    class Meta:
        model = Vaga
        fields = [
            'id', 'titulo', 'local', 'salario', 'idioma', 
            'descricao_breve', 'tags', 'nome_contratante', 'recomendada'
        ]

# Serializer para exibir as Tags (pode ser útil no futuro)
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['nome']