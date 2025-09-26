import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // 1. ADICIONADO 'Link' À IMPORTAÇÃO
import { FaUser, FaLanguage, FaIdCard, FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa'; // 2. ADICIONADO ÍCONE DE SETA

// Lembre-se de ajustar o caminho para o seu arquivo CSS, se necessário
import './cadastro.css'; 
import '../Login/login.css'; // Importamos o CSS do login para aproveitar o estilo do botão de voltar

const CadastroAplicante = () => {
  const [formData, setFormData] = useState({
    nome: '',
    idioma: '',
    cpf: '',
    email: '',
    senha: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("--- Formulário enviado, iniciando processo ---");

    const payload = {
      username: formData.email,
      email: formData.email,
      password: formData.senha,
      first_name: formData.nome,
      last_name: "", // Podemos enviar um sobrenome vazio por enquanto
    };

    console.log(">>> PAYLOAD A SER ENVIADO:", payload);

    try {
      // Usando a URL correta para o cadastro de aplicante
      const response = await fetch('http://127.0.0.1:8000/api/register/', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      const responseData = await response.json();
      console.log("<<< RESPOSTA RECEBIDA DO SERVIDOR:", responseData);

      if (!response.ok) {
        const errorMessages = Object.entries(responseData).map(([key, value]) => `${key}: ${value[0]}`).join('\n');
        throw new Error(errorMessages);
      }
      
      console.log("✅ SUCESSO! Cadastro realizado.");
      alert('Cadastro de aplicante realizado com sucesso!');
      navigate('/login');

    } catch (error) {
      console.error("❌ ERRO NA REQUISIÇÃO:", error);
      alert(`Ocorreu um erro no cadastro:\n${error.message}`);
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
          {/* SEU FORMULÁRIO CONTINUA O MESMO AQUI */}
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

        {/* 3. ADICIONAMOS O BOTÃO DE VOLTAR AQUI */}
        <Link to="/" className="back-button">
          <FaArrowLeft /> Voltar para o Início
        </Link>
        
      </div>
    </div>
  );
};

export default CadastroAplicante;