# api/admin.py

from django.contrib import admin
# ATUALIZADO: Importamos o novo 'Profile' e removemos o antigo 'ContratanteProfile'
from .models import Profile, Vaga, Tag

# Registramos os modelos para que apareçam na interface de administração
admin.site.register(Profile)
admin.site.register(Vaga)
admin.site.register(Tag)