import React from "react";
import { useTranslation } from "react-i18next";
import Logo from "../../logo01.png";

// components
import SignUp from "../../components/signup/signup.component";

// styles
import styles from "./sign-up-page.module.scss";

function SignUpPage() {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={Logo} alt="thumb" className={styles.img} />
        <p>{t("app-slogan")}</p>
      </div>
      <div className={styles.content}>
        <SignUp />
      </div>
    </div>
  );
}

export default SignUpPage;
