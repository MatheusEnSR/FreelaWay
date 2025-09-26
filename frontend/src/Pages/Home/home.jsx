import React, { useState, useEffect } from 'react';
import Navbar from "../../Components/NavBar/navbar.jsx"; 
import Footer from "../../Components/Footer/footer.jsx"; 
import Card from "../../Components/Card/card.jsx"; 
import FiltroCard from "../../Components/Filtro/filtrocard.jsx";
import { VscSearch } from "react-icons/vsc";
import './home.css';

function Home() {
  // 1. Estados para guardar as vagas, o termo de busca e o status de carregamento
  const [vagas, setVagas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // 2. Função para buscar os dados da API
  const fetchVagas = async (term = '') => {
    setIsLoading(true);
    let url = '/api/vagas/';
    if (term) {
      url += `?search=${term}`;
    }
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      setVagas(data);
    } catch (error) {
      console.error('Erro ao buscar vagas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Busca inicial de todas as vagas quando a página carrega
  useEffect(() => {
    fetchVagas();
  }, []); // O array vazio [] garante que rode apenas uma vez

  // 4. Função de busca que agora chama a API
  const handleSearch = (e) => {
    e.preventDefault();
    fetchVagas(searchTerm);
  };

  return (
    <main>
      <Navbar />
      <section className="hero-section">
        <h1>Vagas</h1>
        <p>Conectando profissionais comprometidos com o futuro.</p>
        <form className="hero-pesquisa" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Buscar por cargo, habilidade ou local..."
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
            {/* 5. Renderização dinâmica dos cards */}
            {isLoading ? (
              <p>Carregando vagas...</p>
            ) : vagas.length > 0 ? (
              vagas.map(vaga => (
                <Card key={vaga.id} vaga={vaga} />
              ))
            ) : (
              <p>Nenhuma vaga encontrada para sua busca.</p>
            )}
          </div>
        </section>
      </div>
      
      <Footer />
    </main>
  );
}

export default Home;