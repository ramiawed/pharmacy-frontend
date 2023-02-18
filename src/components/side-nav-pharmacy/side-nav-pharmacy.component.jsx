import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// styles
import styles from "../side-nav.module.scss";

// constants
import { SideNavLinks } from "../../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { selectSettings } from "../../redux/settings/settingsSlice";
import { CgProfile } from "react-icons/cg";
import { BsFillBookmarkPlusFill, BsFillEnvelopeFill } from "react-icons/bs";
import {
  setSearchCompanyId,
  setSearchWarehouseId,
} from "../../redux/medicines/medicinesSlices";
import { orderSliceSignOut } from "../../redux/orders/ordersSlice";

function SideNavPharmacy({ selectedOption, onSelectedChange, collapsed }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
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
            dispatch(orderSliceSignOut());
            dispatch(setSearchWarehouseId(null));
            dispatch(setSearchCompanyId(null));
          }}
          to="/orders"
        >
          <div className={styles.nav}>
            <div className={styles.nav_icon}>
              <BsFillEnvelopeFill size={24} />
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
          selectedOption === SideNavLinks.SAVEDITEMS
            ? `${styles.selected}`
            : "",
        ].join(" ")}
        onClick={() => {
          onSelectedChange(SideNavLinks.SAVEDITEMS);
          dispatch(setSearchWarehouseId(null));
          dispatch(setSearchCompanyId(null));
        }}
        to="/saved-items"
      >
        <div className={styles.nav}>
          <div className={styles.nav_icon}>
            <BsFillBookmarkPlusFill size={24} />
            {collapsed && (
              <label className={styles.tooltip}>{t("saved-items")}</label>
            )}
          </div>
          {!collapsed && (
            <div className={styles.nav_label}>{t("saved-items")} </div>
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
          dispatch(setSearchWarehouseId(null));
          dispatch(setSearchCompanyId(null));
        }}
        to="/profile"
      >
        <div className={styles.nav}>
          <div className={styles.nav_icon}>
            <CgProfile size={24} />
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
