import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from "react-router-dom"; // 1. Importar useNavigate
import { FaEnvelope, FaLock } from 'react-icons/fa';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // 2. Inicializar o hook de navegação

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name] || errors.form) {
      setErrors(prev => ({ ...prev, [name]: '', form: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    // 3. Regex do email corrigido
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

  // 4. Lógica de handleSubmit substituída pela chamada real à API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({}); // Limpa erros antigos

    try {
      const payload = {
        username: formData.email, // A API espera 'username', que é o nosso email
        password: formData.password,
      };

      const response = await fetch('/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        // Se a resposta não for OK, lança um erro com a mensagem do backend
        throw new Error(data.detail || 'Credenciais inválidas.');
      }

      // Sucesso!
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      alert('Login realizado com sucesso!');
      navigate('/vagas'); // Redireciona para o dashboard ou página principal

    } catch (error) {
      console.error('Erro no login:', error);
      // Exibe o erro vindo da API no formulário
      setErrors({ form: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Bem-vindo de volta</h1>
          <p>Faça login na sua conta</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope className="input-icon" /> Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="Digite seu email"
              disabled={isLoading}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <FaLock className="input-icon" /> Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${errors.password ? 'error' : ''}`}
              placeholder="Digite sua senha"
              disabled={isLoading}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-options">
            <label className="checkbox-container">
              <input type="checkbox" />
              <span className="checkmark"></span>
              Lembrar-me
            </label>
            <a href="#forgot" className="forgot-password">Esqueci minha senha</a>
          </div>

          {/* Exibe erros gerais do formulário, como "Credenciais inválidas" */}
          {errors.form && <span className="error-message">{errors.form}</span>}

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? <div className="loading-spinner"></div> : 'Entrar'}
          </button>
        </form>

        <div className="login-footer">
          <Link to="/cadastroa"> Cadastre-se como aplicante</Link>
          <br />
          <Link to="/cadastroc"> Cadastre-se como contratante</Link>
        </div>

        <div className="social-login">
          <p>Ou entre com</p>
          <div className="social-buttons">
            <button className="social-button google" disabled={isLoading}>
              <span>Google</span>
            </button>
            <button className="social-button facebook" disabled={isLoading}>
              <span>Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;