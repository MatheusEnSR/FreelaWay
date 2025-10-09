import React, { useState, useEffect } from 'react';
import './inicio.css';
import Navbar from "../../Components/NavBar/navbar.jsx";
import Footer from "../../Components/Footer/footer.jsx";
import { VscSearch } from "react-icons/vsc";
import { Link } from "react-router-dom";

// 1. IMPORTAR O HOOK DE INTERNACIONALIZAÇÃO
import { useI18n } from '../../i18n/useI18n.jsx'; 

const Inicio = () => {
  // 2. USAR O HOOK PARA ACESSAR A FUNÇÃO DE TRADUÇÃO
  const { t } = useI18n();
  
  const [vagas, setVagas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // 1. Buscar vagas recomendadas ao carregar a página
  useEffect(() => {
    const fetchRecomendadas = async () => {
      setIsLoading(true);
      try {
        // Usando nosso novo endpoint de recomendadas via proxy
        const response = await fetch('/api/vagas/recomendadas/');
        const data = await response.json();
        setVagas(data);
      } catch (error) {
        console.error('Erro ao buscar vagas recomendadas:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecomendadas();
  }, []); // O array vazio [] garante que isso rode apenas uma vez

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // 2. Usando o endpoint de busca via proxy
      const response = await fetch(`/api/vagas/?search=${searchTerm}`);
      const data = await response.json();
      setVagas(data);
    } catch (error) {
      console.error('Erro ao buscar vagas:', error);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div>
      {/* O Navbar já usa o i18n, mas deve ser importado aqui */}
      <Navbar /> 
      <main>
        <div className="banner">
          <div className="banner-overlay">
            {/* 3. TRADUÇÃO DO TÍTULO DO BANNER */}
            <h1 className="banner-title">{t('banner_title')}</h1>
            
            <form className="banner-search" onSubmit={handleSearch}>
              <input
                type="text"
                // 4. TRADUÇÃO DO PLACEHOLDER
                placeholder={t('search_placeholder')} 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit"><VscSearch size={24} /></button>
            </form>
          </div>
        </div>

        {/* 5. TRADUÇÃO DO TÍTULO DAS VAGAS */}
        <h2 className="vagas-title"> {t('recommended_jobs_title')}</h2>
        
        <div className="vagas-container">
          {isLoading ? (
            // 6. TRADUÇÃO DO LOADING
            <p>{t('loading_jobs')}</p>
          ) : (
            vagas.map(vaga => (
              <div key={vaga.id} className="vaga-card">
               <div className="card-content">
                  <h3>{vaga.titulo}</h3>
                  {/* 7. TRADUÇÃO DE RÓTULOS (Local, Salário) */}
                  <p><strong>{t('job_location_label')}:</strong> {vaga.local}</p>
                  <p><strong>{t('job_salary_label')}:</strong> {vaga.salario}</p>
                </div> {/* Fim da div */}

                  <div className="tags-container">
                    {vaga.tags_display && vaga.tags_display.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>

                <Link to={`/vaga/${vaga.id}`} className="btn-candidatar">
                    {/* 8. TRADUÇÃO DO BOTÃO */}
                    {t('more_details_button')}
                  </Link>
                
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Inicio;
