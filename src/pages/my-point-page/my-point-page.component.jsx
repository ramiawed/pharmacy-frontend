import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

// components
import MainContentContainer from "../../components/main-content-container/main-content-container.component";
import Loader from "../../components/loader/loader.component";
import Header from "../../components/header/header.component";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { getMyPoints, selectUserData } from "../../redux/auth/authSlice";

// styles
import styles from "./my-point-page.module.scss";
import { UserTypeConstants } from "../../utils/constants";
import MyPointsDescriptionAr from "../../components/my-points-description-ar/my-points-description-ar.component";
import MyPointsDescriptionEn from "../../components/my-points-description-en/my-points-description-en.component";
import i18next from "i18next";

function MyPointPage({ onSelectedChange }) {
  const dispatch = useDispatch();
  const currentLanguage = i18next.language;

  const { user, token, status } = useSelector(selectUserData);

  const refreshHandler = () => {
    dispatch(getMyPoints({ token }));
  };

  useEffect(() => {
    onSelectedChange();
  }, []);

  return user && user.type === UserTypeConstants.PHARMACY ? (
    <>
      <Header title="my points" refreshHandler={refreshHandler} />

      <MainContentContainer>
        <p className={styles.my_points}>{user.points}</p>
        {currentLanguage === "ar" ? (
          <MyPointsDescriptionAr />
        ) : (
          <MyPointsDescriptionEn />
        )}
      </MainContentContainer>
      {status === "loading" && <Loader />}
    </>
  ) : (
    <Redirect to="/" />
  );
}

export default MyPointPage;
