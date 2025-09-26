import React from "react";
import { Link } from "react-router-dom";
import "./card.css";

// --- FUNÇÃO AUXILIAR PARA CALCULAR O TEMPO DECORRIDO ---
// Transforma uma data como "2025-09-26T10:00:00Z" em "Há 2 dias"
const timeAgo = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.round((now - date) / 1000);
  
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  const months = Math.round(days / 30);
  const years = Math.round(days / 365);

  if (seconds < 60) return `agora mesmo`;
  if (minutes < 60) return `há ${minutes} min`;
  if (hours < 24) return `há ${hours}h`;
  if (days === 1) return `há 1 dia`;
  if (days < 30) return `há ${days} dias`;
  if (months < 12) return `há ${months} meses`;
  return `há ${years} anos`;
};


// O componente agora recebe a prop 'vaga' do Home.jsx
const Card = ({ vaga }) => {
  // Se, por algum motivo, a vaga não for passada, não renderiza nada para evitar erros
  if (!vaga) {
    return null;
  }
  
  return (
    <div className="project-card">
      <div className="card-header">
        {/* Usa o título da vaga */}
        <h3>{vaga.titulo}</h3>
        {/* Usa o salário da vaga */}
        <span className="budget">{vaga.salario || 'A combinar'}</span>
      </div>
      {/* Usa a descrição breve da vaga */}
      <p className="card-description">
        {vaga.descricao_breve}
      </p>
      <div className="card-details">
        {/* Usa a localização da vaga */}
        <span className="location">{vaga.local}</span>
        {/* Mapeia e exibe todas as tags da vaga */}
        {vaga.tags_display && vaga.tags_display.map(tag => (
          <span key={tag} className="category">{tag}</span>
        ))}
      </div>
      <div className="card-footer">
        {/* Usa a função timeAgo para formatar a data de criação */}
        <span className="time-ago">{timeAgo(vaga.data_criacao)}</span>
        {/* Cria um link dinâmico para a página de detalhes da vaga */}
        <Link to={`/vaga/${vaga.id}`} className="btn-card">
          Mais detalhes
        </Link>
      </div>
    </div>
  );
}

export default Card;