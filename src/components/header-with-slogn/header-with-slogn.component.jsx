import i18next from "i18next";
import React, { useState } from "react";

import styles from "./header-with-slogn.module.scss";

const HeaderWithSlogn = ({ bgColor }) => {
  const [lang, setLang] = useState(i18next.language);

  const changeToEnHandler = () => {
    document.documentElement.setAttribute("lang", "en");
    i18next.changeLanguage("en");
    localStorage.setItem("smart-pharma-app-lang", "en");
    setLang("en");
  };

  const changeToArHandler = () => {
    document.documentElement.setAttribute("lang", "ar");
    i18next.changeLanguage("ar");
    localStorage.setItem("smart-pharma-app-lang", "ar");
    setLang("ar");
  };

  return (
    <div style={{ backgroundColor: bgColor }} className={styles.container}>
      <h2>Smart Pharma</h2>
      <div className={styles.lang_div}>
        <button
          className={[
            styles.en_btn,
            lang === "en" ? "bg_main fc_white" : "bg_light_grey fc_dark",
          ].join(" ")}
          onClick={changeToEnHandler}
        >
          en
        </button>
        <button
          className={[
            styles.ar_btn,
            lang === "ar" ? "bg_main fc_white" : "bg_light_grey fc_dark",
          ].join(" ")}
          onClick={changeToArHandler}
        >
          ar
        </button>
      </div>
    </div>
  );
};

export default HeaderWithSlogn;
