import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationsEN from "./en/en.json";
import translationsAR from "./ar/ar.json";

const resources = {
  en: {
    translation: translationsEN,
  },
  ar: {
    translation: translationsAR,
  },
};

const currentLang = localStorage.getItem("smart-pharma-app-lang");

if (currentLang) {
  document.documentElement.setAttribute(
    "lang",
    currentLang ? currentLang : "ar"
  );
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  //   .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: currentLang ? currentLang : "ar", // default language
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
