import React from "react";
import "./filtrocard.css";

// --- ALTERAÇÃO 1: O componente agora aceita 'props' ---
// Desestruturamos para pegar 'filtros' e 'onFiltroChange' diretamente.
function FiltroCard({ filtros, onFiltroChange }) {

  return (
    <div className="filtro-container">
      <h3 className="filtro-title">Filtros</h3>

      {/* --- ALTERAÇÃO 2: Cada campo agora é "controlado" pelo componente pai --- */}

      {/* Filtrar por Categoria */}
      <div className="filtro-item">
        <label htmlFor="tags">Filtrar por Categoria</label>
        <select 
          id="tags"
          name="tags" // O 'name' deve ser igual à chave no estado 'filtros'
          value={filtros.tags} // O valor exibido vem do estado 'filtros'
          onChange={onFiltroChange} // Ao mudar, chama a função do componente pai
        >
          <option value="">Todas as Categorias</option>
          <option value="tecnologia">Tecnologia</option>
          <option value="design">Design</option>
          <option value="marketing">Marketing</option>
        </select>
      </div>

      {/* Filtrar por Localização */}
      <div className="filtro-item">
        <label htmlFor="local">Filtrar por Localização</label>
        <select 
          id="local"
          name="local"
          value={filtros.local}
          onChange={onFiltroChange}
        >
          <option value="">Todas as Localizações</option>
          <option value="Belém">Belém</option>
          <option value="Manaus">Manaus</option>
          <option value="Remoto">Remoto</option>
        </select>
      </div>

      {/* Filtrar por Idiomas */}
      <div className="filtro-item">
        <label htmlFor="idioma">Filtrar por Idiomas</label>
        <select 
          id="idioma"
          name="idioma"
          value={filtros.idioma}
          onChange={onFiltroChange}
        >
          <option value="">Todos os Idiomas</option>
          <option value="Português">Português</option>
          <option value="Inglês">Inglês</option>
          <option value="Espanhol">Espanhol</option>
        </select>
      </div>
      
      {/* Orçamento (Range) */}
      <div className="filtro-item">
        <label htmlFor="max_salario">Orçamento (até R$)</label>
        <input 
          type="range"
          id="max_salario"
          name="max_salario"
          min="0" 
          max="10000" 
          step="500"
          value={filtros.max_salario} // O valor do slider vem do estado
          onChange={onFiltroChange} // Ao mudar, avisa o pai
        />
        <div className="filtro-range-values">
          <span>R$ 0</span>
          {/* O valor máximo agora é dinâmico */}
          <span>R$ {filtros.max_salario}</span>
        </div>
      </div>
    </div>
  );
}

export default FiltroCard;