import React, { useState } from "react";
import './navbar.css';
import Logo from '../../Assets/Logo/logo.png';
import { Link } from "react-router-dom";

function NavBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Buscando:", searchTerm); // aqui você pode integrar com API ou filtro
  };

  return (
    <>
      <header>
       

        {/* Barra de busca */}
        <form className="barra-pesquisa" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit"></button>
        </form>

         <img src={Logo} alt="Logo" className="logo" />

        <button className="hamburger" onClick={toggleSidebar}>
          &#9776;
        </button>
      </header>

      {/* Fundo semitransparente */}
      {sidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}


      {/* Barra lateral */}
      <div className={`sidebar ${sidebarOpen ? "aberto" : ""}`}>
        <button className="fechar" onClick={closeSidebar}>×</button>
        <h3>Menu</h3>
        <ul>
        <li>
          <Link to="/login">Item 1</Link>
        </li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul> 

      </div>
    </>
  );
}

export default NavBar;
