import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// styles
import styles from "../side-nav.module.scss";

// constants
import { SideNavLinks, UserTypeConstants } from "../../utils/constants.js";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSlice";

function SideNavWarehouse({ selectedOption, onSelectedChange }) {
  const { t } = useTranslation();
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
      {/* <Link
        className={[
          styles.link,
          selectedOption === SideNavLinks.OFFERS ? `${styles.selected}` : "",
        ].join(" ")}
        onClick={() => {
          onSelectedChange(SideNavLinks.OFFERS);
        }}
        to="/warehouse/orders"
      >
        {t("nav-orders")}
      </Link> */}

      {/* <Link
        className={[
          styles.link,
          selectedOption === SideNavLinks.OFFERS ? `${styles.selected}` : "",
        ].join(" ")}
        onClick={() => {
          onSelectedChange(SideNavLinks.OFFERS);
        }}
        to="/warehouse/offers"
      >
        {t("nav-offers")}
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

export default SideNavWarehouse;
