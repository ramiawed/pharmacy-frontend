import React from "react";

import { useTranslation } from "react-i18next";

// import background from "../../background.jpeg";

import background001 from "../../background001.jpeg";

// components
import SignIn from "../../components/signin/signin.component";

// styles
import styles from "./sign-in-page.module.scss";

function SignInPage() {
  const { t } = useTranslation();
  return (
    <div className={styles.sign_container}>
      <div className={styles.headers}>
        {/* <div className={styles.right_div}></div>
        <div className={styles.right_div_2}></div>
        <div className={styles.bottom_div}></div>
        <div className={styles.inner_container}>
          <h1>{t("app-name")}</h1>
          <p className={styles.description}>{t("app-description")}</p>
          <img src={background001} alt="thumb" />
        </div> */}
      </div>

      <SignIn />
    </div>
  );
}

export default SignInPage;
