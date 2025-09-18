import React from 'react';

// --- DADOS DE EXEMPLO ---
// No futuro, estes dados virão da sua API.
const stats = {
  anunciosAtivos: 5,
  acessosUltimos30dias: 1274,
  pretendentesTotal: 89,
  novosPretendentes: 12,
};

// Componente reutilizável para o card de estatística
const StatCard = ({ valor, titulo }) => (
  <div className="stat-card">
    <h3>{valor}</h3>
    <p>{titulo}</p>
  </div>
);

const Inicio = () => {
  /*
    TODO: Conectar com o Backend
    useEffect(() => {
      api.get('/api/employer/dashboard/overview').then(response => {
        // Lógica para atualizar o estado com os dados da API
      });
    }, []);
  */

  return (
    <div>
      <h2>Panorama Geral</h2>
      <div className="stats-grid">
        <StatCard valor={stats.anunciosAtivos} titulo="Anúncios Ativos" />
        <StatCard valor={stats.acessosUltimos30dias} titulo="Acessos (últimos 30 dias)" />
        <StatCard valor={stats.pretendentesTotal} titulo="Total de Pretendentes" />
        <StatCard valor={stats.novosPretendentes} titulo="Novos Pretendentes Hoje" />
      </div>
      {/* Futuramente, aqui podem entrar gráficos e outras informações */}
    </div>
  );
};

export default Inicio;