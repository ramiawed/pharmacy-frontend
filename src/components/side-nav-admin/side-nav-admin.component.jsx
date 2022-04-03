import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { HiUsers } from "react-icons/hi";
import { GiMedicines } from "react-icons/gi";
import { RiAdvertisementFill } from "react-icons/ri";
import {
  MdBackup,
  MdNotificationsActive,
  MdOutlineSettings,
} from "react-icons/md";
import { BsFillEnvelopeFill, BsFillBarChartLineFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

// react redux
import { selectSettings } from "../../redux/settings/settingsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  itemsSliceSignOut,
  resetPageState,
  setCompany,
  setRole,
  setWarehouse,
} from "../../redux/items/itemsSlices";
import { selectOrders, setRefresh } from "../../redux/orders/ordersSlice";

// styles
import styles from "../side-nav.module.scss";

// constants
import { SideNavLinks, UserTypeConstants } from "../../utils/constants.js";

function SideNavAdmin({ selectedOption, onSelectedChange, collapsed }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const {
    settings: { saveOrders },
  } = useSelector(selectSettings);
  const { unreadCount } = useSelector(selectOrders);

  return (
    <>
      <div
        style={{
          height: "5px",
        }}
      ></div>
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
        <div className={styles.nav}>
          <div className={styles.nav_icon}>
            <HiUsers size={20} />
            {collapsed && (
              <label className={styles.tooltip}>
                {t(SideNavLinks.PARTNERS)}
              </label>
            )}
          </div>
          {!collapsed && (
            <div className={styles.nav_label}>{t(SideNavLinks.PARTNERS)}</div>
          )}
        </div>
      </Link>
      <Link
        className={[
          styles.link,
          selectedOption === SideNavLinks.ITEMS ? `${styles.selected}` : "",
        ].join(" ")}
        onClick={() => {
          onSelectedChange(SideNavLinks.ITEMS);
          dispatch(resetPageState());
          dispatch(setCompany(null));
          dispatch(setWarehouse(null));
          dispatch(setRole(UserTypeConstants.ADMIN));
        }}
        to={{
          pathname: "/items",
        }}
      >
        <div className={styles.nav}>
          <div className={styles.nav_icon}>
            <GiMedicines size={20} />
            {collapsed && (
              <label className={styles.tooltip}>{t("nav-items")}</label>
            )}
          </div>
          {!collapsed && (
            <div className={styles.nav_label}>{t("nav-items")}</div>
          )}
        </div>
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
        to="/admin/advertisements"
      >
        <div className={styles.nav}>
          <div className={styles.nav_icon}>
            {collapsed && (
              <label className={styles.tooltip}>{t("nav-advertise")}</label>
            )}
            <RiAdvertisementFill size={20} />
          </div>
          {!collapsed && (
            <div className={styles.nav_label}>{t("nav-advertise")}</div>
          )}
        </div>
      </Link>

      <Link
        className={[
          styles.link,
          selectedOption === SideNavLinks.NOTIFICATIONS
            ? `${styles.selected}`
            : "",
        ].join(" ")}
        onClick={() => {
          onSelectedChange(SideNavLinks.NOTIFICATIONS);
        }}
        to="/admin/notifications"
      >
        <div className={styles.nav}>
          <div className={styles.nav_icon}>
            <MdNotificationsActive size={20} />
            {collapsed && (
              <label className={styles.tooltip}>{t("nav-notifications")}</label>
            )}
          </div>
          {!collapsed && (
            <div className={styles.nav_label}>{t("nav-notifications")}</div>
          )}
        </div>
      </Link>

      {saveOrders && (
        <Link
          className={[
            styles.link,
            selectedOption === SideNavLinks.ORDERS ? `${styles.selected}` : "",
          ].join(" ")}
          onClick={() => {
            onSelectedChange(SideNavLinks.ORDERS);
            dispatch(setRefresh(true));
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
          {/* {unreadCount > 0 && (
            <span className={styles.badge}>{unreadCount}</span>
          )} */}
        </Link>
      )}

      <Link
        className={[
          styles.link,
          selectedOption === SideNavLinks.SETTINGS ? `${styles.selected}` : "",
        ].join(" ")}
        onClick={() => {
          onSelectedChange(SideNavLinks.SETTINGS);
        }}
        to="/admin/settings"
      >
        <div className={styles.nav}>
          <div className={styles.nav_icon}>
            <MdOutlineSettings size={20} />
            {collapsed && (
              <label className={styles.tooltip}>{t("nav-settings")}</label>
            )}
          </div>
          {!collapsed && (
            <div className={styles.nav_label}>{t("nav-settings")}</div>
          )}
        </div>
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
        <div className={styles.nav}>
          <div className={styles.nav_icon}>
            <BsFillBarChartLineFill size={20} />
            {collapsed && (
              <label className={styles.tooltip}>{t("nav-statistics")}</label>
            )}
          </div>
          {!collapsed && (
            <div className={styles.nav_label}>{t("nav-statistics")}</div>
          )}
        </div>
      </Link>
      <Link
        className={[
          styles.link,
          selectedOption === SideNavLinks.BACKUP_RESTORE
            ? `${styles.selected}`
            : "",
        ].join(" ")}
        onClick={() => {
          onSelectedChange(SideNavLinks.BACKUP_RESTORE);
        }}
        to="/admin/backup-restore"
      >
        <div className={styles.nav}>
          <div className={styles.nav_icon}>
            <MdBackup size={20} />
            {collapsed && (
              <label className={styles.tooltip}>
                {t("nav-backup-restore")}
              </label>
            )}
          </div>
          {!collapsed && (
            <div className={styles.nav_label}>{t("nav-backup-restore")}</div>
          )}
        </div>
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

export default SideNavAdmin;
