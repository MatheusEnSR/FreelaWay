from django.db import models

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
