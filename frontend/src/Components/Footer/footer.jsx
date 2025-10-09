import React from "react";
import './footer.css'
// 1. Importar o hook de internacionalização
import { useI18n } from "../../i18n/useI18n.jsx"; 

function Footer() {
  // 2. Usar o hook para acessar a função de tradução
  const { t } = useI18n();

  return (
    <footer>
      {/* 3. Usar a chave de tradução */}
      <h4>{t('footer_copyright')}</h4> 
    </footer>
  );
}

export default Footer;
