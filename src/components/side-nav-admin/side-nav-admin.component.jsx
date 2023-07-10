import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

// icons
import { HiUsers } from "react-icons/hi";
import { GiMedicines } from "react-icons/gi";
import { RiAdvertisementFill } from "react-icons/ri";
import {
  MdBackup,
  MdNotificationsActive,
  MdOutlineSettings,
} from "react-icons/md";
import {
  BsFillEnvelopeFill,
  BsFillBarChartLineFill,
  BsBasket2Fill,
} from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

// react redux
import { selectSettings } from "../../redux/settings/settingsSlice";
import { useDispatch, useSelector } from "react-redux";
import { resetPageState, setPageState } from "../../redux/items/itemsSlices";
import {
  setSearchCompanyId,
  setSearchWarehouseId,
} from "../../redux/medicines/medicinesSlices";
import { orderSliceSignOut, setRefresh } from "../../redux/orders/ordersSlice";

// styles
import styles from "../side-nav.module.scss";

// constants
import { SideNavLinks, UserTypeConstants } from "../../utils/constants.js";

function SideNavAdmin({ hideMenu }) {
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const {
    settings: { saveOrders },
  } = useSelector(selectSettings);

  return (
    <>
      <Link
        className={[
          styles.link,
          history.location.pathname === "/admin/partners"
            ? `${styles.selected}`
            : "",
        ].join(" ")}
        onClick={() => hideMenu()}
        // onClick={() => {
        //   onSelectedChange(SideNavLinks.PARTNERS);
        //   dispatch(setSearchWarehouseId(null));
        //   dispatch(setSearchCompanyId(null));
        // }}
        to="/admin/partners"
      >
        <HiUsers size={24} />
        <label className={styles.tooltip}>{t(SideNavLinks.PARTNERS)}</label>
      </Link>

      <Link
        className={[
          styles.link,
          history.location.pathname === "/items" ? `${styles.selected}` : "",
        ].join(" ")}
        // onClick={() => {
        //   onSelectedChange(SideNavLinks.ITEMS);
        //   dispatch(resetPageState());
        //   dispatch(
        //     setPageState({
        //       company: null,
        //       warehouse: null,
        //       role: UserTypeConstants.ADMIN,
        //     })
        //   );
        //   dispatch(setSearchWarehouseId(null));
        //   dispatch(setSearchCompanyId(null));
        // }}
        to={{
          pathname: "/items",
        }}
        onClick={() => hideMenu()}
      >
        <GiMedicines size={24} />
        <label className={styles.tooltip}>{t("items")}</label>
      </Link>

      {saveOrders && (
        <Link
          className={[
            styles.link,
            history.location.pathname === "/orders" ? `${styles.selected}` : "",
          ].join(" ")}
          // onClick={() => {
          //   onSelectedChange(SideNavLinks.ORDERS);
          //   dispatch(setRefresh(true));
          //   dispatch(orderSliceSignOut());
          //   dispatch(setSearchWarehouseId(null));
          //   dispatch(setSearchCompanyId(null));
          // }}
          to="/orders"
          onClick={() => hideMenu()}
        >
          <BsFillEnvelopeFill size={24} />
          <label className={styles.tooltip}>{t("orders")}</label>
        </Link>
      )}

      <Link
        className={[
          styles.link,
          history.location.pathname === "/baskets" ? `${styles.selected}` : "",
        ].join(" ")}
        // onClick={() => {
        //   onSelectedChange(SideNavLinks.BASKETS);
        //   dispatch(setSearchWarehouseId(null));
        //   dispatch(setSearchCompanyId(null));
        // }}
        to="/baskets"
        onClick={() => hideMenu()}
      >
        <BsBasket2Fill size={24} />
        <label className={styles.tooltip}>{t("baskets")}</label>
      </Link>

      <Link
        className={[
          styles.link,
          history.location.pathname === "/admin/statistics"
            ? `${styles.selected}`
            : "",
        ].join(" ")}
        // onClick={() => {
        //   // onSelectedChange(SideNavLinks.STATISTICS);
        //   // dispatch(setSearchWarehouseId(null));
        //   // dispatch(setSearchCompanyId(null));
        //   // dispatch(setSelectedWarehouse(null));
        // }}
        to="/admin/statistics"
        onClick={() => hideMenu()}
      >
        <BsFillBarChartLineFill size={24} />
        <label className={styles.tooltip}>{t("statistics")}</label>
      </Link>

      <Link
        className={[
          styles.link,
          history.location.pathname === "/admin/advertisements"
            ? `${styles.selected}`
            : "",
        ].join(" ")}
        // onClick={() => {
        //   onSelectedChange(SideNavLinks.ADVERTISEMENTS);
        //   dispatch(setSearchWarehouseId(null));
        //   dispatch(setSearchCompanyId(null));
        //   // dispatch(setSelectedWarehouse(null));
        // }}
        to="/admin/advertisements"
        onClick={() => hideMenu()}
      >
        <RiAdvertisementFill size={24} />
        <label className={styles.tooltip}>{t("advertisements")}</label>
      </Link>

      <Link
        className={[
          styles.link,
          history.location.pathname === "/admin/notifications"
            ? `${styles.selected}`
            : "",
        ].join(" ")}
        // onClick={() => {
        //   onSelectedChange(SideNavLinks.NOTIFICATIONS);
        //   dispatch(setSearchWarehouseId(null));
        //   dispatch(setSearchCompanyId(null));
        //   // dispatch(setSelectedWarehouse(null));
        // }}
        to="/admin/notifications"
        onClick={() => hideMenu()}
      >
        <MdNotificationsActive size={24} />
        <label className={styles.tooltip}>{t("notifications")}</label>
      </Link>

      <Link
        className={[
          styles.link,
          history.location.pathname === "/admin/settings"
            ? `${styles.selected}`
            : "",
        ].join(" ")}
        // onClick={() => {
        //   onSelectedChange(SideNavLinks.SETTINGS);
        //   dispatch(setSearchWarehouseId(null));
        //   dispatch(setSearchCompanyId(null));
        // }}
        to="/admin/settings"
        onClick={() => hideMenu()}
      >
        <MdOutlineSettings size={24} />
        <label className={styles.tooltip}>{t("settings")}</label>
      </Link>

      <Link
        className={[
          styles.link,
          history.location.pathname === "/admin/backup-restore"
            ? `${styles.selected}`
            : "",
        ].join(" ")}
        // onClick={() => {
        //   onSelectedChange(SideNavLinks.BACKUP_RESTORE);
        //   dispatch(setSearchWarehouseId(null));
        //   dispatch(setSearchCompanyId(null));
        //   // dispatch(setSelectedWarehouse(null));
        // }}
        to="/admin/backup-restore"
        onClick={() => hideMenu()}
      >
        <MdBackup size={24} />
        <label className={styles.tooltip}>{t("backup and restore")}</label>
      </Link>

      <Link
        className={[
          styles.link,
          history.location.pathname === "/profile" ? `${styles.selected}` : "",
        ].join(" ")}
        // onClick={() => {
        //   onSelectedChange(SideNavLinks.PROFILE);
        //   dispatch(setSearchWarehouseId(null));
        //   dispatch(setSearchCompanyId(null));
        //   // dispatch(setSelectedWarehouse(null));
        // }}
        to="/profile"
        onClick={() => hideMenu()}
      >
        <CgProfile size={24} />
        <label className={styles.tooltip}>{t("profile")}</label>
      </Link>
    </>
  );
}

export default SideNavAdmin;
