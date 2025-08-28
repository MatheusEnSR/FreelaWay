import './navbar.css';
import React, { useState } from "react";
import Logo from '../../Assets/Logo/Logo.png';
import { Link, useLocation } from "react-router-dom";

// Ícones do react
import { VscAccount, VscClose, VscChevronDown, VscMenu } from "react-icons/vsc";

function NavBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('PT-BR');
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  const toggleLanguageDropdown = () => setLanguageOpen(!languageOpen);

  // Função para traduzir texto usando LibreTranslate
  const traduzirTexto = async (texto, idiomaDestino) => {
    try {
      const res = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: texto,
          source: 'pt',  // idioma original
          target: idiomaDestino,
          format: 'text'
        })
      });
      const data = await res.json();
      return data.translatedText;
    } catch (err) {
      console.error("Erro ao traduzir:", err);
      return texto;
    }
  };

  const selectLanguage = async (lang) => {
    setSelectedLanguage(lang);
    setLanguageOpen(false);

    // Aqui você pode traduzir textos principais do site
    // Exemplo: traduzindo "Início" para o idioma selecionado
    const textoTraduzido = await traduzirTexto("Início", lang.toLowerCase());
    console.log("Texto tradu极zido:", textoTraduzido);

    // Depois você pode guardar isso em Context ou State global
  };

  return (
    <>
      <header>
        <Link to="/"> 
          <img src={Logo} alt="Logo" className="logo" />
        </Link>

        <nav className="navbar-links">
          <Link to="/" className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>
            Início
          </Link>
          <Link to="/vagas" className={location.pathname === '/vagas' ? 'nav-link active' : 'nav-link'}>
            Vagas
          </Link>
        </nav>

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

        <button className="hamburger" onClick={toggleSidebar}><VscMenu /></button>
      </header>

      {sidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}

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
