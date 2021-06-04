import React from "react";
import { useTranslation } from "react-i18next";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { VscClose } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { SideNavLinks } from "../../utils/constants";

// styles
import styles from "./side-nav.module.scss";

function SideNav({
  collapsed,
  onCollapsedChange,
  selectedOption,
  onSelectedChange,
}) {
  const { t } = useTranslation();

  return (
    <div
      className={[
        styles.side_nav_container,
        `${collapsed ? styles.collapsed : styles.showed}`,
      ].join(" ")}
    >
      <div className={styles.close_icon} onClick={onCollapsedChange}>
        <VscClose size={32} />
      </div>
      <div
        style={{
          backgroundImage: 'url("http://localhost:8000/avatar01.png',
        }}
        className={styles.profile_img}
      ></div>
      <div className={styles.links}>
        <Link
          className={[
            styles.link,
            selectedOption === SideNavLinks.PARTNERS
              ? `${styles.selected}`
              : "",
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
          to="/admin/items"
        >
          {t("nav-items")}
        </Link>
        <Link
          className={[
            styles.link,
            selectedOption === SideNavLinks.OFFERS ? `${styles.selected}` : "",
          ].join(" ")}
          onClick={() => {
            onSelectedChange(SideNavLinks.OFFERS);
          }}
          to="/admin/orders"
        >
          {t("nav-orders")}
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
            selectedOption === SideNavLinks.PROFILE ? `${styles.selected}` : "",
          ].join(" ")}
          onClick={() => {
            onSelectedChange(SideNavLinks.PROFILE);
          }}
          to="/profile"
        >
          {t("nav-profile")}
        </Link>
      </div>
      <button onClick={() => onCollapsedChange()}>
        {collapsed ? (
          <FaChevronLeft
            className={[
              styles.icon,
              `${collapsed ? styles.icon_collapsed : styles.icon_showed}`,
            ].join(" ")}
          />
        ) : (
          <FaChevronRight
            className={[
              styles.icon,
              `${collapsed ? styles.icon_collapsed : styles.icon_showed}`,
            ].join(" ")}
          />
        )}
      </button>
    </div>
  );
}

export default SideNav;
