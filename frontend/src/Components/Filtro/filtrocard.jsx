import React from "react";
import { useI18n } from '../../i18n/useI18n.jsx';
import "./filtrocard.css";

function FiltroCard({ filtros, onFiltroChange }) {
  const { t } = useI18n();

  return (
    <div className="filtro-container">
      <h3 className="filtro-title">{t('filter_title')}</h3>

      {/* Filtrar por Categoria */}
      <div className="filtro-item">
        <label htmlFor="tags">{t('filter_by_category')}</label>
        <select 
          id="tags"
          name="tags"
          value={filtros.tags}
          onChange={onFiltroChange}
        >
          <option value="">{t('all_categories')}</option>
          <option value="tecnologia">{t('category_tech')}</option>
          <option value="design">{t('category_design')}</option>
          <option value="marketing">{t('category_marketing')}</option>
        </select>
      </div>

      {/* Filtrar por Localização */}
      <div className="filtro-item">
        <label htmlFor="local">{t('filter_by_location')}</label>
        <select 
          id="local"
          name="local"
          value={filtros.local}
          onChange={onFiltroChange}
        >
          <option value="">{t('filter_location_all')}</option>
          <option value="Belém">Belém</option>
          <option value="Manaus">Manaus</option>
          <option value="Remoto">{t('remote')}</option>
        </select>
      </div>

      {/* Filtrar por Idiomas */}
      <div className="filtro-item">
        <label htmlFor="idioma">{t('filter_by_language')}</label>
        <select 
          id="idioma"
          name="idioma"
          value={filtros.idioma}
          onChange={onFiltroChange}
        >
          <option value="">{t('all_languages')}</option>
          <option value="Português">{t('portuguese')}</option>
          <option value="Inglês">{t('english')}</option>
          <option value="Espanhol">{t('spanish')}</option>
        </select>
      </div>
      
      {/* Orçamento (Range) */}
      <div className="filtro-item">
        <label htmlFor="max_salario">{t('budget_up_to')}</label>
        <input 
          type="range"
          id="max_salario"
          name="max_salario"
          min="0" 
          max="10000" 
          step="500"
          value={filtros.max_salario}
          onChange={onFiltroChange}
        />
        <div className="filtro-range-values">
          <span>R$ 0</span>
          <span>R$ {filtros.max_salario}</span>
        </div>
      </div>
    </div>
  );
}

export default FiltroCard;
