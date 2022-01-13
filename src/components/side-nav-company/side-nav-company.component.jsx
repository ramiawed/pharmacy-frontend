import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// styles
import styles from "../side-nav.module.scss";

// constants
import { SideNavLinks, UserTypeConstants } from "../../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSlice";
import {
  setCompany,
  setRole,
  setWarehouse,
} from "../../redux/items/itemsSlices";

function SideNavCompany({ selectedOption, onSelectedChange }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <>
      <Link
        className={[
          styles.link,
          selectedOption === SideNavLinks.ITEMS ? `${styles.selected}` : "",
        ].join(" ")}
        onClick={() => {
          onSelectedChange(SideNavLinks.ITEMS);
          dispatch(setCompany(user));
          dispatch(setWarehouse(null));
          dispatch(setRole(UserTypeConstants.COMPANY));
        }}
        // to="/company/items"
        to={{
          pathname: "/items",
          state: {
            user: user,
            company: user,
            warehouse: null,
            role: UserTypeConstants.COMPANY,
          },
        }}
      >
        {t("nav-items")}
      </Link>

      {/* <Link
        className={[
          styles.link,
          selectedOption === SideNavLinks.ADVERTISEMENTS
            ? `${styles.selected}`
            : "",
        ].join(" ")}
        onClick={() => {
          onSelectedChange(SideNavLinks.ADVERTISEMENTS);
        }}
        to="/company/advertises"
      >
        {t("nav-advertise")}
      </Link> */}

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

export default SideNavCompany;
