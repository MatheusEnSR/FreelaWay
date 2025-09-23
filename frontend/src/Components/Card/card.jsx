import React from "react";
import { Link } from "react-router-dom";
import "./card.css";

function Card() {
  return (
    <div className="project-card">
      <div className="card-header">
        <h3>Desenvolvimento de Site Institucional</h3>
        <span className="budget">R$ 2.500 - R$ 3.000</span>
      </div>
      <p className="card-description">
        Preciso de um site responsivo para minha empresa com aproximadamente 5 páginas...
      </p>
      <div className="card-details">
        <span className="category">Tecnologia</span>
        <span className="location">Remoto</span>
      </div>
      <div className="card-footer">
        <span className="time-ago">Há 2 dias</span>
        <button className="btn-card"><Link to="/card">Mais detalhes</Link></button>
      </div>
    </div>
  );
}

export default Card;