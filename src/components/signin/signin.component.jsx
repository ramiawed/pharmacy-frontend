// libraries
import React, { useState } from "react";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import Logo from "../../smal-logo.png";

// react-icons
import { HiUser } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";

// component
import InputSignIn from "../input-sign-in/input-sign-in.component";
import Button from "../button/button.component";
import Modal from "../../modals/modal/modal.component";

// redux
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
  authSign,
  selectUserData,
  resetError,
} from "../../redux/auth/authSlice";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";
import { addStatistics } from "../../redux/statistics/statisticsSlice";
import { getAllSettings } from "../../redux/settings/settingsSlice";
import { getAllAdvertisements } from "../../redux/advertisements/advertisementsSlice";

// styles
import styles from "./signin.module.scss";

// constants
import { Colors } from "../../utils/constants";

// Sign in component
function SignIn() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  // selectors
  // state that indicates if there is a internet connection or not
  const isOnline = useSelector(selectOnlineStatus);
  // state from user state redux
  const { error } = useSelector(selectUserData);

  // state holds the username and password
  // used in the input fields
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });
  const [showForgetPasswordModal, setShowForgetPasswordModal] = useState(false);
  const [rememberMeOption, setRememberMeOption] = useState(false);
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
    // check the internet connection
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

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

    // username and password is not empty
    // dispatch sign
    dispatch(authSign(userInfo))
      .then(unwrapResult)
      .then((result) => {
        if (rememberMeOption) {
          localStorage.setItem("token", result.token);
        }
        dispatch(
          addStatistics({
            obj: {
              targetUser: result.data.user._id,
              action: "user-sign-in",
            },
            token: result.token,
          })
        );
        dispatch(getAllSettings({ token: result.token }));
        dispatch(getAllAdvertisements({ token: result.token }));
      })
      .catch(() => {});
  };

  // handle enter press on input
  const pressEnterHandler = () => {
    signInHandler();
  };

  return (
    <div className={styles.outer_container}>
      <div className={[styles.container].join(" ")}>
        <div className={styles.header}>
          <h3>{t("sign-in")}</h3>
          <img src={Logo} alt="thumb" className={styles.img} />
        </div>

        {/* username */}
        <InputSignIn
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

        {/* password */}
        <InputSignIn
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

        <div
          className={styles.remember_me}
          defaultChecked={rememberMeOption}
          defaultValue={rememberMeOption}
          onChange={() => setRememberMeOption(!rememberMeOption)}
        >
          <div>
            <input id="remember" type="checkbox" />
            <label htmlFor="remember">{t("remember-me")}</label>
          </div>

          <p
            className={styles.forget_password}
            onClick={() => {
              setShowForgetPasswordModal(true);
            }}
          >
            {t("forget-password")}
          </p>
        </div>

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

        <div
          style={{
            marginTop: "15px",
          }}
        >
          <Button
            text={t("sign-in")}
            action={signInHandler}
            bgColor={Colors.FAILED_COLOR}
          />
        </div>
      </div>

      <div
        className={[styles.container, styles.bottom_container].join(" ")}
        onClick={signupHandler}
      >
        <div className={styles.signup}>
          <label style={{ cursor: "pointer", fontSize: "14px" }}>
            {t("sign-up-sentence")}
          </label>
          <br />
          <label className={styles.signup_button}>{t("sign-up")}</label>
        </div>
      </div>

      {showForgetPasswordModal && (
        <Modal
          closeModal={() => {
            setShowForgetPasswordModal(false);
          }}
          header={t("contact-us")}
          cancelLabel={t("close-label")}
          small={true}
          green={true}
        >
          <p>{t("forget-password-msg")}</p>
          <p style={{ color: "#25D366" }}>
            {t("contact-us-via-whatsapp")} : {t("contact-phone-number")}
          </p>
          <p style={{ color: "#229ED9" }}>
            {t("contact-us-via-telegram")} : {t("contact-phone-number")}
          </p>
        </Modal>
      )}
    </div>
  );
}

export default SignIn;
