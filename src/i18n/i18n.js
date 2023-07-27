import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationsEN from "./en/english.json";
import translationsAR from "./ar/arabic.json";

const resources = {
  en: {
    translation: translationsEN,
  },
  ar: {
    translation: translationsAR,
  },
};

const langFromLocalStorage = localStorage.getItem("smart-pharma-app-lang");
const currentLang = langFromLocalStorage ? langFromLocalStorage : "ar";
if (!langFromLocalStorage) localStorage.setItem("smart-pharma-app-lang", "ar");

document.documentElement.setAttribute("lang", currentLang);

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  //   .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: currentLang, // default language
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
