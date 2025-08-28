import React, { useState } from 'react';
import '../Login/login.css';
import './cadastro.css';
import { FaUser, FaLanguage, FaIdCard, FaEnvelope, FaLock } from 'react-icons/fa';

const CadastroAplicante = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    senha: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/aplicantes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Erro no cadastro');

      alert('Cadastro de aplicante realizado com sucesso!');
      setFormData({ nome: '', idioma: '', cpf: '', email: '', senha: '' });

    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Cadastro de Aplicante</h1>
          <p>Crie sua conta para se candidatar às vagas</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>
              <FaUser className="input-icon" /> Nome Completo
            </label>
            <input 
              type="text" 
              name="nome" 
              value={formData.nome} 
              onChange={handleChange} 
              className="form-input"
              placeholder='Digite seu nome completo' 
              required 
            />
          </div>

          <div className="form-group">
            <label>
              <FaLanguage className="input-icon" /> Idiomas
            </label>
            <input 
              type="text" 
              name="idioma" 
              value={formData.idioma} 
              onChange={handleChange} 
              className="form-input"
              placeholder='Ex: Português, Inglês, Espanhol' 
              required 
            />
          </div>

          <div className="form-group">
            <label>
              <FaIdCard className="input-icon" /> CPF
            </label>
            <input 
              type="text" 
              name="cpf" 
              value={formData.cpf} 
              onChange={handleChange} 
              className="form-input"
              placeholder='Apenas números' 
              required 
            />
          </div>

          <div className="form-group">
            <label>
              <FaEnvelope className="input-icon" /> Email
            </label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className="form-input"
              placeholder='seu@email.com' 
              required 
            />
          </div>

          <div className="form-group">
            <label>
              <FaLock className="input-icon" /> Senha
            </label>
            <input 
              type="password" 
              name="senha" 
              value={formData.senha} 
              onChange={handleChange} 
              className="form-input"
              placeholder='Crie uma senha segura' 
              required 
            />
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? <div className="loading-spinner"></div> : 'Cadastrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadastroAplicante;
