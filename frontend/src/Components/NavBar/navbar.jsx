import './navbar.css';
import React, { useState, useContext } from "react"; // 1. Importar useContext
import Logo from '../../Assets/Logo/Logo.png';
import { Link, useLocation, useNavigate } from "react-router-dom"; // 2. Importar useNavigate
import { useI18n } from '../../i18n/useI18n.jsx'; 
import { VscAccount, VscClose, VscChevronDown, VscMenu } from "react-icons/vsc";
import { TfiBag, TfiIdBadge } from "react-icons/tfi";
import { SlUser } from "react-icons/sl";
import { AuthContext } from '../../context/AuthContext'; // 3. Importar o AuthContext

function NavBar() {
  const { language, t, changeLanguage } = useI18n(); 
  const { user, logoutUser } = useContext(AuthContext); // 4. Pegar o usuário e a função de logout
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  const toggleLanguageDropdown = () => setLanguageOpen(!languageOpen);

  const selectLanguage = (lang) => {
    changeLanguage(lang); 
    setLanguageOpen(false);
  };

  // 5. Nova função para lidar com o logout
  const handleLogout = () => {
    logoutUser();
    closeSidebar(); // Fecha a sidebar se estiver aberta
    navigate('/login'); // Redireciona para o login
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
          
          {/* 6. Links Condicionais */}
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
             <a href="#" onClick={handleLogout} className="nav-link">Sair</a>
          )}
          
        </nav>

        <div className="language-selector">
          {/* ... (seu seletor de idioma, que já está ótimo) ... */}
        </div>

        <button className="hamburger" onClick={toggleSidebar}><VscMenu /></button>
      </header>

      {sidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}

      <div className={`sidebar ${sidebarOpen ? "aberto" : ""}`}>
        <button className="fechar" onClick={closeSidebar}><VscClose /></button>
        <h3>{t('menu')}</h3> 
        <ul>
          {/* 7. Lógica condicional também na sidebar */}
          {user ? (
            <>
              <li onClick={closeSidebar}>
                <Link to="/perfil"><SlUser />{t('profile')}</Link>
              </li>
              {user.user_type === 'contratante' && (
                <li onClick={closeSidebar}>
                  <Link to="/empregador/dashboard"><TfiIdBadge />{t('employer_center')}</Link>
                </li>
              )}
              <li onClick={closeSidebar}>
                <Link to="/vagas"><TfiBag />{t('jobs')}</Link>
              </li>
              <li onClick={handleLogout}>
                {/* Usamos um <Link> estilizado, mas com evento onClick */}
                <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}><VscAccount /> Sair</a>
              </li>
            </>
          ) : (
            <>
              <li onClick={closeSidebar}>
                <Link to="/login"><VscAccount /> {t('login')}</Link>
              </li>
              <li onClick={closeSidebar}>
                <Link to="/vagas"><TfiBag />{t('jobs')}</Link>
              </li>
            </>
          )}
        </ul> 
      </div>
    </>
  );
}

export default NavBar;