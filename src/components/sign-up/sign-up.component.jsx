import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import Shapes from "../shapes/shapes.component";
import InputForm from "../input-form/input-form.component";
import SignInfoPanel from "../sign-info-panel/sign-info-panel.component";
import SignSwitchPanel from "../sign-switch-panel/sign-switch-panel.component";

import styles from "./sign-up.module.scss";
import SignPanel from "../sign-panel/sign-panel.component";

function SignUp({ onclick, signin }) {
  const { t } = useTranslation();

  // states for each field
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  return (
    <SignPanel swipe={signin}>
      <SignSwitchPanel>
        <p>{t("signin-sentence")}</p>
        <button onClick={() => onclick(true)}>{t("signin")}</button>
        <Shapes />
      </SignSwitchPanel>

      <SignInfoPanel>
        <h3>{t("app-name")}</h3>
        <p>{t("signup")}</p>
        <div className={styles.inputs_div}>
          <div className={styles.input_form_container}>
            <InputForm
              label={t("user-name")}
              value={name}
              handleChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          <div className={styles.input_form_container}>
            <InputForm
              label={t("user-username")}
              value={username}
              handleChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>

          <div className={styles.separator}></div>

          <div className={styles.input_form_container}>
            <InputForm
              label={t("user-password")}
              value={password}
              handleChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className={styles.input_form_container}>
            <InputForm
              label={t("user-password-confirm")}
              value={passwordConfirm}
              handleChange={(e) => {
                setPasswordConfirm(e.target.value);
              }}
            />
          </div>

          <div className={styles.separator}></div>

          <div className={styles.input_form_container}>
            <InputForm
              label={t("user-email")}
              value={email}
              handleChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className={styles.input_form_container}></div>

          <div className={styles.input_form_container}>
            <InputForm
              label={t("user-phone")}
              value={phone}
              handleChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>

          <div className={styles.input_form_container}>
            <InputForm
              label={t("user-mobile")}
              value={mobile}
              handleChange={(e) => {
                setMobile(e.target.value);
              }}
            />
          </div>

          <div className={styles.separator}></div>
        </div>
      </SignInfoPanel>
    </SignPanel>
  );
}

export default SignUp;
