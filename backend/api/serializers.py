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
# backend/api/serializers.py

# ... (mantenha os outros serializers e imports) ...

class ContratanteRegisterSerializer(serializers.ModelSerializer):
    # Campos que podem vir do frontend
    contractor_type = serializers.ChoiceField(choices=ContratanteProfile.CONTRACTOR_TYPE_CHOICES, write_only=True)

    # TORNANDO ESTES CAMPOS OPCIONAIS NO NÍVEL DO SERIALIZER
    first_name = serializers.CharField(write_only=True, required=False)
    last_name = serializers.CharField(write_only=True, required=False)
    cpf = serializers.CharField(write_only=True, required=False, allow_blank=True)
    nome_empresa = serializers.CharField(write_only=True, required=False, allow_blank=True)
    cnpj = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ('email', 'password', 'first_name', 'last_name', 'contractor_type', 'cpf', 'nome_empresa', 'cnpj')
        extra_kwargs = {'password': {'write_only': True}}

    # A VALIDAÇÃO GARANTE A LÓGICA CORRETA
    def validate(self, data):
        if data.get('contractor_type') == 'PF':
            if not data.get('cpf'):
                raise serializers.ValidationError({"cpf": "CPF é obrigatório para Pessoa Física."})
            if not data.get('first_name') or not data.get('last_name'):
                raise serializers.ValidationError({"nome": "Nome e Sobrenome são obrigatórios para Pessoa Física."})

        if data.get('contractor_type') == 'PJ':
            if not data.get('nome_empresa') or not data.get('cnpj'):
                raise serializers.ValidationError({"cnpj": "Nome da Empresa e CNPJ são obrigatórios para Pessoa Jurídica."})

        return data

    @transaction.atomic
    def create(self, validated_data):
        profile_data = {
            'contractor_type': validated_data.pop('contractor_type'),
            'cpf': validated_data.pop('cpf', None),
            'nome_empresa': validated_data.pop('nome_empresa', None),
            'cnpj': validated_data.pop('cnpj', None)
        }

        # Para o User, pegamos os dados que existem, com um valor padrão para PJ
        user_first_name = validated_data.get('first_name', '')
        user_last_name = validated_data.get('last_name', '')

        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=user_first_name,
            last_name=user_last_name
        )

        ContratanteProfile.objects.create(user=user, **profile_data)
        return user
# Serializer para exibir as Vagas
class VagaSerializer(serializers.ModelSerializer):
    # Este campo exibe os nomes das tags (somente leitura)
    tags_display = serializers.StringRelatedField(source='tags', many=True, read_only=True)

    # Este campo aceita uma lista de nomes de tags ao criar/editar uma vaga
    tags = serializers.ListField(
        child=serializers.CharField(max_length=50),
        write_only=True,
        required=False
    )

    nome_contratante = serializers.CharField(source='contratante.contratante_profile.nome_empresa', read_only=True)

    class Meta:
        model = Vaga
        # Adicione 'tags_display' e remova o 'tags' original dos fields
        fields = [
            'id', 'titulo', 'local', 'salario', 'idioma', 
            'descricao_breve', 'descricao_detalhada', 'tags_display', 'nome_contratante', 
            'recomendada', 'tags', 'data_criacao' # Adicione o 'tags' de escrita
        ]
        # Garante que alguns campos só apareçam na leitura
        read_only_fields = ['id', 'nome_contratante', 'tags_display', 'data_criacao']

    def create(self, validated_data):
        # Tira as tags dos dados validados antes de criar a vaga
        tag_names = validated_data.pop('tags', [])
        vaga = Vaga.objects.create(**validated_data)

        # Para cada nome de tag, pega o objeto Tag (ou cria se não existir)
        for tag_name in tag_names:
            tag, _ = Tag.objects.get_or_create(nome=tag_name.strip())
            vaga.tags.add(tag)

        return vaga

# Serializer para exibir as Tags
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['nome']


#Novos Campos: Adicionamos os campos contractor_type, cpf e last_name para que o serializer possa receber todos os dados possíveis do formulário dinâmico.

#Validação Inteligente: Adicionamos uma função validate. Ela é a parte mais importante, pois verifica se o contractor_type é 'PF' (e exige o CPF) ou 'PJ' (e exige CNPJ e Nome da Empresa). Isso torna sua API mais segura e robusta.

#Método create Atualizado: A função que cria o usuário agora separa os dados do perfil dos dados do usuário e salva tudo corretamente nos modelos User e ContratanteProfile de uma só vez.