// frontend/src/Pages/CentralDoEmpregador/tabs/Inicio.jsx

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext'; // Verifique o caminho
import api from '../../../Services/api'; // Verifique o caminho

// Componente reutilizável para o card de estatística
const StatCard = ({ valor, titulo }) => (
  <div className="stat-card">
    <h3>{valor}</h3>
    <p>{titulo}</p>
  </div>
);

const Inicio = () => {
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
      api.get('/api/vagas/overview/', { // Chamando nosso novo endpoint
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
      <h2>Panorama Geral</h2>
      {isLoading ? (
        <p>Carregando estatísticas...</p>
      ) : (
        <div className="stats-grid">
          <StatCard valor={stats.anunciosAtivos} titulo="Anúncios Ativos" />
          <StatCard valor={stats.acessosUltimos30dias} titulo="Acessos (últimos 30 dias)" />
          <StatCard valor={stats.pretendentesTotal} titulo="Total de Pretendentes" />
          <StatCard valor={stats.novosPretendentes} titulo="Novos Pretendentes Hoje" />
        </div>
      )}
      {/* Futuramente, aqui podem entrar gráficos e outras informações */}
    </div>
  );
};

export default Inicio;