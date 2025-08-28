import React, { useState } from 'react';
import '../Login/login.css';
import './cadastro.css';
import { FaBuilding, FaUserTie, FaIdCard, FaEnvelope, FaLock, FaGlobeAmericas } from 'react-icons/fa';

const CadastroContratante = () => {
  const [formData, setFormData] = useState({
    nomeEmpresa: '',
    nomeResponsavel: '',
    cnpj: '',
    email: '',
    senha: '',
    idiomas: ''
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
      const response = await fetch('http://localhost:5000/api/contratantes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Erro no cadastro');

      alert('Cadastro de contratante realizado com sucesso!');
      setFormData({ nomeEmpresa: '', nomeResponsavel: '', cnpj: '', email: '', senha: '', idiomas: '' });

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
          <h1>Cadastro de Contratante</h1>
          <p>Crie sua conta para publicar vagas</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>
              <FaBuilding className="input-icon" /> Nome da Empresa
            </label>
            <input 
              type="text" 
              name="nomeEmpresa" 
              value={formData.nomeEmpresa} 
              onChange={handleChange} 
              className="form-input"
              placeholder='Digite o nome da empresa' 
              required 
            />
          </div>

          <div className="form-group">
            <label>
              <FaUserTie className="input-icon" /> Nome do Responsável
            </label>
            <input 
              type="text" 
              name="nomeResponsavel" 
              value={formData.nomeResponsavel} 
              onChange={handleChange} 
              className="form-input"
              placeholder='Seu nome completo' 
              required 
            />
          </div>

          <div className="form-group">
            <label>
              <FaIdCard className="input-icon" /> CNPJ
            </label>
            <input 
              type="text" 
              name="cnpj" 
              value={formData.cnpj} 
              onChange={handleChange} 
              className="form-input"
              placeholder='Apenas números' 
              required 
            />
          </div>

          <div className="form-group">
            <label>
              <FaGlobeAmericas className="input-icon" /> Idiomas da Empresa
            </label>
            <input 
              type="text" 
              name="idiomas" 
              value={formData.idiomas} 
              onChange={handleChange} 
              className="form-input"
              placeholder='Idiomas utilizados na empresa' 
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
              placeholder='Email corporativo' 
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

export default CadastroContratante;
