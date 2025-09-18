// Caminho: frontend/src/Pages/CentralDoEmpregador/CentralDoEmpregador.jsx

import React, { useState } from 'react';
import './CentralDoEmpregador.css';

import { FaHome, FaBullhorn, FaUsers, FaQuestionCircle, FaUserCircle } from 'react-icons/fa';

import Inicio from './tabs/Inicio';
import Anuncios from './tabs/Anuncios_temp';
import Candidatos from './tabs/Candidatos';
import Suporte from './tabs/Suporte';
import Perfil from './tabs/Perfil';

const CentralDoEmpregador = () => {
  const [activeTab, setActiveTab] = useState('inicio');

  // 1. O estado agora guarda os dados do empregador
  const [dadosEmpregador, setDadosEmpregador] = useState({
    nome: "Nome do Empregador",
    email: "contato@minhaempresa.com",
    cnpj: "12.345.678/0001-99",
    descricao: "Somos uma empresa focada em inovação e desenvolvimento de soluções digitais."
  });

  // 2. Esta função será chamada pelo componente 'Perfil' para atualizar os dados
  const handlePerfilSave = (novosDados) => {
    setDadosEmpregador(dadosAntigos => ({ ...dadosAntigos, ...novosDados }));
    alert('Perfil atualizado com sucesso!');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'inicio': return <Inicio />;
      case 'anuncios': return <Anuncios />;
      case 'candidatos': return <Candidatos />;
      case 'suporte': return <Suporte />;
      // 3. Passamos os dados e a função de guardar para o componente 'Perfil'
      case 'perfil': return <Perfil dados={dadosEmpregador} onSave={handlePerfilSave} />;
      default: return <Inicio />;
    }
  };
  
  const navItems = [
    { id: 'inicio', label: 'Início', icon: <FaHome /> },
    { id: 'anuncios', label: 'Meus Anúncios', icon: <FaBullhorn /> },
    { id: 'candidatos', label: 'Candidatos', icon: <FaUsers /> },
    { id: 'suporte', label: 'Chamados e Ajuda', icon: <FaQuestionCircle /> }
  ];

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h3>Central do Empregador</h3>
        </div>

        <ul className="sidebar-nav">
          {navItems.map(item => (
            <li key={item.id} className={activeTab === item.id ? 'active' : ''}>
              <button onClick={() => setActiveTab(item.id)}>
                {item.icon}
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
        
        <div className="sidebar-footer">
          <button className="profile-preview-button" onClick={() => setActiveTab('perfil')}>
            <FaUserCircle className="profile-icon" />
            <div className="profile-info">
              {/* 4. O nome aqui agora vem do estado, sendo dinâmico */}
              <h4>{dadosEmpregador.nome}</h4>
              <p>Ver seu perfil</p>
            </div>
          </button>
        </div>
      </aside>

      <main className="dashboard-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default CentralDoEmpregador;