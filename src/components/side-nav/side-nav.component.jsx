import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SideNavLinks } from "../../utils/constants";

// styles
import styles from "./side-nav.module.scss";

function SideNav() {
  const [optionSelected, setOptionSelected] = useState("");
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(true);

  const handleChangeOption = (type) => {
    setOptionSelected(type);
    setCollapsed(true);
  };

  return (
    <div
      className={[
        styles.side_nav_container,
        `${collapsed ? styles.collapsed : styles.showed}`,
      ].join(" ")}
    >
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
            optionSelected === SideNavLinks.PARTNERS
              ? `${styles.selected}`
              : "",
          ].join(" ")}
          onClick={() => {
            handleChangeOption(SideNavLinks.PARTNERS);
          }}
          to="/admin/companies"
        >
          {t(SideNavLinks.PARTNERS)}
        </Link>

        <Link
          className={[
            styles.link,
            optionSelected === SideNavLinks.ITEMS ? `${styles.selected}` : "",
          ].join(" ")}
          onClick={() => {
            handleChangeOption(SideNavLinks.ITEMS);
          }}
          to="/admin/items"
        >
          {t("nav-items")}
        </Link>
        <Link
          className={[
            styles.link,
            optionSelected === SideNavLinks.OFFERS ? `${styles.selected}` : "",
          ].join(" ")}
          onClick={() => {
            handleChangeOption(SideNavLinks.OFFERS);
          }}
          to="/admin/orders"
        >
          {t("nav-orders")}
        </Link>
        <Link
          className={[
            styles.link,
            optionSelected === SideNavLinks.ADVERTISEMENTS
              ? `${styles.selected}`
              : "",
          ].join(" ")}
          onClick={() => {
            handleChangeOption(SideNavLinks.ADVERTISEMENTS);
          }}
          to="/admin/advertises"
        >
          {t("nav-advertise")}
        </Link>
        <Link
          className={[
            styles.link,
            optionSelected === SideNavLinks.OFFERS ? `${styles.selected}` : "",
          ].join(" ")}
          onClick={() => {
            handleChangeOption(SideNavLinks.OFFERS);
          }}
          to="/admin/offers"
        >
          {t("nav-offers")}
        </Link>
        <Link
          className={[
            styles.link,
            optionSelected === SideNavLinks.PROFILE ? `${styles.selected}` : "",
          ].join(" ")}
          onClick={() => {
            handleChangeOption(SideNavLinks.PROFILE);
          }}
          to="/profile"
        >
          {t("nav-profile")}
        </Link>
      </div>
      <button onClick={() => setCollapsed(!collapsed)}>
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
