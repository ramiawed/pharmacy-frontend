import React, { useState } from "react";
import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";
import styles from "./sign-page.module.scss";

function SignPage() {
  const [signin, setSignin] = useState(true);

  return (
    <div className={styles.sign_page}>
      <SignIn signin={signin} onclick={setSignin} />

      <SignUp signin={signin} onclick={setSignin} />
    </div>
  );
}

export default SignPage;
