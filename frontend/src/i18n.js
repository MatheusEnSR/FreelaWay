import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import pt from "./locales/pt/translation.json";
import en from "./locales/en/translation.json";
import es from "./locales/es/translation.json";
import fr from "./locales/fr/translation.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pt: { translation: pt },
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
    },
    lng: "pt",
    fallbackLng: "pt",
    interpolation: { escapeValue: false },
  });

export default i18n;
