import React, { useState, useContext } from 'react';
import './login.css';
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaGoogle, FaFacebook } from 'react-icons/fa';
// import { AuthContext } from '../../context/AuthContext'; // Descomente quando o Contexto estiver 100% pronto

const LoginPage = () => {
  // const { loginUser } = useContext(AuthContext); // Descomente quando for usar o Contexto
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // A lógica para lidar com as mudanças nos inputs permanece a mesma
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name] || errors.form) {
      setErrors(prev => ({ ...prev, [name]: '', form: '' }));
    }
  };

  // A lógica de validação permanece a mesma
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

  // A lógica de SUBMISSÃO para o backend permanece a mesma
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

      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Credenciais inválidas. Verifique seu email e senha.');
      }

      // Sucesso!
      // loginUser(data); // No futuro, esta função salvará o token no AuthContext
      console.log("Tokens recebidos:", data); 
      alert('Login realizado com sucesso!');
      
      navigate('/'); // Redireciona para a home após o login

    } catch (error) {
      console.error('Erro no login:', error);
      setErrors({ form: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  // O JSX foi reconstruído para usar as SUAS classes CSS
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Bem-vindo!</h1>
          <p>Faça login para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className="form-group">
            <label htmlFor="email"><FaEnvelope className="input-icon" /> Email</label>
            <div className="input-with-icon">
              <input
                id="email"
                type="email"
                name="email"
                placeholder="exemplo@email.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password"><FaLock className="input-icon" /> Senha</label>
            <div className="input-with-icon">
              <input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          
          {errors.form && <span className="error-message form-error" style={{textAlign: 'center', marginBottom: '15px'}}>{errors.form}</span>}

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? <div className="loading-spinner" /> : 'Entrar na Conta'}
          </button>
        </form>

        <div className="login-footer">
          <p>Ainda não tem uma conta? <Link to="/cadastroa">Crie uma agora</Link></p>
        </div>

        <div className="social-login">
          <p>Ou entre com</p>
          <div className="social-buttons">
            <button className="social-button google" disabled={isLoading}><FaGoogle /> Google</button>
            <button className="social-button facebook" disabled={isLoading}><FaFacebook /> Facebook</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;