import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useI18n } from '../../i18n/useI18n.jsx';
import './cardpage.css';

const CardPage = () => {
  const { t } = useI18n();
  const { id } = useParams();
  const [vaga, setVaga] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVagaDetalhes = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/vagas/${id}/`);
        if (!response.ok) {
          throw new Error(t('job_not_found'));
        }
        const data = await response.json();
        setVaga(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVagaDetalhes();
  }, [id, t]);

  if (isLoading) {
    return <div className="cardpage-container"><p>{t('loading_job_details')}</p></div>;
  }

  if (error) {
    return <div className="cardpage-container"><p>{t('error')}: {error}</p></div>;
  }

  if (!vaga) {
    return <div className="cardpage-container"><p>{t('job_not_found')}</p></div>;
  }

  return (
    <main className="cardpage-container">
      {/* Card lateral - Criador da vaga */}
      <aside className="client-info">
        <div className="client-card">
          <div className="client-avatar"></div>
          <div className="client-details">
            <h3>{vaga.nome_contratante || t('job_creator')}</h3>
            <p><strong>{t('location')}:</strong> {vaga.local}</p>
            <p><strong>{t('language')}:</strong> {vaga.idioma}</p>
            <p><strong>{t('salary')}:</strong> {vaga.salario}</p>
          </div>
        </div>
        <Link to="/vagas" className="btn-voltar">← {t('back_to_jobs')}</Link>
      </aside>

      {/* Card central - Detalhes da vaga */}
      <section className="project-detail">
        <header className="project-header">
          <h1>{vaga.titulo}</h1>
        </header>

        <div className="project-description">
          <p>{vaga.descricao_detalhada || vaga.descricao_breve}</p>
        </div>

        <div className="tags-container">
          {vaga.tags && vaga.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>

        <button className="btn-candidatar">{t('apply')}</button>
      </section>
    </main>
  );
}

export default CardPage;
