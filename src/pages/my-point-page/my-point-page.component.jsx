import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

// components
import MainContentContainer from "../../components/main-content-container/main-content-container.component";
import Header from "../../components/header/header.component";

// redux stuff
import { useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";

// styles
import styles from "./my-point-page.module.scss";
import { UserTypeConstants } from "../../utils/constants";

function MyPointPage({ onSelectedChange }) {
  const { user } = useSelector(selectUserData);

  useEffect(() => {
    onSelectedChange();
  }, []);

  return user && user.type === UserTypeConstants.PHARMACY ? (
    <>
      <Header title="my points" />

      <MainContentContainer>
        <p className={styles.my_points}>{user.points}</p>
      </MainContentContainer>
    </>
  ) : (
    <Redirect to="/" />
  );
}

export default MyPointPage;
