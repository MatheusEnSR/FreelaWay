# Backend Django - FreelaWay

Este é o backend Django que substitui o backend Node.js/Express original.

## Pré-requisitos

- Python 3.8+
- MongoDB instalado e rodando
- pip (gerenciador de pacotes Python)

## Instalação

1. **Crie um virtual environment:**
   ```bash
   cd backend_django
   python -m venv venv
   ```

2. **Ative o virtual environment:**
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - Linux/Mac:
     ```bash
     source venv/bin/activate
     ```

3. **Instale as dependências:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure as variáveis de ambiente:**
   ```bash
   cp .env.example .env
   ```
   Edite o arquivo `.env` com suas configurações.

5. **Execute as migrações:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Execute o servidor:**
   ```bash
   python manage.py runserver
   ```

## Endpoints Disponíveis

### POST /api/users/
Cria um novo usuário

**Body:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@email.com",
  "created_at": "2023-12-01T10:00:00Z",
  "updated_at": "2023-12-01T10:00:00Z"
}
```

### GET /api/users/
Retorna todos os usuários

**Response:**
```json
[
  {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com",
    "created_at": "2023-12-01T10:00:00Z",
    "updated_at": "2023-12-01T10:00:00Z"
  }
]
```

## Estrutura do Projeto

```
backend_django/
├── freelaway/          # Configurações principais do projeto
├── users/             # App de usuários
│   ├── models.py      # Modelo User
│   ├── serializers.py # Serializers para API
│   ├── views.py       # Views (controllers)
│   └── urls.py        # URLs do app
├── manage.py          # Script de administração
├── requirements.txt   # Dependências
└── .env.example       # Exemplo de variáveis de ambiente
```

## Diferenças do Backend Original

- **Framework**: Django REST Framework instead of Express.js
- **ORM**: Django ORM with djongo instead of Mongoose
- **Validações**: Validações built-in do Django + validações customizadas
- **Estrutura**: Arquitetura MVC do Django (Models, Views, URLs)

## Próximos Passos

1. Configure o MongoDB na sua máquina
2. Ajuste as variáveis de ambiente no arquivo `.env`
3. Teste os endpoints com o frontend React
4. Adicione autenticação JWT se necessário
