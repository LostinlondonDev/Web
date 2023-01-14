import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import LanguageDetector from "i18next-browser-languagedetector";
import homeEN from "./locales/en/home.json";
import homeES from "./locales/es/home.json";

const resources = {
  en: {
    home: homeEN,
  },
  es: {
    home: homeES,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    defaultNS: "home",
    lng: "en",
    ns: ["home"],
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: resources,
  });

export const traslate = i18n.t;
export const changeLanguage = i18n.changeLanguage;
