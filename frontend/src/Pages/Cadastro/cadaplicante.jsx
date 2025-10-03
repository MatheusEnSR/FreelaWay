import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaLanguage, FaIdCard, FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa';
import '../Login/login.css'; 
import './cadastro.css'; 

const CadastroAplicante = () => {
  // O seu código useState, handleChange, etc. continua o mesmo
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    cpf: '',
    email: '',
    password: '',
    idiomas: '', 
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // ==========================================================
    // ALTERAÇÃO FEITA AQUI
    // ==========================================================
    const payload = {
      username: formData.email,
      email: formData.email,
      password: formData.password,
      first_name: formData.first_name,
      last_name: formData.last_name,
      user_type: 'aplicante', // <-- ADICIONAMOS A ETIQUETA 'APLICANTE'
      cpf: formData.cpf,      
    };

    try {
      // Usando a URL unificada
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      const responseData = await response.json();

      if (!response.ok) {
        const errorMessages = Object.values(responseData).flat().join('\n');
        throw new Error(errorMessages || "Erro no cadastro");
      }
      
      alert('Cadastro de aplicante realizado com sucesso!');
      navigate('/login');

    } catch (err) {
      setError(err.message);
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
            <label><FaUser className="input-icon" /> Nome Completo</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                name="first_name" 
                value={formData.first_name} 
                onChange={handleChange} 
                placeholder='Seu nome' 
                required 
              />
              <input 
                type="text" 
                name="last_name" 
                value={formData.last_name} 
                onChange={handleChange} 
                placeholder='Seu sobrenome' 
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label><FaLanguage className="input-icon" /> Idiomas</label>
            <input 
              type="text" 
              name="idiomas" 
              value={formData.idiomas} 
              onChange={handleChange} 
              placeholder='Ex: Português, Inglês' 
              required 
            />
          </div>

          <div className="form-group">
            <label><FaIdCard className="input-icon" /> CPF</label>
            <input 
              type="text" 
              name="cpf" 
              value={formData.cpf} 
              onChange={handleChange} 
              placeholder='Apenas números' 
              required 
            />
          </div>

          <div className="form-group">
            <label><FaEnvelope className="input-icon" /> Email</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder='seu@email.com' 
              required 
            />
          </div>

          <div className="form-group">
            <label><FaLock className="input-icon" /> Senha</label>
            <input 
              type="password" 
              name="password"
              value={formData.password} 
              onChange={handleChange}
              placeholder='Crie uma senha segura' 
              required 
            />
          </div>

          {error && <p className="error-message" style={{textAlign: 'center'}}>{error}</p>}

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? <div className="loading-spinner"></div> : 'Cadastrar'}
          </button>
        </form>

        <Link to="/" className="back-button">
          <FaArrowLeft /> Voltar para o Início
        </Link>
      </div>
    </div>
  );
};

export default CadastroAplicante;