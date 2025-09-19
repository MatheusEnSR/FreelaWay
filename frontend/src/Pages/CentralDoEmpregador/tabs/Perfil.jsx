// Caminho: frontend/src/Pages/CentralDoEmpregador/tabs/Perfil.jsx

import React, { useState, useEffect } from 'react';

// O componente agora recebe 'dados' (a informação atual) e 'onSave' (a função para guardar)
const Perfil = ({ dados, onSave }) => {
  // O estado do formulário começa com os dados recebidos
  const [formData, setFormData] = useState(dados);

  // Garante que se os dados externos mudarem, o formulário atualiza
  useEffect(() => {
    setFormData(dados);
  }, [dados]);

  // Atualiza o estado do formulário enquanto o utilizador digita
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(dadosAntigos => ({
      ...dadosAntigos,
      [id]: value
    }));
  };

  // Quando o formulário é submetido
  const handleSubmit = (e) => {
    e.preventDefault(); // Impede que a página recarregue
    onSave(formData);   // Chama a função do componente pai com os novos dados
  };

  return (
    <div>
      <h2>Perfil da Empresa</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome da Empresa</label>
          <input 
            type="text" 
            id="nome" 
            value={formData.nome}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email de Contato</label>
          <input 
            type="email" 
            id="email" 
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cnpj">CNPJ</label>
          <input 
            type="text" 
            id="cnpj" 
            value={formData.cnpj}
            readOnly 
          />
        </div>
        <div className="form-group">
          <label htmlFor="descricao">Sobre a Empresa</label>
          <textarea 
            id="descricao" 
            rows="5"
            value={formData.descricao}
            onChange={handleChange}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-primary">Salvar Alterações</button>
        </div>
      </form>
    </div>
  );
};

export default Perfil;