import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// styles
import styles from "../side-nav.module.scss";

// constants
import { SideNavLinks, UserTypeConstants } from "../../utils/constants.js";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSlice";

function SideNavAdmin({ selectedOption, onSelectedChange }) {
  const { t } = useTranslation();
  const user = useSelector(selectUser);
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
        to="/admin/advertises"
      >
        {t("nav-advertise")}
      </Link>
      <Link
        className={[
          styles.link,
          selectedOption === SideNavLinks.OFFERS ? `${styles.selected}` : "",
        ].join(" ")}
        onClick={() => {
          onSelectedChange(SideNavLinks.OFFERS);
        }}
        to="/admin/offers"
      >
        {t("nav-offers")}
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
