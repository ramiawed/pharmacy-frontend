import React from "react";
import { useTranslation } from "react-i18next";
import ReactLoading from "react-loading";

// constants
import { Colors } from "../../utils/constants";

// styles
import styles from "./loader.module.scss";

function Loader({ color }) {
  const { t } = useTranslation();

  return (
    <div
      className={styles.loader}
      style={{ color: color ? color : Colors.LIGHT_COLOR }}
    >
      <ReactLoading
        type="bars"
        height={75}
        width={75}
        color={color ? color : Colors.LIGHT_COLOR}
      />
      <p>{t("loading-data")}</p>
    </div>
  );
}

export default Loader;
