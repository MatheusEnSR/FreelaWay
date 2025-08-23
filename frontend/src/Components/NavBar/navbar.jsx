import './navbar.css';
import React, { useState } from "react";
import Logo from '../../Assets/Logo/logo.png';
import { Link, useLocation } from "react-router-dom";

// Ícones do react
import { VscAccount } from "react-icons/vsc";
import { VscClose } from "react-icons/vsc";
import { VscChevronDown } from "react-icons/vsc";

function NavBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('PT-BR');
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleLanguageDropdown = () => {
    setLanguageOpen(!languageOpen);
  };

  const selectLanguage = (lang) => {
    setSelectedLanguage(lang);
    setLanguageOpen(false);
  };

  return (
    <>
      <header>
        <Link to="/"> 
          <img src={Logo} alt="Logo" className="logo" />
        </Link>

        {/* Links de navegação */}
        <nav className="navbar-links">
          <Link 
            to="/inicio" 
            className={location.pathname === '/inicio' ? 'nav-link active' : 'nav-link'}
          >
            Início
          </Link>
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
          >
            Vagas
          </Link>
        </nav>

        {/* Seletor de idioma */}
        <div className="language-selector">
          <button className="language-toggle" onClick={toggleLanguageDropdown}>
            {selectedLanguage}
            <VscChevronDown className={languageOpen ? 'chevron rotated' : 'chevron'} />
          </button>
          
          {languageOpen && (
            <div className="language-dropdown">
              <button onClick={() => selectLanguage('EN')}>English</button>
              <button onClick={() => selectLanguage('ES')}>Español</button>
              <button onClick={() => selectLanguage('FR')}>Français</button>
            </div>
          )}
        </div>

        <button className="hamburger" onClick={toggleSidebar}>
          &#9776;
        </button>
      </header>

      {/* Fundo semitransparente */}
      {sidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}

      {/* Barra lateral */}
      <div className={`sidebar ${sidebarOpen ? "aberto" : ""}`}>
        <button className="fechar" onClick={closeSidebar}><VscClose /></button>
        <h3>Menu</h3>
        <ul>
          <li>
            <Link to="/login"><VscAccount /> Login</Link>
          </li>
          <li>
            <Link to="/">Início</Link>
          </li>
          <li>
            <Link to="/vagas">Vagas</Link>
          </li>
        </ul> 
      </div>
    </>
  );
}

export default NavBar;