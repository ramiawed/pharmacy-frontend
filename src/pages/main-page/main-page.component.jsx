import React, { useState } from "react";
import { Redirect } from "react-router";
import { selectUserData } from "../../redux/user/userSlice";
import { useSelector } from "react-redux";

// components
import TopNav from "../../components/top-nav/top-nav.component";
import SideNav from "../../components/side-nav/side-nav.component";

// style
import styles from "./main-page.module.scss";

function MainPage() {
  const { user } = useSelector(selectUserData);

  return user ? (
    <div>
      <TopNav />
      <SideNav />
    </div>
  ) : (
    <Redirect to="/signin" />
  );
}

export default MainPage;
