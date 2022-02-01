import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// styles
import styles from "../side-nav.module.scss";

// constants
import { SideNavLinks, UserTypeConstants } from "../../utils/constants.js";
import { selectSettings } from "../../redux/settings/settingsSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  setCompany,
  setRole,
  setWarehouse,
} from "../../redux/items/itemsSlices";
import { selectOrders, setRefresh } from "../../redux/orders/ordersSlice";

function SideNavAdmin({ selectedOption, onSelectedChange }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { user } = useSelector(selectUserData);
  const {
    settings: { saveOrders },
  } = useSelector(selectSettings);
  const { unreadCount } = useSelector(selectOrders);

  return (
    <>
      <Link
        className={[
          styles.link,
          selectedOption === SideNavLinks.PARTNERS ? `${styles.selected}` : "",
        ].join(" ")}
        onClick={() => {
          onSelectedChange(SideNavLinks.PARTNERS);
        }}
        to="/admin/partners"
      >
        {t(SideNavLinks.PARTNERS)}
      </Link>
      <Link
        className={[
          styles.link,
          selectedOption === SideNavLinks.ITEMS ? `${styles.selected}` : "",
        ].join(" ")}
        onClick={() => {
          onSelectedChange(SideNavLinks.ITEMS);
          dispatch(setCompany(null));
          dispatch(setWarehouse(null));
          dispatch(setRole(UserTypeConstants.ADMIN));
        }}
        to={{
          pathname: "/items",
          state: {
            user: user,
            company: null,
            warehouse: null,
            role: UserTypeConstants.ADMIN,
          },
        }}
      >
        {t("nav-items")}
      </Link>

      <Link
        className={[
          styles.link,
          selectedOption === SideNavLinks.ADVERTISEMENTS
            ? `${styles.selected}`
            : "",
        ].join(" ")}
        onClick={() => {
          onSelectedChange(SideNavLinks.ADVERTISEMENTS);
        }}
        to="/admin/advertisements"
      >
        {t("nav-advertise")}
      </Link>

      <Link
        className={[
          styles.link,
          selectedOption === SideNavLinks.NOTIFICATIONS
            ? `${styles.selected}`
            : "",
        ].join(" ")}
        onClick={() => {
          onSelectedChange(SideNavLinks.NOTIFICATIONS);
        }}
        to="/admin/notifications"
      >
        {t("nav-notifications")}
      </Link>

      {saveOrders && (
        <Link
          className={[
            styles.link,
            selectedOption === SideNavLinks.ORDERS ? `${styles.selected}` : "",
          ].join(" ")}
          onClick={() => {
            onSelectedChange(SideNavLinks.ORDERS);
            dispatch(setRefresh(true));
          }}
          to="/orders"
        >
          {t("nav-orders")}{" "}
          {unreadCount > 0 && (
            <span className={styles.badge}>{unreadCount}</span>
          )}
        </Link>
      )}

      <Link
        className={[
          styles.link,
          selectedOption === SideNavLinks.SETTINGS ? `${styles.selected}` : "",
        ].join(" ")}
        onClick={() => {
          onSelectedChange(SideNavLinks.SETTINGS);
        }}
        to="/admin/settings"
      >
        {t("nav-settings")}
      </Link>
      <Link
        className={[
          styles.link,
          selectedOption === SideNavLinks.STATISTICS
            ? `${styles.selected}`
            : "",
        ].join(" ")}
        onClick={() => {
          onSelectedChange(SideNavLinks.STATISTICS);
        }}
        to="/admin/statistics"
      >
        {t("nav-statistics")}
      </Link>
      <Link
        className={[
          styles.link,
          selectedOption === SideNavLinks.PROFILE ? `${styles.selected}` : "",
        ].join(" ")}
        onClick={() => {
          onSelectedChange(SideNavLinks.PROFILE);
        }}
        to="/profile"
      >
        {t("nav-profile")}
      </Link>
    </>
  );
}

export default SideNavAdmin;
