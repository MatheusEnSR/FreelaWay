import React, { useState, useEffect } from 'react';
import { useI18n } from '../../../i18n/useI18n.jsx'; // 1. Importar o hook

const Perfil = ({ dados, onSave }) => {
  const { t } = useI18n(); // 2. Usar o hook
  const [formData, setFormData] = useState(dados);

  useEffect(() => {
    setFormData(dados);
  }, [dados]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(dadosAntigos => ({ ...dadosAntigos, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  // 3. Traduzir todos os textos da UI
  if (!formData || Object.keys(formData).length === 0) {
    return <p>{t('loading_profile')}</p>;
  }

  return (
    <div>
      <h2>{t('employer_profile_title')}</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        
        {formData.contractor_type === 'PJ' ? (
          <>
            <div className="form-group">
              <label htmlFor="nome_empresa">{t('company_name_label')}</label>
              <input type="text" id="nome_empresa" value={formData.nome_empresa || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="cnpj">{t('cnpj_label')}</label>
              <input type="text" id="cnpj" value={formData.cnpj || ''} readOnly />
            </div>
          </>
        ) : (
          <>
            <div className="form-group">
              {/* Reutilizando chaves existentes */}
              <label htmlFor="first_name">{t('nome')}</label>
              <input type="text" id="first_name" value={formData.first_name || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="last_name">{t('sobrenome')}</label>
              <input type="text" id="last_name" value={formData.last_name || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="cpf">{t('cpf_label')}</label>
              <input type="text" id="cpf" value={formData.cpf || ''} readOnly />
            </div>
          </>
        )}

        <div className="form-group">
          <label htmlFor="email">{t('contact_email_label')}</label>
          <input type="email" id="email" value={formData.email || ''} onChange={handleChange} />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn-primary">{t('save_changes_button')}</button>
        </div>
      </form>
    </div>
  );
};

export default Perfil;