# api/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(["POST"])
def register(request):
    username = request.data.get("username")
    password = request.data.get("password")
    # aqui você cria o usuário no banco
    return Response({"message": f"Usuário {username} criado!"})
