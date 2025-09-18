import React, { useState } from 'react';
import './CentralDoEmpregador.css';

// Importando os ícones
import { FaHome, FaBullhorn, FaUsers, FaQuestionCircle, FaUserCircle } from 'react-icons/fa';

// Importando os componentes de cada aba
import Inicio from './tabs/Inicio';
import Anuncios from './tabs/Anuncios_temp';
import Candidatos from './tabs/Candidatos';
import Suporte from './tabs/Suporte';

const CentralDoEmpregador = () => {
  const [activeTab, setActiveTab] = useState('inicio');

  // Sistema de "roteamento" interno para renderizar o conteúdo da aba correta
  const renderContent = () => {
    switch (activeTab) {
      case 'inicio':
        return <Inicio />;
      case 'anuncios':
        return <Anuncios />;
      case 'candidatos':
        return <Candidatos />;
      case 'suporte':
        return <Suporte />;
      default:
        return <Inicio />;
    }
  };
  
  // Estrutura de dados para os itens da navegação da sidebar
  const navItems = [
    { id: 'inicio', label: 'Início', icon: <FaHome /> },
    { id: 'anuncios', label: 'Meus Anúncios', icon: <FaBullhorn /> },
    { id: 'candidatos', label: 'Candidatos', icon: <FaUsers /> },
    { id: 'suporte', label: 'Chamados e Ajuda', icon: <FaQuestionCircle /> }
  ];

  return (
    <div className="dashboard-layout">
      {/* Coluna da Esquerda: Sidebar Fixa */}
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

        {/* Componente de Perfil no Rodapé da Sidebar */}
        <div className="sidebar-footer">
          <a href="#perfil" className="profile-preview">
            <FaUserCircle className="profile-icon" />
            <div className="profile-info">
              <h4>Nome do Empregador</h4>
              <p>Ver seu perfil</p>
            </div>
          </a>
        </div>
      </aside>

      {/* Coluna da Direita: Conteúdo Dinâmico */}
      <main className="dashboard-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default CentralDoEmpregador;