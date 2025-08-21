import React from "react";
import "./card.css";
import { VscCalendar } from "react-icons/vsc";
import { WiTime4 } from "react-icons/wi";
import { Link } from "react-router-dom";

function Card() {
  return (
    <div className="card-container">
      <section className="box-descricao">
        <h2>Breve descrição</h2>
        <h4>erwrwr</h4>
      </section>
      <section className="infos">
        <h3 className="salario">
          Salario: 
        </h3>

         
          <VscCalendar />
        
        
         
          <WiTime4 />

      </section>

      <Link to="/card" className="card">Mais Detalhes</Link>
    </div>
  );
}

export default Card;
