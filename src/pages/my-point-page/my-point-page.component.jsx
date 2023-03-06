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

function MyPointPage({ onSelectedChange }) {
  const dispatch = useDispatch();

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
      </MainContentContainer>
      {status === "loading" && <Loader />}
    </>
  ) : (
    <Redirect to="/" />
  );
}

export default MyPointPage;
