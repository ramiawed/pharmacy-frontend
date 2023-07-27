import { useTheme } from "../../contexts/themeContext";
import { useState } from "react";
import i18next from "i18next";

function LanguageChanger() {
  const { theme } = useTheme();
  const [lang, setLang] = useState(i18next.language);

  const changeLanguageHandler = (_lang) => {
    document.documentElement.setAttribute("lang", _lang);
    i18next.changeLanguage(_lang);
    localStorage.setItem("smart-pharma-app-lang", _lang);
    setLang(_lang);
  };

  return (
    <div
      className={`flex w-20 h-10  rounded-full items-stretch justify-stretch relative ${
        theme === "light" ? "bg-white border" : "bg-neutral-700"
      }`}
    >
      <div
        onClick={() => changeLanguageHandler("ar")}
        className={`flex-1 flex items-center justify-center rounded-full ${
          theme === "dark" ? "text-white" : "text-dark"
        }`}
      >
        <label>ar</label>
      </div>
      <div
        onClick={() => changeLanguageHandler("en")}
        className={`flex-1 flex items-center justify-center rounded-full ${
          theme === "dark" ? "text-white" : "text-dark"
        } `}
      >
        <label>en</label>
      </div>
      <div
        className={`absolute w-10 h-10 rounded-full 
        transition-all flex items-center justify-center ${
          lang === "ar" ? "start-0" : "start-1/2"
        } ${
          theme === "light"
            ? "bg-green text-white"
            : "bg-color-primary-300 text-color-surface-200"
        }`}
      >
        {lang === "ar" ? <label>ar</label> : <label>en</label>}
      </div>
    </div>
  );
}

export default LanguageChanger;
