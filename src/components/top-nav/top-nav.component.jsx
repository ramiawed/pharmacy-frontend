import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUser, signOut } from "../../redux/auth/authSlice";
import {
  resetFavorites,
  selectFavorites,
  selectFavoritesPartners,
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
import { resetItems } from "../../redux/items/itemsSlices";
import { resetCompanyItems } from "../../redux/companyItems/companyItemsSlices";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  resetCartItems,
  selectCartItemCount,
} from "../../redux/cart/cartSlice";
import { resetWarehouseItems } from "../../redux/warehouseItems/warehouseItemsSlices";

function TopNav({ selectedOption, onSelectedChange, showTopNav }) {
  const history = useHistory();
  const { t } = useTranslation();
  const allFavorites = useSelector(selectFavorites);

  const user = useSelector(selectUser);
  const total = useSelector(selectCartItemCount);

  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(signOut());
    dispatch(resetUsers());
    dispatch(resetFavorites());
    dispatch(resetCompanies());
    dispatch(resetWarehouse());
    dispatch(resetItems());
    dispatch(resetCompanyItems());
    dispatch(resetWarehouseItems());
    dispatch(resetCartItems());
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
            history.location.pathname === "/" ? styles.selected : null,
          ].join(" ")}
          onClick={() => onSelectedChange(TopNavLinks.HOME)}
        >
          {t("nav-main-page")}
        </Link>
        <Link
          to="/companies"
          className={[
            styles.link,
            history.location.pathname === "/companies" ? styles.selected : null,
          ].join(" ")}
          onClick={() => onSelectedChange(TopNavLinks.COMPANIES)}
        >
          {t("nav-company")}
        </Link>
        <Link
          to="/warehouses"
          className={[
            styles.link,
            history.location.pathname === "/warehouses"
              ? styles.selected
              : null,
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
            history.location.pathname === "/favorites" ? styles.selected : null,
          ].join(" ")}
          onClick={() => onSelectedChange(TopNavLinks.FAVORITES)}
        >
          <IconWithNumber
            value={
              allFavorites.favorites.length +
              allFavorites.favorites_items.length
            }
            fillIcon={<AiFillStar size={20} />}
            noFillIcon={<AiOutlineStar size={20} />}
          />
        </Link>
        {user.type === UserTypeConstants.PHARMACY && (
          <Link
            to="/cart"
            className={[
              styles.link,
              history.location.pathname === "/cart" ? styles.selected : null,
            ].join(" ")}
            onClick={() => onSelectedChange(TopNavLinks.CART)}
          >
            <IconWithNumber
              value={total}
              fillIcon={<TiShoppingCart size={20} />}
              noFillIcon={<TiShoppingCart size={20} />}
            />
            {/* <TiShoppingCart size={20} /> */}
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
        <div
          style={{
            backgroundImage: 'url("http://localhost:8000/avatar01.png',
          }}
          className={styles.profile_img}
        >
          {/* <div className={styles.user_actions}>
            <p>sign out</p>
            <p>medicines</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default TopNav;
