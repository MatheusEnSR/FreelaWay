import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import api from '../../../Services/api';
import { useI18n } from '../../../i18n/useI18n.jsx'; // 1. Importar o hook

// Componente reutilizável para o card de estatística
const StatCard = ({ valor, titulo }) => (
  <div className="stat-card">
    <h3>{valor}</h3>
    <p>{titulo}</p>
  </div>
);

const Inicio = () => {
  const { t } = useI18n(); // 2. Usar o hook
  const [stats, setStats] = useState({
    anunciosAtivos: 0,
    acessosUltimos30dias: 0,
    pretendentesTotal: 0,
    novosPretendentes: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const { authTokens } = useContext(AuthContext);

  useEffect(() => {
    if (authTokens) {
      setIsLoading(true);
      api.get('/api/vagas/overview/', {
        headers: { Authorization: `Bearer ${authTokens.access}` }
      })
      .then(response => {
        setStats(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar panorama geral:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    }
  }, [authTokens]);

  return (
    <div>
      {/* 3. Traduzir todos os textos */}
      <h2>{t('overview_title')}</h2>
      {isLoading ? (
        <p>{t('loading_stats')}</p>
      ) : (
        <div className="stats-grid">
          <StatCard valor={stats.anunciosAtivos} titulo={t('active_ads_stat')} />
          <StatCard valor={stats.acessosUltimos30dias} titulo={t('views_last_30_days_stat')} />
          <StatCard valor={stats.pretendentesTotal} titulo={t('total_applicants_stat')} />
          <StatCard valor={stats.novosPretendentes} titulo={t('new_applicants_today_stat')} />
        </div>
      )}
    </div>
  );
};

export default Inicio;