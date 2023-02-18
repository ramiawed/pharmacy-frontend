import React from "react";

// components
import HeaderWithSlogn from "../../components/header-with-slogn/header-with-slogn.component";
import SignUp from "../../components/signup/signup.component";

// styles
import generalStyles from "../../style.module.scss";

function SignUpPage() {
  return (
    <>
      <div className={generalStyles.sign_container}>
        <SignUp />
        <HeaderWithSlogn />
      </div>
    </>
  );
}

export default SignUpPage;
