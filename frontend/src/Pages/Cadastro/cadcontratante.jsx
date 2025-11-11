import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Login/login.css'; // Reutiliza o estilo do login
import './cadastro.css'; // Estilos específicos para o cadastro
import { FaBuilding, FaUserTie, FaIdCard, FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa';
import { useI18n } from '../../i18n/useI18n.jsx'; // Importando useI18n

const CadastroContratante = () => {
    const { t } = useI18n(); // Inicializando a função de tradução
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

        const payload = {
            username: formData.email,
            email: formData.email,
            password: formData.password,
            user_type: 'contratante',
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
            const response = await fetch('http://127.0.0.1:8000/api/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            if (!response.ok) {
                const errorMessages = Object.values(data).flat().join(' ');
                throw new Error(errorMessages || t('error_registration_failed'));
            }

            alert(t('alert_employer_registration_success'));
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
                    <h1>{t('register_employer_title')}</h1>
                    <p>{t('register_employer_subtitle')}</p>
                </div>

                <div className="form-type-selector">
                    <button 
                        type="button"
                        className={contractorType === 'PF' ? 'active' : ''} 
                        onClick={() => setContractorType('PF')}>
                        {t('contractor_type_pf')}
                    </button>
                    <button 
                        type="button"
                        className={contractorType === 'PJ' ? 'active' : ''} 
                        onClick={() => setContractorType('PJ')}>
                        {t('contractor_type_pj')}
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="login-form">

                    {contractorType === 'PF' && (
                        <>
                            <div className="form-group">
                                <label><FaUserTie className="input-icon" /> {t('label_full_name')}</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input name="first_name" type="text" placeholder={t('placeholder_first_name')} value={formData.first_name} onChange={handleChange} required />
                                    <input name="last_name" type="text" placeholder={t('placeholder_last_name')} value={formData.last_name} onChange={handleChange} required />
                                </div>
                            </div>
                             <div className="form-group">
                               <label><FaIdCard className="input-icon" /> {t('label_cpf')}</label>
                               <input name="cpf" type="text" placeholder={t('placeholder_numbers_only')} value={formData.cpf} onChange={handleChange} required />
                             </div>
                        </>
                    )}

                    {contractorType === 'PJ' && (
                        <>
                            <div className="form-group">
                                <label><FaBuilding className="input-icon" /> {t('label_company_name')}</label>
                                <input name="nome_empresa" type="text" placeholder={t('placeholder_company_name')} value={formData.nome_empresa} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label><FaIdCard className="input-icon" /> {t('label_cnpj')}</label>
                                <input name="cnpj" type="text" placeholder={t('placeholder_numbers_only')} value={formData.cnpj} onChange={handleChange} required />
                            </div>
                        </>
                    )}
                    
                    <div className="form-group">
                        <label><FaEnvelope className="input-icon" /> {t('label_email')}</label>
                        <input name="email" type="email" placeholder={t('placeholder_contact_email')} value={formData.email} onChange={handleChange} required />
                    </div>
                    
                    <div className="form-group">
                        <label><FaLock className="input-icon" /> {t('label_password')}</label>
                        <input name="password" type="password" placeholder={t('placeholder_create_secure_password')} value={formData.password} onChange={handleChange} required />
                    </div>

                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="login-button" disabled={isLoading}>
                        {isLoading ? t('button_registering') : t('button_register')}
                    </button>
                </form>

                <div className="login-footer">
                    <p>{t('text_already_have_account')} <Link to="/login">{t('link_login_here')}</Link></p>
                </div>

                <Link to="/" className="back-button">
                    <FaArrowLeft /> {t('link_back_to_home')}
                </Link>
                
            </div>
        </div>
    );
};

export default CadastroContratante;