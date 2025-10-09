import React from "react";
import "./filtrocard.css";
// Importar o hook de internacionalização
import { useI18n } from "../../i18n/useI18n.jsx"; 

function FiltroCard() {
  // Acessar a função de tradução
  const { t } = useI18n();

  return (
    <div className="filtro-container">
      {/* Título */}
      <h3 className="filtro-title">{t('filter_title')}</h3>

      {/* Filtrar por Categoria */}
      <div className="filtro-item">
        <label htmlFor="cat">{t('filter_category_label')}</label>
        <select id="cat">
          <option>{t('filter_category_all')}</option>
          <option>{t('category_tech')}</option>
          <option>{t('category_design')}</option>
          <option>{t('category_marketing')}</option>
        </select>
      </div>

      {/* Filtrar por Localização */}
      <div className="filtro-item">
        <label htmlFor="loc">{t('filter_location_label')}</label>
        <select id="loc">
          <option>{t('filter_location_all')}</option>
          {/* As opções de localização ('Belém, PA', 'Manaus, AM') são dados. 
              Geralmente, localizações específicas não são traduzidas, mas mantidas como estão. */}
          <option>Belém, PA</option>
          <option>Manaus, AM</option>
        </select>
      </div>

      {/* Filtrar por Idiomas (Tipo 1) - Presumi que era a mesma lista de tipos de trabalho */}
      <div className="filtro-item">
        <label htmlFor="lang">{t('filter_language_label')}</label>
        <select id="lang">
          <option>{t('filter_type_all')}</option>
          {/* Idiomas */}
          <option>{t('language_portuguese')}</option>
          <option>{t('language_french')}</option>
          <option>{t('language_spanish')}</option>
        </select>
      </div>

      {/* Tipo de Trabalho (Tipo 2) */}
      <div className="filtro-item">
        <label htmlFor="tipo">{t('filter_work_type_label')}</label>
        <select id="tipo">
          <option>{t('filter_type_all')}</option>
          {/* Tipos */}
          <option>{t('work_type_remote')}</option>
          <option>{t('work_type_hybrid')}</option>
          <option>{t('work_type_onsite')}</option>
        </select>
      </div>


      {/* Orçamento (Range) */}
      <div className="filtro-item">
        <label>{t('filter_budget_label')}</label>
        <input type="range" min="0" max="10000" defaultValue="5000" />
        <div className="filtro-range-values">
          {/* Unidades monetárias são mantidas, mas o texto ao redor pode ser traduzido, 
              ou as moedas podem ser dinâmicas se o sistema i18n for mais complexo. 
              Aqui, mantemos 'R$' como texto fixo, mas se fosse uma chave (ex: t('currency_symbol')) 
              seria melhor. */}
          <span>R$ 0</span>
          <span>R$ 10.000</span>
        </div>
      </div>
    </div>
  );
}

export default FiltroCard;
