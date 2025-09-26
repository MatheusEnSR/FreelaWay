// frontend/src/Pages/CentralDoEmpregador/tabs/Perfil.jsx


import React, { useState, useEffect } from 'react';

const Perfil = ({ dados, onSave }) => {
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

  // Garante que o formulário não tente renderizar antes dos dados chegarem
  if (!formData || Object.keys(formData).length === 0) {
    return <p>Carregando perfil...</p>;
  }

  return (
    <div>
      <h2>Perfil do Contratante</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        
        {/* Renderização condicional baseada no tipo de contratante */}
        {formData.contractor_type === 'PJ' ? (
          <>
            <div className="form-group">
              <label htmlFor="nome_empresa">Nome da Empresa</label>
              <input type="text" id="nome_empresa" value={formData.nome_empresa || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="cnpj">CNPJ</label>
              <input type="text" id="cnpj" value={formData.cnpj || ''} readOnly />
            </div>
          </>
        ) : (
          <>
            <div className="form-group">
              <label htmlFor="first_name">Nome</label>
              <input type="text" id="first_name" value={formData.first_name || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="last_name">Sobrenome</label>
              <input type="text" id="last_name" value={formData.last_name || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="cpf">CPF</label>
              <input type="text" id="cpf" value={formData.cpf || ''} readOnly />
            </div>
          </>
        )}

        <div className="form-group">
          <label htmlFor="email">Email de Contato</label>
          <input type="email" id="email" value={formData.email || ''} onChange={handleChange} />
        </div>
        
        {/* Futuramente você pode adicionar um campo de descrição no modelo de perfil */}
        {/* <div className="form-group">
          <label htmlFor="descricao">Sobre</label>
          <textarea id="descricao" rows="5" value={formData.descricao || ''} onChange={handleChange} />
        </div> */}

        <div className="form-actions">
          <button type="submit" className="btn-primary">Salvar Alterações</button>
        </div>
      </form>
    </div>
  );
};

export default Perfil;