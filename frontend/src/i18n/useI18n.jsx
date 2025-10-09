// src/i18n/useI18n.jsx

import { createContext, useContext } from 'react';

// O contexto ainda precisa ser criado aqui ou importado do Provider
// Como ele só é usado aqui, podemos criá-lo aqui.
// NOTA: É o nome da constante 'I18nContext' que você precisará usar no Provider
export const I18nContext = createContext(); 

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};