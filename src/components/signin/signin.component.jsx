// libraries
import React, { useState } from "react";
import { Redirect, useHistory } from "react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// react-icons
import { HiUser } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";

// component
import Input from "../input/input.component";

// loading
import ReactLoading from "react-loading";

// redux
import { useDispatch, useSelector } from "react-redux";
import {
  authSign,
  selectUserData,
  resetError,
  cancelOperation,
} from "../../redux/auth/authSlice";
import { statisticsSignin } from "../../redux/statistics/statisticsSlice";
// styles
import styles from "./signin.module.scss";

//
import { checkConnection } from "../../utils/checkInternet";
import { Colors } from "../../utils/constants";
import Toast from "../toast/toast.component";
import { unwrapResult } from "@reduxjs/toolkit";
import ActionLoader from "../action-loader/action-loader.component";

// constants use for motion
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

// Sign in component
function SignIn() {
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // state from user state redux
  const { status, user, error } = useSelector(selectUserData);
  const [connectionError, setConnectionError] = useState("");

  // state holds the username and password
  // used in the input fields
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  // error object contains error message and fields that has the error
  const [preSignError, setPreSignError] = useState({
    username: "",
    password: "",
  });

  // handle username input and password input
  const handleInputChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.id]: e.target.value,
    });

    setPreSignError({
      ...preSignError,
      [e.target.id]: "",
    });

    if (error) {
      dispatch(resetError());
    }
  };

  const handleResetField = (field) => {
    setUserInfo({
      ...userInfo,
      [field]: "",
    });

    setPreSignError({
      ...preSignError,
      [field]: "",
    });
  };

  const handleSignUpClick = () => {
    // reset the state
    setUserInfo({
      username: "",
      password: "",
    });

    setPreSignError({
      username: "",
      password: "",
    });

    if (error) {
      dispatch(resetError());
    }
    history.push("/signup");
  };

  // check if the username and password fields are not empty
  // if true, dispatch signin from userSlice
  const handleSignIn = () => {
    // check if the username and password is not empty
    if (userInfo.username.length === 0 && userInfo.password.length === 0) {
      setPreSignError({
        ...preSignError,
        username: "enter-username",
        password: "enter-password",
      });
      return;
    }

    // check if the username is not empty
    if (userInfo.username.length === 0) {
      setPreSignError({
        ...preSignError,
        username: "enter-password",
      });
      return;
    }

    // check if the password is not empty
    if (userInfo.password.length === 0) {
      setPreSignError({
        ...preSignError,
        password: "enter-password",
      });
      return;
    }

    // check the internet connection
    if (!checkConnection()) {
      setConnectionError("no-internet-connection");
      return;
    }

    // username and password is not empty
    // dispatch sign in
    dispatch(authSign(userInfo))
      .then(unwrapResult)
      .then((result) => dispatch(statisticsSignin({ token: result.token })))
      .catch((err) => {});
  };

  // handle enter press on input
  const handlePressEnter = () => {
    handleSignIn();
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
        <Input
          icon={<HiUser className={styles.icons} />}
          type="text"
          placeholder="user-username"
          id="username"
          value={userInfo.username}
          onchange={handleInputChange}
          error={preSignError.username?.length > 0 || error}
          onEnterPress={handlePressEnter}
          resetField={handleResetField}
        />

        <Input
          icon={<RiLockPasswordLine className={styles.icon} />}
          type="password"
          placeholder="user-password"
          id="password"
          value={userInfo.password}
          onchange={handleInputChange}
          error={preSignError.password?.length > 0 || error}
          onEnterPress={handlePressEnter}
          resetField={handleResetField}
        />

        {/* Error sections */}
        <>
          {Object.keys(preSignError).map((key) => {
            if (preSignError[key].length > 0) {
              return (
                <p className={styles.error} key={key}>
                  {t(`${preSignError[key]}`)}
                </p>
              );
            } else {
              return null;
            }
          })}
          {error && <p className={styles.error}>{t(error)}</p>}
        </>
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
      </div>
      {connectionError && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          actionAfterTimeout={() => {
            setConnectionError("");
          }}
        >
          <p>{t(connectionError)}</p>
        </Toast>
      )}

      {status === "loading" && (
        <ActionLoader allowCancel={true} onclick={() => cancelOperation()} />
      )}
    </motion.div>
  );
}

export default SignIn;
