import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

// styles
import styles from "./side-nav.module.scss";

function SideNav() {
  const [optionSelected, setOptionSelected] = useState("PARTNERS");
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
            optionSelected === "PARTNERS" ? `${styles.selected}` : "",
          ].join(" ")}
          onClick={() => {
            handleChangeOption("PARTNERS");
          }}
          to="/admin/companies"
        >
          {t("partners")}
        </Link>

        <Link
          className={[
            styles.link,
            optionSelected === "ITEMS" ? `${styles.selected}` : "",
          ].join(" ")}
          onClick={() => {
            handleChangeOption("ITEMS");
          }}
          to="/admin/items"
        >
          {t("nav-items")}
        </Link>
        <Link
          className={[
            styles.link,
            optionSelected === "ORDERS" ? `${styles.selected}` : "",
          ].join(" ")}
          onClick={() => {
            handleChangeOption("ORDERS");
          }}
          to="/admin/orders"
        >
          {t("nav-orders")}
        </Link>
        <Link
          className={[
            styles.link,
            optionSelected === "ADVERTISEMENTS" ? `${styles.selected}` : "",
          ].join(" ")}
          onClick={() => {
            handleChangeOption("ADVERTISEMENTS");
          }}
          to="/admin/advertises"
        >
          {t("nav-advertise")}
        </Link>
        <Link
          className={[
            styles.link,
            optionSelected === "OFFERS" ? `${styles.selected}` : "",
          ].join(" ")}
          onClick={() => {
            handleChangeOption("OFFERS");
          }}
          to="/admin/offers"
        >
          {t("nav-offers")}
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
