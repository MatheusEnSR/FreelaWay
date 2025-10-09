// src/i18n/i18nContext.jsx

import React, { useState } from 'react';
// Importe o I18nContext do novo arquivo
import { I18nContext } from './useI18n.jsx'; 

// 1. Importar arquivos de tradução
import ptTranslations from './pt.json';
import enTranslations from './en.json';
import esTranslations from './es.json';
import frTranslations from './fr.json';

// Mapeamento de idiomas e suas traduções
const translations = {
  'PT-BR': ptTranslations,
  'EN': enTranslations,
  'ES': esTranslations,
  'FR': frTranslations,
};

// O componente Provider não precisa mais exportar o useI18n
export const I18nProvider = ({ children }) => {
  const [language, setLanguage] = useState('PT-BR');
  
  const t = (key) => {
    return translations[language][key] || key;
  };

  const changeLanguage = (newLang) => {
    if (translations[newLang]) {
      setLanguage(newLang);
    }
  };

  const contextValue = { language, changeLanguage, t };

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
};