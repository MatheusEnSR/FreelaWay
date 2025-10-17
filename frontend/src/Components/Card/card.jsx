import React from "react";
import { Link } from "react-router-dom";
import "./card.css";

// --- FUNÇÃO AUXILIAR PARA CALCULAR O TEMPO DECORRIDO ---
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

const Card = ({ vaga }) => {
  if (!vaga) {
    return null;
  }
  
  return (
    <div className="project-card">
      <div className="card-header">
        <h3>{vaga.titulo}</h3>
        <span className="budget">{vaga.salario || 'A combinar'}</span>
      </div>
      <p className="card-description">
        {vaga.descricao_breve}
      </p>
      <div className="card-details">
        <span className="location">{vaga.local}</span>
        {vaga.tags && vaga.tags.map(tag => (
          <span key={tag} className="category">{tag}</span>
        ))}
      </div>
      <div className="card-footer">
        <span className="time-ago">{timeAgo(vaga.data_criacao)}</span>
        
        {/* ========================================================== */}
        {/* ALTERAÇÃO FEITA AQUI: Corrigimos o link para /card/id    */}
        {/* ========================================================== */}
        <Link to={`/card/${vaga.id}`} className="btn-card">
          Mais detalhes
        </Link>
      </div>
    </div>
  );
}

export default Card;