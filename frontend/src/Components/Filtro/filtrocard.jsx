import React from "react";
import "./filtrocard.css";
import { VscCalendar } from "react-icons/vsc";
import { WiTime4 } from "react-icons/wi";
import { Link } from "react-router-dom";

function FiltroCard() {
  return (
    <div className="filtro-container">
      <section className="filtro-box-descricao">
        <h2>Filtro</h2>
        <h4></h4>
      </section>
      <section className="filtro-infos">
        <h3 className="filtro-salario">
          Salario:   
        </h3>

        <div className="filtro-icons">
          <VscCalendar className="filtro-icon" />
          <WiTime4 className="filtro-icon" />
        </div>
      </section>

      <Link to="/card" className="filtro-link">Mais Detalhes</Link>
    </div>
  );
}

export default FiltroCard;
