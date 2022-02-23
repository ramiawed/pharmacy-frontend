import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// styles
import styles from "../side-nav.module.scss";

// constants
import { SideNavLinks } from "../../utils/constants.js";
import { useSelector } from "react-redux";
import { selectSettings } from "../../redux/settings/settingsSlice";
import { CgProfile } from "react-icons/cg";
import { BsFillEnvelopeFill } from "react-icons/bs";

function SideNavPharmacy({ selectedOption, onSelectedChange, collapsed }) {
  const { t } = useTranslation();
  const {
    settings: { saveOrders },
  } = useSelector(selectSettings);

  return (
    <>
      {saveOrders && (
        <Link
          className={[
            styles.link,
            selectedOption === SideNavLinks.ORDERS ? `${styles.selected}` : "",
          ].join(" ")}
          onClick={() => {
            onSelectedChange(SideNavLinks.ORDERS);
          }}
          to="/orders"
        >
          <div className={styles.nav}>
            <div className={styles.nav_icon}>
              <BsFillEnvelopeFill size={20} />
              {collapsed && (
                <label className={styles.tooltip}>{t("nav-orders")}</label>
              )}
            </div>
            {!collapsed && (
              <div className={styles.nav_label}>{t("nav-orders")} </div>
            )}
          </div>
        </Link>
      )}
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
        <div className={styles.nav}>
          <div className={styles.nav_icon}>
            <CgProfile size={20} />
            {collapsed && (
              <label className={styles.tooltip}>{t("nav-profile")}</label>
            )}
          </div>
          {!collapsed && (
            <div className={styles.nav_label}>{t("nav-profile")}</div>
          )}
        </div>
      </Link>
    </>
  );
}

export default SideNavPharmacy;
