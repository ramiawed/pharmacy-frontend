import React from "react";

// components
import SignIn from "../../components/signin/signin.component";

// styles
import styles from "./sign-in-page.module.scss";

function SignInPage() {
  return (
    <div className={styles.container}>
      <SignIn />
    </div>
  );
}

export default SignInPage;
