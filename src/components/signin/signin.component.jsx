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

// redux
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  authSign,
  selectUserData,
  resetError,
} from "../../redux/auth/authSlice";
import { statisticsSignin } from "../../redux/statistics/statisticsSlice";
// styles
import styles from "./signin.module.scss";

// constants
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";
import Button from "../button/button.component";
import { Colors } from "../../utils/constants";
import Loader from "../action-loader/action-loader.component";
import { getAllSettings } from "../../redux/settings/settingsSlice";

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
  const { t } = useTranslation();

  const history = useHistory();
  const isOnline = useSelector(selectOnlineStatus);
  const dispatch = useDispatch();

  // state from user state redux
  const { status, user, error } = useSelector(selectUserData);

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
  const inputChangeHandler = (e) => {
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

  const resetFieldHandler = (field) => {
    setUserInfo({
      ...userInfo,
      [field]: "",
    });

    setPreSignError({
      ...preSignError,
      [field]: "",
    });
  };

  // go to the sign up page
  const signupHandler = () => {
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
  const signInHandler = () => {
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
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    // username and password is not empty
    // dispatch sign
    dispatch(authSign(userInfo))
      .then(unwrapResult)
      .then((result) => {
        dispatch(statisticsSignin({ token: result.token }));
        dispatch(getAllSettings({ token: result.token }));
      })
      .catch((err) => {});
  };

  // handle enter press on input
  const pressEnterHandler = () => {
    signInHandler();
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
          <p className={styles.button} onClick={signupHandler}>
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
          onchange={inputChangeHandler}
          error={preSignError.username?.length > 0 || error}
          onEnterPress={pressEnterHandler}
          resetField={resetFieldHandler}
        />

        <Input
          icon={<RiLockPasswordLine className={styles.icon} />}
          type="password"
          placeholder="user-password"
          id="password"
          value={userInfo.password}
          onchange={inputChangeHandler}
          error={preSignError.password?.length > 0 || error}
          onEnterPress={pressEnterHandler}
          resetField={resetFieldHandler}
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

        <Button
          text={t("signin")}
          action={signInHandler}
          bgColor={Colors.FAILED_COLOR}
        />
      </div>

      {status === "loading" && <Loader allowCancel={true} />}
    </motion.div>
  );
}

export default SignIn;
