// src/Pages/CentralDoEmpregador/CentralDoEmpregador.jsx

import React, { useState, useEffect, useContext } from 'react';
import './CentralDoEmpregador.css';
import { FaHome, FaBullhorn, FaUsers, FaQuestionCircle, FaUserCircle } from 'react-icons/fa';
import { VscChevronDown } from "react-icons/vsc";
import { AuthContext } from '../../context/AuthContext';
// 1. HOOK DE INTERNACIONALIZAÇÃO JÁ ESTÁ IMPORTADO
import { useI18n } from '../../i18n/useI18n.jsx'; 
import api from '../../Services/api';

// Importação dos componentes das abas
import Inicio from './tabs/Inicio';
import Anuncios from './tabs/Anuncios';
import Candidatos from './tabs/Candidatos';
import Suporte from './tabs/Suporte';
import Perfil from './tabs/Perfil';

// Importação do modal
import ModalCriarVaga from '../../Components/ModalCriarVaga/ModalCriarVaga';

const CentralDoEmpregador = () => {
  // 2. USAR O HOOK PARA ACESSAR A FUNÇÃO DE TRADUÇÃO
  const { t } = useI18n();

  const [activeTab, setActiveTab] = useState('inicio');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { authTokens } = useContext(AuthContext);

  const [dadosEmpregador, setDadosEmpregador] = useState({});
  const [vagas, setVagas] = useState([]);
  const [isLoadingVagas, setIsLoadingVagas] = useState(true);

  useEffect(() => {
    if (authTokens) {
      // Busca dados do Perfil
      api.get('/api/users/me/', {
        headers: { Authorization: `Bearer ${authTokens.access}` }
      }).then(res => {
        const displayName = res.data.nome_empresa || `${res.data.first_name} ${res.data.last_name}`;
        setDadosEmpregador({ ...res.data, nome: displayName });
      }).catch(err => console.error("Erro ao buscar perfil:", err));

      // Busca as vagas do contratante
      fetchVagas();
    }
  }, [authTokens]);

  const fetchVagas = () => {
    setIsLoadingVagas(true);
    api.get('/api/vagas/meus-anuncios/', {
      headers: { Authorization: `Bearer ${authTokens.access}` }
    }).then(res => {
      setVagas(res.data);
    }).catch(err => console.error("Erro ao buscar vagas:", err))
      .finally(() => setIsLoadingVagas(false));
  };

  const handlePerfilSave = (novosDados) => {
    alert('Funcionalidade de salvar perfil a ser implementada.');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'inicio': return <Inicio />;
      case 'anuncios': return <Anuncios vagas={vagas} isLoading={isLoadingVagas} onPublicar={() => setIsModalOpen(true)} />;
      case 'candidatos': return <Candidatos />;
      case 'suporte': return <Suporte />;
      case 'perfil': return <Perfil dados={dadosEmpregador} onSave={handlePerfilSave} />;
      default: return <Inicio />;
    }
  };

  // 3. TRADUZIR OS RÓTULOS DOS ITENS DE NAVEGAÇÃO
  const navItems = [
    { id: 'inicio', label: t('nav_home'), icon: <FaHome /> },
    { id: 'anuncios', label: t('nav_my_ads'), icon: <FaBullhorn /> },
    { id: 'candidatos', label: t('nav_candidates'), icon: <FaUsers /> },
    { id: 'suporte', label: t('nav_support'), icon: <FaQuestionCircle /> }
  ];

  // 🔹 O componente do botão de tradução agora também usa o `t`
  const LanguageButton = () => {
    const { language, changeLanguage } = useI18n();
    const [languageOpen, setLanguageOpen] = useState(false);

    const toggleLanguageDropdown = () => setLanguageOpen(!languageOpen);

    const selectLanguage = (lang) => {
      changeLanguage(lang);
      setLanguageOpen(false);
    };

    return (
      <div id="language-selector-sidebar">
        <button className="language-toggle" onClick={toggleLanguageDropdown}>
          {language}
          <VscChevronDown className={languageOpen ? 'chevron rotated' : 'chevron'} />
        </button>

        {languageOpen && (
          <div className="language-dropdown">
            {/* 4. TRADUZIR OS NOMES DOS IDIOMAS */}
              <button onClick={() => selectLanguage('PT-BR')}>Português</button>
              <button onClick={() => selectLanguage('EN')}>English</button>
              <button onClick={() => selectLanguage('ES')}>Español</button>
              <button onClick={() => selectLanguage('FR')}>Français</button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          {/* 5. TRADUZIR O TÍTULO */}
          <h3>{t('employer_dashboard_title')}</h3>
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

        <div className="sidebar-language">
          <LanguageButton />
        </div>

        <div className="sidebar-footer">
          <button className="profile-preview-button" onClick={() => setActiveTab('perfil')}>
            <FaUserCircle className="profile-icon" />
            <div className="profile-info">
              {/* 6. TRADUZIR O TEXTO DE "CARREGANDO" E "VER PERFIL" */}
              <h4>{dadosEmpregador.nome || t('loading_text')}</h4>
              <p>{t('view_profile_link')}</p>
            </div>
          </button>
        </div>
      </aside>

      <main className="dashboard-content">
        {renderContent()}
      </main>

      {isModalOpen && (
        <ModalCriarVaga 
          onClose={() => setIsModalOpen(false)}
          onSaveSuccess={fetchVagas}
        />
      )}
    </div>
  );
};

export default CentralDoEmpregador;