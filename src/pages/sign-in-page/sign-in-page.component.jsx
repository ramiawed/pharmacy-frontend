import React, { useEffect, useState, useCallback } from "react";
import { Redirect } from "react-router-dom";

// components
import SignIn from "../../components/signin/signin.component";
import HomePageLoader from "../../components/home-page-loader/home-page-loader.component";
import Loader from "../../components/action-loader/action-loader.component";
import HeaderWithSlogn from "../../components/header-with-slogn/header-with-slogn.component";

// redux stuff
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
  authSignWithToken,
  cancelOperation,
  selectUserData,
} from "../../redux/auth/authSlice";
import { addStatistics } from "../../redux/statistics/statisticsSlice";
import { getAllSettings } from "../../redux/settings/settingsSlice";
import { getFavorites } from "../../redux/favorites/favoritesSlice";
import { getAllAdvertisements } from "../../redux/advertisements/advertisementsSlice";
import { getSavedItems } from "../../redux/savedItems/savedItemsSlice";

// constants
import { UserTypeConstants, VERSION } from "../../utils/constants";

function SignInPage() {
  const dispatch = useDispatch();
  const { user, status } = useSelector(selectUserData);

  // own state
  const [checkingToken, setCheckingToken] = useState(true);

  // handlers
  const cancelOperationHandler = () => {
    cancelOperation();
  };

  const runCheckToken = useCallback(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(authSignWithToken({ token, version: VERSION }))
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
          dispatch(getFavorites({ token: result.token }));
          dispatch(getAllAdvertisements({ token: result.token }));
          if (user.type === UserTypeConstants.PHARMACY) {
            dispatch(getSavedItems({ token }));
          }
          setCheckingToken(false);
        })
        .catch(() => {
          setCheckingToken(false);
        });
    } else {
      setCheckingToken(false);
    }
  }, [dispatch, user]);

  useEffect(() => {
    runCheckToken();
  });

  return checkingToken ? (
    <HomePageLoader />
  ) : user ? (
    <Redirect to="/" />
  ) : (
    <>
      <div className="sign_container">
        <SignIn />
        <HeaderWithSlogn bgColor="white" />
      </div>
      {status === "loading" && (
        <Loader allowCancel={true} onclick={cancelOperationHandler} />
      )}
    </>
  );
}

export default SignInPage;
