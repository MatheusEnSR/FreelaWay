import React, { useState, useContext } from 'react';
import './login.css';
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaGoogle, FaFacebook, FaArrowLeft } from 'react-icons/fa'; 
import { AuthContext } from '../../context/AuthContext';
import { useI18n } from '../../i18n/useI18n.jsx'; // Importando useI18n

const LoginPage = () => {
    const { loginUser } = useContext(AuthContext);
    const { t } = useI18n(); // Inicializando a função de tradução
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
            newErrors.email = t('error_email_required');
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t('error_email_invalid');
        }
        if (!formData.password) {
            newErrors.password = t('error_password_required');
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
                // Usando a chave para erro de credenciais (já existente no i18n)
                throw new Error(data.detail || t('error_invalid_credentials'));
            }

            loginUser(data);
            alert(t('alert_login_success'));

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
                    <h1>{t('login_welcome_back')}</h1>
                    <p>{t('login_page_subtitle')}</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form" noValidate>
                    <div className="form-group">
                        <label htmlFor="email">
                            <FaEnvelope className="input-icon" /> {t('label_email')}
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`form-input ${errors.email ? 'error' : ''}`}
                            placeholder={t('placeholder_enter_email')}
                            disabled={isLoading}
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            <FaLock className="input-icon" /> {t('label_password')}
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`form-input ${errors.password ? 'error' : ''}`}
                            placeholder={t('placeholder_enter_password')}
                            disabled={isLoading}
                        />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>

                    <div className="form-options">
                        <label className="checkbox-container">
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                            {t('label_remember_me')}
                        </label>
                        <a href="#forgot" className="forgot-password">{t('link_forgot_password')}</a>
                    </div>

                    {errors.form && <span className="error-message form-error" style={{ textAlign: 'center', marginBottom: '15px' }}>{errors.form}</span>}

                    <button 
                        type="submit" 
                        className="login-button"
                        disabled={isLoading}
                    >
                        {isLoading ? <div className="loading-spinner"></div> : t('button_login')}
                    </button>
                </form>

                <div className="login-footer">
                    <p>{t('text_no_account')}</p>
                    <div className="signup-options">
                        <Link to="/cadastroa">{t('link_signup_candidate')}</Link>
                        <span>{t('text_or')}</span>
                        <Link to="/cadastroc">{t('link_signup_employer')}</Link>
                    </div>
                </div>

                <div className="social-login">
                    <p>{t('text_or_login_with')}</p>
                    <div className="social-buttons">
                        <button className="social-button google" disabled={isLoading}><FaGoogle /> Google</button>
                        <button className="social-button facebook" disabled={isLoading}><FaFacebook /> Facebook</button>
                    </div>
                </div>
                
                <Link to="/" className="back-button">
                    <FaArrowLeft /> {t('link_back_to_home')}
                </Link>

            </div>
        </div>
    );
};

export default LoginPage;