import React, { useState } from 'react';
// 1. ADICIONAMOS 'Link' À IMPORTAÇÃO
import { Link, useNavigate } from 'react-router-dom'; 
import '../Login/login.css'; // Reutiliza o estilo do login
import './cadastro.css'; // Estilos específicos para o cadastro
// 2. ADICIONAMOS O ÍCONE DE SETA
import { FaBuilding, FaUserTie, FaIdCard, FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa'; 

const CadastroContratante = () => {
    const navigate = useNavigate();
    
    // Mudei o padrão inicial para 'PJ' para refletir a mudança mais comum
    const [contractorType, setContractorType] = useState('PJ'); 

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        cpf: '',
        nome_empresa: '',
        cnpj: '',
    });

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // O payload agora só envia nome/sobrenome se for PF
        const payload = {
            username: formData.email,
            email: formData.email,
            password: formData.password,
            contractor_type: contractorType,
        };

        if (contractorType === 'PF') {
            payload.first_name = formData.first_name;
            payload.last_name = formData.last_name;
            payload.cpf = formData.cpf;
        } else { // 'PJ'
            payload.nome_empresa = formData.nome_empresa;
            payload.cnpj = formData.cnpj;
        }

        try {
            const response = await fetch('/api/register/contratante/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            if (!response.ok) {
                const errorMessages = Object.values(data).flat().join(' ');
                throw new Error(errorMessages || 'Falha no cadastro.');
            }

            alert('Cadastro de contratante realizado com sucesso!');
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
                    <h1>Cadastro de Contratante</h1>
                    <p>Encontre os melhores profissionais para seus projetos.</p>
                </div>

                <div className="form-type-selector">
                    <button 
                        type="button"
                        className={contractorType === 'PF' ? 'active' : ''} 
                        onClick={() => setContractorType('PF')}>
                        Pessoa Física
                    </button>
                    <button 
                        type="button"
                        className={contractorType === 'PJ' ? 'active' : ''} 
                        onClick={() => setContractorType('PJ')}>
                        Pessoa Jurídica
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="login-form">

                    {/* --- ALTERAÇÃO APLICADA AQUI --- */}
                    {/* Campos de Nome e Sobrenome agora só aparecem para Pessoa Física */}
                    {contractorType === 'PF' && (
                        <>
                            <div className="form-group">
                                <label><FaUserTie className="input-icon" /> Nome Completo</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input name="first_name" type="text" placeholder="Seu Nome" value={formData.first_name} onChange={handleChange} required />
                                    <input name="last_name" type="text" placeholder="Seu Sobrenome" value={formData.last_name} onChange={handleChange} required />
                                </div>
                            </div>
                             <div className="form-group">
                               <label><FaIdCard className="input-icon" /> CPF</label>
                               <input name="cpf" type="text" placeholder="Apenas números" value={formData.cpf} onChange={handleChange} required />
                            </div>
                        </>
                    )}

                    {/* Se for Pessoa Jurídica, mostra os campos da Empresa */}
                    {contractorType === 'PJ' && (
                        <>
                            <div className="form-group">
                                <label><FaBuilding className="input-icon" /> Nome da Empresa</label>
                                <input name="nome_empresa" type="text" placeholder="Nome da sua empresa" value={formData.nome_empresa} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label><FaIdCard className="input-icon" /> CNPJ</label>
                                <input name="cnpj" type="text" placeholder="Apenas números" value={formData.cnpj} onChange={handleChange} required />
                            </div>
                        </>
                    )}
                    
                    {/* Campos de Email e Senha aparecem para ambos */}
                    <div className="form-group">
                        <label><FaEnvelope className="input-icon" /> Email</label>
                        <input name="email" type="email" placeholder="Email de Contato" value={formData.email} onChange={handleChange} required />
                    </div>
                    
                    <div className="form-group">
                        <label><FaLock className="input-icon" /> Senha</label>
                        <input name="password" type="password" placeholder="Crie uma senha segura" value={formData.password} onChange={handleChange} required />
                    </div>

                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="login-button" disabled={isLoading}>
                        {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                    </button>
                </form>

                <div className="login-footer">
                    <p>Já tem uma conta? <Link to="/login">Faça login</Link></p>
                </div>

                {/* 3. BOTÃO DE VOLTAR ADICIONADO AQUI */}
                <Link to="/" className="back-button">
                    <FaArrowLeft /> Voltar para o Início
                </Link>
                
            </div>
        </div>
    );
};

export default CadastroContratante;