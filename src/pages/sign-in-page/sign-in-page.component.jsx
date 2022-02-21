import React from "react";

import { useTranslation } from "react-i18next";

// components
import SignIn from "../../components/signin/signin.component";

// styles
import styles from "./sign-in-page.module.scss";

function SignInPage() {
  const { t } = useTranslation();
  return (
    <div className={styles.sign_container}>
      <div className={styles.right_div}></div>
      <div className={styles.right_div_2}></div>
      <div className={styles.bottom_div}></div>

      <div className={styles.main}>
        <div className={styles.sign_in_div}>
          <SignIn />
        </div>
        <div className={styles.headers}>
          <h1>{t("app-name")}</h1>
          <p className={styles.description}>{t("app-description")}</p>
        </div>

        <div className={styles.vertical_1}></div>
        <div className={styles.vertical_2}></div>
        <div className={styles.horizontal_1}></div>
        <div className={styles.horizontal_2}></div>
      </div>
    </div>
  );
}

export default SignInPage;

{
}
