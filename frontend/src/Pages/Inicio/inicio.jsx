import React, { useState, useEffect } from 'react';
import './inicio.css';
import { VscSearch } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useI18n } from '../../i18n/useI18n.jsx'; 

const Inicio = () => {
  const { t } = useI18n();
  const [vagas, setVagas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecomendadas = async () => {
      setIsLoading(true);
      try {
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
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`/api/vagas/?search=${searchTerm}`);
      const data = await response.json();
      setVagas(data);
    } catch (error) {
      console.error('Erro ao buscar vagas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // O 'return' agora não inclui mais a div principal, Navbar ou Footer
  return (
    <main>
      <div className="banner">
        <div className="banner-overlay">
          <h1 className="banner-title">{t('banner_title')}</h1>
          
          <form className="banner-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder={t('search_placeholder')} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit"><VscSearch size={24} /></button>
          </form>
        </div>
      </div>

      <h2 className="vagas-title"> {t('recommended_jobs_title')}</h2>
      
      <div className="vagas-container">
        {isLoading ? (
          <p>{t('loading_jobs')}</p>
        ) : (
          vagas.map(vaga => (
            <div key={vaga.id} className="vaga-card">
              <div className="card-content">
                <h3>{vaga.titulo}</h3>
                <p><strong>{t('job_location_label')}:</strong> {vaga.local}</p>
                <p><strong>{t('job_salary_label')}:</strong> {vaga.salario}</p>
              </div>

              <div className="tags-container">
                {vaga.tags_display && vaga.tags_display.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>

              <Link to={`/card/${vaga.id}`} className="btn-candidatar">
                {t('more_details_button')}
              </Link>
            </div>
          ))
        )}
      </div>
    </main>
  );
}

export default Inicio;