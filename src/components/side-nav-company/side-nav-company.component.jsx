import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// constants
import { SideNavLinks, UserTypeConstants } from "../../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSlice";
import { resetPageState, setPageState } from "../../redux/items/itemsSlices";

// styles
import styles from "../side-nav.module.scss";
import { GiMedicines } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import {
  setSearchCompanyId,
  setSearchWarehouseId,
} from "../../redux/medicines/medicinesSlices.js";

function SideNavCompany({ selectedOption, onSelectedChange, collapsed }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <>
      <Link
        className={[
          styles.link,
          selectedOption === SideNavLinks.ITEMS ? `${styles.selected}` : "",
        ].join(" ")}
        onClick={() => {
          onSelectedChange(SideNavLinks.ITEMS);
          dispatch(resetPageState());
          dispatch(
            setPageState({
              company: user,
              warehouse: null,
              role: UserTypeConstants.COMPANY,
            })
          );

          dispatch(setSearchWarehouseId(null));
          dispatch(setSearchCompanyId(null));
        }}
        to={{
          pathname: "/items",
        }}
      >
        <div className={styles.nav}>
          <div className={styles.nav_icon}>
            <GiMedicines size={24} />
            {collapsed && (
              <label className={styles.tooltip}>{t("nav items")}</label>
            )}
          </div>
          {!collapsed && (
            <div className={styles.nav_label}>{t("nav items")}</div>
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
          // dispatch(setSelectedWarehouse(null));
        }}
        to="/profile"
      >
        <div className={styles.nav}>
          <div className={styles.nav_icon}>
            <CgProfile size={24} />
            {collapsed && (
              <label className={styles.tooltip}>{t("nav profile")}</label>
            )}
          </div>
          {!collapsed && (
            <div className={styles.nav_label}>{t("nav profile")}</div>
          )}
        </div>
      </Link>
    </>
  );
}

export default SideNavCompany;
