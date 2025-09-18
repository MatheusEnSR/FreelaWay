from django.db import models

# Create your models here.
class Employer(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    company_name = models.CharField(max_length=100, blank=True, null=True)
    # Adicione outros campos relevantes aqui
    
    def __str__(self):
        return self.name
