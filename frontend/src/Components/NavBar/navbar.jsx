import './navbar.css';
import React, { useState } from "react";
import Logo from '../../Assets/Logo/Logo.png';
import { Link, useLocation } from "react-router-dom";

// 1. IMPORTAR O HOOK DE INTERNACIONALIZAÇÃO
// Altere o caminho conforme a sua estrutura de pastas
import { useI18n } from '../../i18n/useI18n.jsx'; 

// Ícones do react
import { VscAccount, VscClose, VscChevronDown, VscMenu } from "react-icons/vsc";
import { TfiBag } from "react-icons/tfi";
import { TfiIdBadge } from "react-icons/tfi";
import { SlUser } from "react-icons/sl";

function NavBar() {
  // 2. USAR O HOOK PARA ACESSAR O IDIOMA ATUAL E AS FUNÇÕES
  // 'language' é o idioma ativo (ex: 'PT-BR'), 't' é a função de tradução, 'changeLanguage' é para trocar.
  const { language, t, changeLanguage } = useI18n(); 

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  // REMOVIDO: const [selectedLanguage, setSelectedLanguage] = useState('PT-BR');
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  const toggleLanguageDropdown = () => setLanguageOpen(!languageOpen);

  // REMOVIDO: As funções 'traduzirTexto' e o fetch, pois o Context faz o trabalho.

  const selectLanguage = (lang) => {
    // 3. CHAMA A FUNÇÃO GLOBAL para mudar o estado do idioma
    changeLanguage(lang); 
    setLanguageOpen(false);

    // Agora, todo o site será atualizado automaticamente
  };

  return (
    <>
      <header>
        <Link to="/"> 
          <img src={Logo} alt="Logo" className="logo" />
        </Link>

        <nav className="navbar-links">
          {/* 4. USANDO t() para traduzir os links */}
          <Link to="/" className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>
            {t('home')} {/* Assume-se que 'home' está no seu JSON */}
          </Link>
          <Link to="/vagas" className={location.pathname === '/vagas' ? 'nav-link active' : 'nav-link'}>
            {t('jobs')} {/* Assume-se que 'jobs' (vagas) está no seu JSON */}
          </Link>
        </nav>

        <div className="language-selector">
          <button className="language-toggle" onClick={toggleLanguageDropdown}>
            {/* 5. MOSTRA O IDIOMA ATUAL (do Context) */}
            {language} 
            <VscChevronDown className={languageOpen ? 'chevron rotated' : 'chevron'} />
          </button>
          
          {languageOpen && (
            <div className="language-dropdown">
              {/* 6. PASSANDO OS CÓDIGOS DE IDIOMA PARA A FUNÇÃO selectLanguage */}
              <button onClick={() => selectLanguage('PT-BR')}>Português</button>
              <button onClick={() => selectLanguage('EN')}>English</button>
              <button onClick={() => selectLanguage('ES')}>Español</button>
              <button onClick={() => selectLanguage('FR')}>Français</button>
            </div>
          )}
        </div>

        <button className="hamburger" onClick={toggleSidebar}><VscMenu /></button>
      </header>

      {sidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}

      <div className={`sidebar ${sidebarOpen ? "aberto" : ""}`}>
        <button className="fechar" onClick={closeSidebar}><VscClose /></button>
        {/* 7. TRADUZINDO O TÍTULO DO MENU */}
        <h3>{t('menu')}</h3> 
        <ul>
          <li>
            <Link to="/login"><VscAccount /> {t('login')}</Link>
          </li>
          <li>
            <Link to="/perfil"><SlUser />{t('profile')}</Link>
          </li>
          <li>
            <Link to="/vagas"><TfiBag />{t('jobs')}</Link>
          </li>
          <li>
            {/* TRADUZINDO 'Central do Contratante' */}
            <Link to="/login"><TfiIdBadge />{t('employer_center')}</Link>
          </li>
        </ul> 
      </div>
    </>
  );
}

export default NavBar;