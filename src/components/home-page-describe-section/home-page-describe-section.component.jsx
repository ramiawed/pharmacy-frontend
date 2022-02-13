import React from "react";
import { useTranslation } from "react-i18next";
import { Colors } from "../../utils/constants";

import styles from "./home-page-describe-section.module.scss";

function HomePageDescribeSection({ header, describe }) {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <h1>{t(header)}</h1>
      <p>{t(describe)}</p>
    </div>
  );
}

export default HomePageDescribeSection;
