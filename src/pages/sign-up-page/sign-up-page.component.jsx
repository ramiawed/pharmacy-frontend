import React from "react";

// components
import SignUp from "../../components/signup/signup.component";

// styles
import generalStyles from "../../style.module.scss";

function SignUpPage() {
  return (
    <div className={generalStyles.sign_container}>
      <SignUp />
    </div>
  );
}

export default SignUpPage;
