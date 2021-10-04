import React from "react";
import { useTranslation } from "react-i18next";
import ReactLoading from "react-loading";
import { Colors } from "../../utils/constants";
import styles from "./loader.module.scss";

function Loader({ color }) {
  const { t } = useTranslation();

  return (
    <div className={styles.loader}>
      <ReactLoading
        color={color ? color : Colors.SECONDARY_COLOR}
        type="bars"
        height={75}
        width={75}
      />
      <p>{t("loading-data")}</p>
    </div>
  );
}

export default Loader;
