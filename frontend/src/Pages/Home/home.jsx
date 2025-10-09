import React, { useState, useEffect } from 'react';
import { useI18n } from "../../i18n/useI18n.jsx"; 
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

  // 2. Acessa a função de tradução
  const { t } = useI18n();

  // 3. Função para buscar os dados da API
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

  // 4. Busca inicial de todas as vagas quando a página carrega
  useEffect(() => {
    fetchVagas();
  }, []); 

  // 5. Função de busca que agora chama a API
  const handleSearch = (e) => {
    e.preventDefault();
    fetchVagas(searchTerm);
  };

  return (
    <main>
      <Navbar />
      <section className="hero-section">
        {/* Traduzindo título e subtítulo */}
        <h1>{t('jobs')}</h1> 
        <p>{t('banner_title')}</p> 
        <form className="hero-pesquisa" onSubmit={handleSearch}>
          <input
            type="text"
            // Traduzindo placeholder
            placeholder={t('home_search_placeholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit"><VscSearch size={24} /></button>
        </form>
      </section>

      <div className="home-content">
        <aside className="sidebar-left">
          {/* O componente FiltroCard precisará ser atualizado separadamente */}
          <FiltroCard />
        </aside>
        
        <section className="main-content">
          <div className="card-wrapper">
            {/* 6. Renderização dinâmica dos cards */}
            {isLoading ? (
              // Traduzindo status de carregamento
              <p>{t('loading_jobs')}</p>
            ) : vagas.length > 0 ? (
              vagas.map(vaga => (
                // O componente Card precisará ser atualizado separadamente
                <Card key={vaga.id} vaga={vaga} />
              ))
            ) : (
              // Traduzindo mensagem de não encontrado
              <p>{t('jobs_not_found')}</p>
            )}
          </div>
        </section>
      </div>
      
      <Footer />
    </main>
  );
}

export default Home;
