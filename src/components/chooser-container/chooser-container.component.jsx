import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./chooser-container.module.scss";

const ChooserContainer = ({ selectedValue, onclick, label, error }) => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className={[styles.container, error ? styles.error : ""].join(" ")}
        onClick={onclick}
      >
        {label && <label className={styles.label}>{t(label)}</label>}
        <label
          className={[
            styles.value,
            !selectedValue ? styles.placeholder : "",
          ].join(" ")}
        >
          {selectedValue ? t(selectedValue) : t("mandatory-placeholder")}
        </label>
      </div>
      {error && <label className={styles.error_label}>{t(error)}</label>}
    </div>
  );
};

export default ChooserContainer;
