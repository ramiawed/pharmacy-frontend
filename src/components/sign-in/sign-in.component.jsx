import React, { useState } from "react";
import styles from "./sign-in.module.scss";
import { useTranslation } from "react-i18next";
import Shapes from "../shapes/shapes.component";
import InputForm from "../input-form/input-form.component";
import SignInfoPanel from "../sign-info-panel/sign-info-panel.component";
import SignSwitchPanel from "../sign-switch-panel/sign-switch-panel.component";
import SignPanel from "../sign-panel/sign-panel.component";

function SignIn({ onclick, signin }) {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SignPanel swipe={signin}>
      <SignInfoPanel>
        <h3>{t("app-name")}</h3>
        <p>{t("signin")}</p>
        <div className={styles.input_form_container}>
          <InputForm
            label={t("user-username")}
            value={name}
            handleChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className={styles.input_form_container}>
          <InputForm
            label={t("user-password")}
            type="password"
            value={password}
            handleChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button>{t("signin")}</button>
      </SignInfoPanel>
      <SignSwitchPanel>
        <p>{t("signup-sentence")}</p>
        <button onClick={() => onclick(false)}>{t("signup")}</button>
        <Shapes />
      </SignSwitchPanel>
    </SignPanel>
  );
}

export default SignIn;
