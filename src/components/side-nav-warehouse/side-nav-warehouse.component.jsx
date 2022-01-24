import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// styles
import styles from "../side-nav.module.scss";

// constants
import { SideNavLinks, UserTypeConstants } from "../../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSlice";
import { selectSettings } from "../../redux/settings/settingsSlice";
import {
  setCompany,
  setRole,
  setSearchWarehouseName,
  setWarehouse,
} from "../../redux/items/itemsSlices";
import { selectOrders } from "../../redux/orders/ordersSlice";

function SideNavWarehouse({ selectedOption, onSelectedChange }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const {
    settings: { saveOrders },
  } = useSelector(selectSettings);
  const { unreadCount } = useSelector(selectOrders);

  return (
    <>
      <Link
        className={[
          styles.link,
          selectedOption === SideNavLinks.ITEMS ? `${styles.selected}` : "",
        ].join(" ")}
        onClick={() => {
          onSelectedChange(SideNavLinks.ITEMS);
          dispatch(setCompany(null));
          dispatch(setWarehouse(user));
          dispatch(setSearchWarehouseName(""));
          dispatch(setRole(UserTypeConstants.WAREHOUSE));
        }}
        // to="/warehouse/items"
        to={{
          pathname: "/items",
          state: {
            user: user,
            company: null,
            warehouse: user,
            role: UserTypeConstants.WAREHOUSE,
          },
        }}
      >
        {t("nav-items")}
      </Link>

      {saveOrders && (
        <Link
          className={[
            styles.link,
            selectedOption === SideNavLinks.ORDERS ? `${styles.selected}` : "",
          ].join(" ")}
          onClick={() => {
            onSelectedChange(SideNavLinks.ORDERS);
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

export default SideNavWarehouse;
