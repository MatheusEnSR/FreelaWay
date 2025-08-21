import './navbar.css';
import React, { useState } from "react";
import Logo from '../../Assets/Logo/logo.png';
import { Link } from "react-router-dom";

//Aqui são os imports dos icons do react
import { VscSearch } from "react-icons/vsc";
import { VscAccount } from "react-icons/vsc";
import { VscClose } from "react-icons/vsc";

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
          <button type="submit"><VscSearch size={24} /></button>
        </form>


         <Link to="/"> <img src={Logo} alt="Logo" className="logo" /></Link>

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
          <Link to="/login"><VscAccount /></Link>
        </li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul> 

      </div>
    </>
  );
}

export default NavBar;
