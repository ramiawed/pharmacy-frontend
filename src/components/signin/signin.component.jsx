// libraries
import React, { useState } from "react";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/small_logo.png";

// react-icons
import { HiUser } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";

// component
import InputSignIn from "../input-sign-in/input-sign-in.component";
import Modal from "../../modals/modal/modal.component";

// redux
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
  authSign,
  selectUserData,
  resetError,
} from "../../redux/auth/authSlice";
import { addStatistics } from "../../redux/statistics/statisticsSlice";
import { getAllSettings } from "../../redux/settings/settingsSlice";
import { getAllAdvertisements } from "../../redux/advertisements/advertisementsSlice";
import { getCompanies } from "../../redux/company/companySlice";
import { getWarehouses } from "../../redux/warehouse/warehousesSlice";

// styles
import styles from "./signin.module.scss";

// constants
import { VERSION } from "../../utils/constants";

// contexts
import { useTheme } from "../../contexts/themeContext";
import Checkbox from "../checkbox/checkbox.component";
import CustomButton from "../custom-button/custom-button.component";

// Sign in component
function SignIn() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  // selectors
  // state from user state redux
  const { error } = useSelector(selectUserData);

  // state holds the username and password
  // used in the input fields
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    version: VERSION,
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
    // if (!isOnline) {
    //   dispatch(changeOnlineMsg());
    //   return;
    // }

    // check if the username and password is not empty
    if (userInfo.username.length === 0 && userInfo.password.length === 0) {
      setPreSignError({
        ...preSignError,
        username: "enter username error",
        password: "enter password error",
      });
      return;
    }

    // check if the username is not empty
    if (userInfo.username.length === 0) {
      setPreSignError({
        ...preSignError,
        username: "enter password error",
      });
      return;
    }

    // check if the password is not empty
    if (userInfo.password.length === 0) {
      setPreSignError({
        ...preSignError,
        password: "enter password error",
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
        dispatch(getCompanies({ token: result.token }));
        dispatch(getWarehouses({ token: result.token }));
      })
      .catch(() => {});
  };

  // handle enter press on input
  const pressEnterHandler = () => {
    signInHandler();
  };

  return (
    <div
      className={[
        styles.outer_container,
        "flex flex-col gap-4 items-center relative min-w-[350px]",
      ].join(" ")}
    >
      <div
        className={`w-full flex flex-col items-center p-5 rounded-xl transition-all
          ${theme === "light" ? "bg-main" : "d-mixed300-primary300"}`}
      >
        <div className="w-full flex flex-row items-center mb-3">
          <div
            className={`${
              theme === "light" ? "text-white" : ""
            } flex-1 bold text-2xl`}
          >
            {t("sign in")}
          </div>
          <img
            src={Logo}
            alt="thumb"
            className={`w-[75px] h-auto rounded-full`}
          />
        </div>

        {/* username */}
        <InputSignIn
          icon={<HiUser size={20} />}
          type="text"
          placeholder="username"
          id="username"
          value={userInfo.username}
          onchange={inputChangeHandler}
          error={preSignError.username?.length > 0 || error}
          onEnterPress={pressEnterHandler}
          resetField={resetFieldHandler}
        />

        {/* password */}
        <InputSignIn
          icon={<RiLockPasswordLine size={20} />}
          type="password"
          placeholder="password"
          id="password"
          value={userInfo.password}
          onchange={inputChangeHandler}
          error={preSignError.password?.length > 0 || error}
          onEnterPress={pressEnterHandler}
          resetField={resetFieldHandler}
        />

        <div
          className={`mt-3 w-full flex items-center justify-between mb-4 ${
            theme === "light" ? "text-white" : ""
          } `}
        >
          {/* <div className="flex flex-row items-center"> */}
          <Checkbox
            check={rememberMeOption}
            clickHandler={() => setRememberMeOption(!rememberMeOption)}
            label={t("remember me")}
            classname={`${
              theme === "light" ? "bg-white text-dark" : "d-mixed100-primary300"
            }`}
            labelClassname={`${
              theme === "light" ? "text-white" : "text-color-primary-300"
            }`}
          />

          <p
            className="text-sm cursor-pointer hover:underline"
            onClick={() => {
              setShowForgetPasswordModal(true);
            }}
          >
            {t("forget password")}
          </p>
        </div>

        {/* Error sections */}
        <>
          {Object.keys(preSignError).map((key) => {
            if (preSignError[key].length > 0) {
              return (
                <p className="text-red text-xs bold" key={key}>
                  {t(`${preSignError[key]}`)}
                </p>
              );
            } else {
              return null;
            }
          })}
          {error && <p className="text-red text-xs bold">{t(error)}</p>}
        </>

        <CustomButton
          text={t("sign in")}
          onClickHandler={signInHandler}
          classname={`${
            theme === "light" ? "bg-red text-white" : "d-primary500-mixed300"
          }`}
        />
      </div>

      <div
        className={`w-full flex flex-col items-center group p-5 rounded-xl cursor-pointer
        ${
          theme === "light"
            ? "bg-[#606ba0] hover:shadow-[0_0px_5px_3px_rgba(86,96,146,0.6)]"
            : "d-mixed300-primary300 hover:shadow-[0_0px_5px_3px_rgba(255,255,255,0.2)]"
        }`}
        onClick={signupHandler}
      >
        <label className="cursor-pointer text-sm text-white">
          {t("sign up sentence")}
        </label>
        {/* <br /> */}
        <label
          className={`${
            theme === "light" ? "text-red" : ""
          } inline-block bold cursor-pointer`}
        >
          {t("sign up")}
        </label>
      </div>

      {showForgetPasswordModal && (
        <Modal
          closeHandler={() => {
            setShowForgetPasswordModal(false);
          }}
          headerText={t("contact us")}
          cancelText={t("close")}
          showFooter={true}
        >
          <p
            className={`${
              theme === "light" ? "text-dark" : "text-color-primary-400"
            }`}
          >
            {t("forget password msg")}
          </p>
          <p style={{ color: "#25D366" }}>
            {t("contact us via whatsapp")} : {t("our phone number")}
          </p>
          <p style={{ color: "#229ED9" }}>
            {t("contact us via telegram")} : {t("our phone number")}
          </p>
        </Modal>
      )}
    </div>
  );
}

export default SignIn;
