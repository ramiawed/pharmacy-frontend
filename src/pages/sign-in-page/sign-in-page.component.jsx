import React from "react";

// components
import SignIn from "../../components/signin/signin.component";

// styles
import generalStyles from "../../style.module.scss";

function SignInPage() {
  return (
    <div className={generalStyles.sign_container}>
      <SignIn />
    </div>
  );
}

export default SignInPage;
