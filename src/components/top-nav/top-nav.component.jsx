import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUser, signOut } from "../../redux/auth/authSlice";
import {
  resetFavorites,
  selectFavorites,
} from "../../redux/favorites/favoritesSlice";
import { resetUsers } from "../../redux/users/usersSlice";
import { resetCompanies } from "../../redux/company/companySlice";
import { resetWarehouse } from "../../redux/warehouse/warehousesSlice";

// components
import IconWithNumber from "../icon-with-number/icon-with-number.component";

// icons
import { TiShoppingCart } from "react-icons/ti";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

// style
import styles from "./top-nav.module.scss";

// constants
import { TopNavLinks, UserTypeConstants } from "../../utils/constants.js";
import { resetCategories } from "../../redux/categories/categoriesSlice";
import { resetItemTypes } from "../../redux/itemTypes/itemTypesSlice";
import { resetItems } from "../../redux/items/itemsSlices";

function TopNav({ selectedOption, onSelectedChange, showTopNav }) {
  const { t } = useTranslation();
  const favorites = useSelector(selectFavorites);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(signOut());
    dispatch(resetUsers());
    dispatch(resetFavorites());
    dispatch(resetCompanies());
    dispatch(resetWarehouse());
    dispatch(resetCategories());
    dispatch(resetItemTypes());
    dispatch(resetItems());
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
          to="/favorites"
          className={[
            styles.link,
            selectedOption === TopNavLinks.FAVORITES ? styles.selected : null,
          ].join(" ")}
          onClick={() => onSelectedChange(TopNavLinks.FAVORITES)}
        >
          <IconWithNumber
            value={favorites.length}
            fillIcon={<AiFillStar size={20} />}
            noFillIcon={<AiOutlineStar size={20} />}
          />
        </Link>
        {user.type === UserTypeConstants.PHARMACY && (
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
        )}

        <p
          className={[
            styles.link,
            selectedOption === TopNavLinks.SIGNOUT ? styles.selected : null,
          ].join(" ")}
          onClick={() => handleSignout()}
        >
          {t("nav-sign-out")}
        </p>
        <p className={styles.link}>{user.name}</p>
      </div>
    </div>
  );
}

export default TopNav;
