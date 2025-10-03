import React, { useState, useContext } from 'react';
import './login.css';
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaGoogle, FaFacebook, FaArrowLeft } from 'react-icons/fa'; 
import { AuthContext } from '../../context/AuthContext';

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // ... (toda a sua lógica handleChange, validateForm, handleSubmit continua a mesma)
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
      
console.log("Resposta do Backend (/api/token/):", data);

      if (!response.ok) {
        throw new Error(data.detail || 'Credenciais inválidas.');
      }

      loginUser(data);
      alert('Login realizado com sucesso!');

      const decodedToken = JSON.parse(atob(data.access.split('.')[1]));
      if (decodedToken.user_type === 'contratante') {
        navigate('/empregador/dashboard');
      } else {
        navigate('/vagas');
      }

    } catch (error) {
      console.error('Erro no login:', error);
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

          {errors.form && <span className="error-message form-error" style={{ textAlign: 'center', marginBottom: '15px' }}>{errors.form}</span>}

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? <div className="loading-spinner"></div> : 'Entrar na Conta'}
          </button>
        </form>

        <div className="login-footer">
            <p>Ainda não tem uma conta?</p>
            <div className="signup-options">
                <Link to="/cadastroa">Cadastre-se como Candidato</Link>
                <span>ou</span>
                <Link to="/cadastroc">Cadastre-se como Contratante</Link>
            </div>
        </div>

        <div className="social-login">
          <p>Ou entre com</p>
          <div className="social-buttons">
            <button className="social-button google" disabled={isLoading}><FaGoogle /> Google</button>
            <button className="social-button facebook" disabled={isLoading}><FaFacebook /> Facebook</button>
          </div>
        </div>
        
        {/* BOTÃO DE VOLTAR MOVIDO PARA O FINAL DO CARD */}
        <Link to="/" className="back-button">
          <FaArrowLeft /> Voltar para o Início
        </Link>

      </div>
    </div>
  );
};

export default LoginPage; 