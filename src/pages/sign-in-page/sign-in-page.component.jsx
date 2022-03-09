import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "../../logo.png";

// components
import SignIn from "../../components/signin/signin.component";

// redux stuff
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { authSignWithToken, selectUser } from "../../redux/auth/authSlice";
import { addStatistics } from "../../redux/statistics/statisticsSlice";
import { getAllSettings } from "../../redux/settings/settingsSlice";

// styles
import styles from "./sign-in-page.module.scss";
import HomePageLoader from "../../components/home-page-loader/home-page-loader.component";

function SignInPage() {
  const { t } = useTranslation();
  const [checkingToken, setCheckingToken] = useState(true);
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(authSignWithToken({ token }))
        .then(unwrapResult)
        .then((result) => {
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
          setCheckingToken(false);
        })
        .catch(() => {
          setCheckingToken(false);
        });
    } else {
      setCheckingToken(false);
    }
  }, []);

  return checkingToken ? (
    <HomePageLoader />
  ) : user ? (
    <Redirect to="/" />
  ) : (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={Logo} alt="thumb" className={styles.img} />
        <p>{t("app-slogan")}</p>
      </div>
      <div className={styles.content}>
        <SignIn />
      </div>
    </div>
  );
}

export default SignInPage;
