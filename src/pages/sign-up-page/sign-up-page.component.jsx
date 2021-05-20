import React from "react";
import SignUp from "../../components/signup/signup.component";
import styles from "./sign-up-page.module.scss";

function SignUpPage() {
  return (
    <div className={styles.container}>
      <SignUp />
    </div>
  );
}

export default SignUpPage;
