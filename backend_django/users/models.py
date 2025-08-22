from django.db import models
from django.core.exceptions import ValidationError
import re

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'users'
        ordering = ['-created_at']

    def clean(self):
        # Validações adicionais
        if not self.name.strip():
            raise ValidationError({'name': 'Nome é obrigatório'})
        
        if not self.email.strip():
            raise ValidationError({'email': 'Email é obrigatório'})
        
        if not self.password.strip():
            raise ValidationError({'password': 'Senha é obrigatória'})
        
        # Validação básica de email
        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_regex, self.email):
            raise ValidationError({'email': 'Email inválido'})

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.email})"
