import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";

// redux stuff
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSlice";
import { selectFavorites } from "../../redux/favorites/favoritesSlice";
import { selectCartItemCount } from "../../redux/cart/cartSlice";

// components
import IconWithNumber from "../icon-with-number/icon-with-number.component";

// icons
import { GiShoppingCart } from "react-icons/gi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";

// style
import styles from "./top-nav.module.scss";

// constants
import { TopNavLinks, UserTypeConstants } from "../../utils/constants.js";

function TopNav({ onSelectedChange, showTopNav }) {
  const history = useHistory();
  const { t } = useTranslation();
  const allFavorites = useSelector(selectFavorites);

  const user = useSelector(selectUser);
  const total = useSelector(selectCartItemCount);

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
        <Link
          to={{
            pathname: "/medicines",
            state: {
              companyId: null,
              warehouseId: null,
            },
          }}
          className={[
            styles.link,
            history.location.pathname === "/medicines" ? styles.selected : null,
          ].join(" ")}
          onClick={() => onSelectedChange(TopNavLinks.MEDICINES)}
        >
          {t("nav-medicines")}
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
              allFavorites.favorites_partners.length +
              allFavorites.favorites_items.length
            }
            fillIcon={<AiFillStar size={20} />}
            noFillIcon={<AiOutlineStar size={20} />}
          />
        </Link>
        {user.type !== UserTypeConstants.ADMIN && (
          <Link
            to="/notifications"
            className={[
              styles.link,
              history.location.pathname === "/notifications"
                ? styles.selected
                : null,
            ].join(" ")}
            onClick={() => onSelectedChange(TopNavLinks.NOTIFICATIONS)}
          >
            <IconWithNumber
              value={10}
              fillIcon={<IoMdNotifications size={20} />}
              noFillIcon={<IoMdNotificationsOutline size={20} />}
            />
          </Link>
        )}
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
              fillIcon={<GiShoppingCart size={20} />}
              noFillIcon={<GiShoppingCart size={20} />}
            />
            {/* <GiShoppingCart size={20} /> */}
          </Link>
        )}

        <p className={styles.link}>{user.name}</p>
        <div
          style={{
            backgroundImage:
              user.logo_url !== ""
                ? `url('http://localhost:8000/${user.logo_url}')`
                : 'url("http://localhost:8000/avatar01.png',
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
          className={styles.profile_img}
        ></div>
      </div>
    </div>
  );
}

export default TopNav;
