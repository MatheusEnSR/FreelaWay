// home.jsx
import React, { useState } from "react";
import Navbar from "../../Components/NavBar/navbar.jsx"; 
import Footer from "../../Components/Footer/footer.jsx"; 
import Card from "../../Components/Card/card.jsx"; 
import FiltroCard from "../../Components/Filtro/filtrocard.jsx";
import { VscSearch } from "react-icons/vsc";
import './home.css'

function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Buscando:", searchTerm); // aqui você pode integrar com API ou filtro
  };
  return (
    <main>
      <Navbar />
        <section className="hero-section">
        <h1>Vagas</h1>
        <p>
          Conectando profissionais e oportunidades que impulsionam um futuro
          mais verde e consciente.
        </p>
        
        {/* Barra de pesquisa adicionada na hero section */}
        <form className="hero-pesquisa" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Buscar projetos, habilidades ou palavras-chave..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit"><VscSearch size={24} /></button>
        </form>
      
      </section>
      <div className="home-content">
        <aside className="sidebar-left">
          <FiltroCard />
        </aside>
        
        <section className="main-content">
          <div className="card-wrapper">
            <Card />
             <Card />
          </div>
        </section>
      </div>
      
      <Footer />
    </main>
  );
}

export default Home;
