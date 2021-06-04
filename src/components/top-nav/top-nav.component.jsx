import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { signOut } from "../../redux/auth/authSlice";
import { resetFavorites } from "../../redux/favorites/favoritesSlice";
import { resetUsers } from "../../redux/users/usersSlice";
import { resetCompanies } from "../../redux/company/companySlice";

// icons
import { TiShoppingCart } from "react-icons/ti";

// style
import styles from "./top-nav.module.scss";

// constants
import { TopNavLinks } from "../../utils/constants.js";
import { resetWarehouse } from "../../redux/warehouse/warehousesSlice";

function TopNav({ selectedOption, onSelectedChange, showTopNav }) {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(signOut());
    dispatch(resetUsers());
    dispatch(resetFavorites());
    dispatch(resetCompanies());
    dispatch(resetWarehouse());
  };

  return (
    <div
      className={[styles.nav, showTopNav ? styles.show : styles.hide].join(" ")}
    >
      <div className={styles.start}>{/* <p>start 1</p> */}</div>
      <div className={styles.center}>
        <Link
          to="/"
          className={[
            styles.link,
            selectedOption === TopNavLinks.HOME ? styles.selected : null,
          ].join(" ")}
          onClick={() => onSelectedChange(TopNavLinks.HOME)}
        >
          {/* <FaHome /> */}
          {t("nav-main-page")}
        </Link>
        <Link
          to="/companies"
          className={[
            styles.link,
            selectedOption === TopNavLinks.COMPANIES ? styles.selected : null,
          ].join(" ")}
          onClick={() => onSelectedChange(TopNavLinks.COMPANIES)}
        >
          {t("nav-company")}
        </Link>
        <Link
          to="/warehouses"
          className={[
            styles.link,
            selectedOption === TopNavLinks.WAREHOUSES ? styles.selected : null,
          ].join(" ")}
          onClick={() => onSelectedChange(TopNavLinks.WAREHOUSES)}
        >
          {t("nav-warehouse")}
        </Link>
      </div>
      <div className={styles.end}>
        <Link
          to="/cart"
          className={[
            styles.link,
            selectedOption === TopNavLinks.CART ? styles.selected : null,
          ].join(" ")}
          onClick={() => onSelectedChange(TopNavLinks.CART)}
        >
          <TiShoppingCart size={20} />
        </Link>
        <p
          className={[
            styles.link,
            selectedOption === TopNavLinks.SIGNOUT ? styles.selected : null,
          ].join(" ")}
          onClick={() => handleSignout()}
        >
          {t("nav-sign-out")}
        </p>
      </div>
    </div>
  );
}

export default TopNav;
