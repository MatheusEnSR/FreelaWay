import React, { useState, useContext } from 'react'; // useContext movido para o import principal
import './login.css';
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext'; // Ajustei o caminho do import

const LoginPage = () => {
  // 1. Hooks são chamados AQUI, dentro do componente
  const { loginUser, user } = useContext(AuthContext); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name] || errors.form) {
      setErrors(prev => ({ ...prev, [name]: '', form: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 2. A função handleSubmit está AQUI, dentro do componente
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const payload = {
        username: formData.email,
        password: formData.password,
      };

      const response = await fetch('/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Credenciais inválidas.');
      }

      // 3. Sucesso! Usando a função do AuthContext
      loginUser(data); // Isso salva os tokens e atualiza o estado global 'user'
      
      alert('Login realizado com sucesso!');

      // 4. Redirecionamento Inteligente (Bônus!)
      // O 'data.access' é o token JWT que contém o user_type que criamos no Django
      const decodedToken = JSON.parse(atob(data.access.split('.')[1]));
      if (decodedToken.user_type === 'contratante') {
        navigate('/empregador/dashboard');
      } else {
        navigate('/vagas'); // Ou para o perfil do aplicante, etc.
      }

    } catch (error) {
      console.error('Erro no login:', error);
      setErrors({ form: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  // O resto do seu JSX continua exatamente o mesmo
  return (
    <div className="login-container">
      <div className="login-card">
        {/* ... seu JSX do formulário ... */}
        <form onSubmit={handleSubmit} className="login-form" noValidate>
           {/* ... seus inputs e botões ... */}
           {/* ... */}
        </form>
        {/* ... */}
      </div>
    </div>
  );
};

export default LoginPage;