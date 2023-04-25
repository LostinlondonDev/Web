import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import homeEN from "./locales/en/home.json";
import homeES from "./locales/es/home.json";
import loginEN from "./locales/en/login.json";
import loginES from "./locales/es/login.json";
import singUpEN from "./locales/en/signup.json";
import singUpES from "./locales/es/signup.json";



const resources = {
  en: {
    home   : homeEN,
    login  : loginEN,
    singUp : singUpEN
  },
  es: {
    home   : homeES,
    login  : loginES,
    singUp : singUpES
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
export const traslateNs = (value: string,ns: string) => i18n.t(value,{ns})
export const changeLanguage = i18n.changeLanguage;
