from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'created_at', 'updated_at']
        extra_kwargs = {
            'password': {'write_only': True},
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True},
        }

    def validate_email(self, value):
        """
        Valida se o email já existe no banco de dados
        """
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este email já está em uso.")
        return value

    def validate_password(self, value):
        """
        Validação básica da senha
        """
        if len(value) < 6:
            raise serializers.ValidationError("A senha deve ter pelo menos 6 caracteres.")
        return value

    def create(self, validated_data):
        """
        Cria um novo usuário
        """
        user = User.objects.create(**validated_data)
        return user
