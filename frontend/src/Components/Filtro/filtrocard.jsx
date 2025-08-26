import React from "react";
import "./filtrocard.css";

function FiltroCard() {
  return (
    <div className="filtro-container">
      <h3 className="filtro-title">Filtros</h3>

      <div className="filtro-item">
        <label htmlFor="cat">Filtrar por Categoria</label>
        <select id="cat">
          <option>Todas as Categorias</option>
          <option>Tecnologia</option>
          <option>Design</option>
          <option>Marketing</option>
        </select>
      </div>

      <div className="filtro-item">
        <label htmlFor="loc">Filtrar por Localização</label>
        <select id="loc">
          <option>Todas as Localizações</option>
          <option>Belém, PA</option>
          <option>Manaus, AM</option>
        </select>
      </div>

      <div className="filtro-item">
        <label htmlFor="tipo">Filtrar por Idiomas</label>
        <select id="tipo">
          <option>Todos os Tipos</option>
          <option>Português</option>
          <option>Francês</option>
          <option>Espanhol</option>
        </select>
      </div>

      <div className="filtro-item">
        <label htmlFor="tipo">Tipo de Trabalho</label>
        <select id="tipo">
          <option>Todos os Tipos</option>
          <option>Remoto</option>
          <option>Híbrido</option>
          <option>Presencial</option>
        </select>
      </div>


      <div className="filtro-item">
        <label>Orçamento (R$)</label>
        <input type="range" min="0" max="10000" defaultValue="5000" />
        <div className="filtro-range-values">
          <span>R$ 0</span>
          <span>R$ 10.000</span>
        </div>
      </div>
    </div>
  );
}

export default FiltroCard;
