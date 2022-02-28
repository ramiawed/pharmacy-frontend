import React from "react";

import { useTranslation } from "react-i18next";
import Logo from "../../logo01.png";
// import Logo from "../../sign-in-page.jpg";

// components
import SignIn from "../../components/signin/signin.component";

// styles
import styles from "./sign-in-page.module.scss";

function SignInPage() {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={Logo} alt="thumb" className={styles.img} />
      </div>
      <div className={styles.content}>
        <SignIn />
      </div>
    </div>
  );
}

export default SignInPage;
