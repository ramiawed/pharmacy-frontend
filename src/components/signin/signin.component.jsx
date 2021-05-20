// libraries
import React, { useState } from "react";
import { Redirect, useHistory } from "react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

// react-icons
import { HiUser } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineExclamationCircle } from "react-icons/ai";

// component
import Shapes from "../shapes/shapes.component";

// loading
import ReactLoading from "react-loading";

// redux
import {
  userSignin,
  selectUserData,
  resetError,
} from "../../redux/user/userSlice";

import styles from "./signin.module.scss";

const containerVariant = {
  hidden: {
    opacity: 0,
    left: "100vw",
  },
  visible: {
    opacity: 1,
    left: "0",
    transition: {
      type: "spring",
    },
  },
};

function SignIn() {
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // state for input fields (usrename, password)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // error object contains error message and fields that has the error
  const [preSignError, setPreSignError] = useState(null);

  // state from user state redux
  const { status, user, error } = useSelector(selectUserData);

  const handleSignUpClick = () => {
    // reset the state
    setUsername("");
    setPassword("");
    setPreSignError(null);
    if (error) {
      dispatch(resetError());
    }
    history.push("/signup");
  };

  // check if the username and password fields are not empty
  // if true, dispatch signin from userSlice
  const handleSignIn = () => {
    // check if the username is not empty
    if (username.trim().length === 0) {
      setPreSignError({
        message: "enter-username",
        fields: ["username"],
      });

      // check if the password is not empty
      if (password.length === 0) {
        setPreSignError({
          message: "enter-username-password",
          fields: ["username", "password"],
        });
      }
      return;
    }

    // check if the password is not empty
    if (password.length === 0) {
      setPreSignError({
        message: "enter-password",
        fields: ["password"],
      });
      return;
    }

    // username and password is not empty
    // dispatch sign in
    dispatch(userSignin({ username, password }));
  };

  return user ? (
    <Redirect to="/" />
  ) : (
    <motion.div
      className={styles.container}
      variants={containerVariant}
      initial="hidden"
      animate="visible"
    >
      <div className={styles.info}>
        <div className={styles.signup}>
          <p>{t("signup-sentence")}</p>
          <p className={styles.button} onClick={handleSignUpClick}>
            {t("signup")}
          </p>
        </div>
        <h3>{t("signin")}</h3>
        <div className={styles.input_div}>
          <HiUser className={styles.icon} />
          <input
            placeholder={t("user-username")}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (error?.length > 0) {
                dispatch(resetError());
              }

              if (preSignError && preSignError.fields.includes("username")) {
                if (preSignError.fields.length === 1) {
                  setPreSignError(null);
                } else {
                  setPreSignError({
                    message: "enter-password",
                    fields: ["password"],
                  });
                }
              }
            }}
          />
          {(preSignError?.fields.includes("username") || error) && (
            <AiOutlineExclamationCircle className={styles.icon_error} />
          )}
        </div>
        <div className={styles.input_div}>
          <RiLockPasswordLine className={styles.icon} />
          <input
            type="password"
            placeholder={t("user-password")}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error?.length > 0) {
                dispatch(resetError());
              }

              if (preSignError && preSignError.fields.includes("password")) {
                if (preSignError.fields.length === 1) {
                  setPreSignError(null);
                } else {
                  setPreSignError({
                    message: "enter-username",
                    fields: ["username"],
                  });
                }
              }
            }}
          />
          {(preSignError?.fields.includes("password") || error) && (
            <AiOutlineExclamationCircle className={styles.icon_error} />
          )}
        </div>
        <p className={styles.error}>
          {(preSignError ? t(`${preSignError?.message}`) : null) ||
            t(`${error}`)}{" "}
        </p>
        <motion.button
          whileHover={{
            scale: 1.1,
            textShadow: "0px 0px 8px rgb(255, 255, 255)",
            boxShadow: "0px 0px 8px rgb(255, 255, 255)",
          }}
          onClick={handleSignIn}
        >
          {t("signin")}
        </motion.button>

        {status === "loading" && (
          <ReactLoading type="bubbles" height={50} width={50} />
        )}
      </div>
      <Shapes />
    </motion.div>
  );
}

export default SignIn;
