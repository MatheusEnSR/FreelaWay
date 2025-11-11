import './navbar.css';
import React, { useState, useContext } from "react"; 
import Logo from '../../Assets/Logo/Logo.png';
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import { useI18n } from '../../i18n/useI18n.jsx'; 
import { VscAccount, VscClose, VscChevronDown, VscMenu } from "react-icons/vsc";
import { TfiBag, TfiIdBadge } from "react-icons/tfi";
import { SlUser } from "react-icons/sl";
import { AuthContext } from '../../context/AuthContext'; 

function NavBar() {
  const { language, t, changeLanguage } = useI18n(); 
  const { user, logoutUser } = useContext(AuthContext); 
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  // Toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  // Toggle language dropdown
  const toggleLanguageDropdown = () => setLanguageOpen(!languageOpen);

  // Select language
  const selectLanguage = (lang) => {
    changeLanguage(lang); 
    setLanguageOpen(false);
  };

  // Logout function
  const handleLogout = () => {
    logoutUser();
    closeSidebar();
    navigate('/login');
  };

  return (
    <>
      <header>
        <Link to="/"> 
          <img src={Logo} alt="Logo" className="logo" />
        </Link>

        <nav className="navbar-links">
          <Link to="/" className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>
            {t('home')}
          </Link>
          <Link to="/vagas" className={location.pathname === '/vagas' ? 'nav-link active' : 'nav-link'}>
            {t('jobs')}
          </Link>

          {user && user.user_type === 'contratante' && (
            <Link to="/empregador/dashboard" className={location.pathname.startsWith('/empregador') ? 'nav-link active' : 'nav-link'}>
              {t('employer_center')}
            </Link>
          )}
          
          {user ? (
            <Link to="/perfil" className={location.pathname === '/perfil' ? 'nav-link active' : 'nav-link'}>
              {t('profile')}
            </Link>
          ) : (
            <Link to="/login" className={location.pathname === '/login' ? 'nav-link active' : 'nav-link'}>
              {t('login')}
            </Link>
          )}

          {user && (
             <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} className="nav-link">
               {t('logout')}
             </a>
          )}
        </nav>

        {/* Language selector no header */}
        <div className="language-selector">
          <button className="language-toggle" onClick={toggleLanguageDropdown}>
            {language}
            <VscChevronDown className={languageOpen ? 'chevron rotated' : 'chevron'} />
          </button>

          {languageOpen && (
            <div className="language-dropdown">
              <button onClick={() => selectLanguage('PT-BR')}>Português</button>
              <button onClick={() => selectLanguage('EN')}>English</button>
              <button onClick={() => selectLanguage('ES')}>Español</button>
              <button onClick={() => selectLanguage('FR')}>Français</button>
            </div>
          )}
        </div>

        <button className="hamburger" onClick={toggleSidebar}><VscMenu /></button>
      </header>

      {/* Overlay */}
      {sidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "aberto" : ""}`}>
        <button className="fechar" onClick={closeSidebar}><VscClose /></button>
        <h3>{t('menu')}</h3> 

        {/* Language selector no sidebar */}
        <div className="language-selector-sidebar">
          <button className="language-toggle" onClick={toggleLanguageDropdown}>
            {language}
            <VscChevronDown className={languageOpen ? 'chevron rotated' : 'chevron'} />
          </button>
          {languageOpen && (
            <div className="language-dropdown">
              <button onClick={() => selectLanguage('PT-BR')}>Português</button>
              <button onClick={() => selectLanguage('EN')}>English</button>
              <button onClick={() => selectLanguage('ES')}>Español</button>
              <button onClick={() => selectLanguage('FR')}>Français</button>
            </div>
          )}
        </div>

        <ul>
          {user ? (
            <>
              <li onClick={closeSidebar}>
                <Link to="/perfil"><SlUser /> {t('profile')}</Link>
              </li>
              {user.user_type === 'contratante' && (
                <li onClick={closeSidebar}>
                  <Link to="/empregador/dashboard"><TfiIdBadge /> {t('employer_center')}</Link>
                </li>
              )}
              <li onClick={closeSidebar}>
                <Link to="/vagas"><TfiBag /> {t('jobs')}</Link>
              </li>
              <li onClick={(e) => { e.preventDefault(); handleLogout(); }}>
                <a href="#"><VscAccount /> {t('logout')}</a>
              </li>
            </>
          ) : (
            <>
              <li onClick={closeSidebar}>
                <Link to="/login"><VscAccount /> {t('login')}</Link>
              </li>
              <li onClick={closeSidebar}>
                <Link to="/vagas"><TfiBag /> {t('jobs')}</Link>
              </li>
            </>
          )}
        </ul> 
      </div>
    </>
  );
}

export default NavBar;
