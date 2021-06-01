import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router";
import { resetStatus, selectUserData } from "../../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

// components
import TopNav from "../../components/top-nav/top-nav.component";
import SideNav from "../../components/side-nav/side-nav.component";

// style
import styles from "./main-page.module.scss";
import CompaniesPage from "../compnaies-page/companies-page.component";
import WarehousesPage from "../warehouses-page/warehouses.page.component";
import CartPage from "../cart-page/cart-page.component";
import AdminUsers from "../../components/admin-users/admin-users.component";
import { UserTypeConstants } from "../../utils/constants";
import UserProfile from "../../components/user-profile/user-profile.component";

function MainPage() {
  const { user } = useSelector(selectUserData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetStatus());
  }, []);

  return user ? (
    <div>
      <TopNav />
      <SideNav />

      <div className={styles.content_area}>
        <Route path="/companies">
          <CompaniesPage />
        </Route>

        <Route path="/warehouses">
          <WarehousesPage />
        </Route>

        <Route path="/cart">
          <CartPage />
        </Route>

        <Route path="/profile">
          <UserProfile />
        </Route>

        <Route path="/admin/companies">
          <AdminUsers type={UserTypeConstants.COMPANY} />
        </Route>
      </div>
    </div>
  ) : (
    <Redirect to="/signin" />
  );
}

export default MainPage;
