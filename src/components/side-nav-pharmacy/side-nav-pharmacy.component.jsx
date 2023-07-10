import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

// styles
import styles from "../side-nav.module.scss";

// constants
import { SideNavLinks } from "../../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { selectSettings } from "../../redux/settings/settingsSlice";
import { CgProfile } from "react-icons/cg";
import { BsFillBookmarkPlusFill, BsFillEnvelopeFill } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";

// redux stuff
import {
  setSearchCompanyId,
  setSearchWarehouseId,
} from "../../redux/medicines/medicinesSlices";
import { orderSliceSignOut } from "../../redux/orders/ordersSlice";

function SideNavPharmacy({ hideMenu }) {
  const history = useHistory();
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
            history.location.pathname === "/orders" ? `${styles.selected}` : "",
          ].join(" ")}
          // onClick={() => {
          //   onSelectedChange(SideNavLinks.ORDERS);
          //   dispatch(orderSliceSignOut());
          //   dispatch(setSearchWarehouseId(null));
          //   dispatch(setSearchCompanyId(null));
          // }}
          to="/orders"
          onClick={() => hideMenu()}
        >
          <BsFillEnvelopeFill size={24} />
          <label className={styles.tooltip}>{t("my orders")}</label>
        </Link>
      )}

      <Link
        className={[
          styles.link,
          history.location.pathname === "/saved-items"
            ? `${styles.selected}`
            : "",
        ].join(" ")}
        // onClick={() => {
        //   onSelectedChange(SideNavLinks.SAVEDITEMS);
        //   dispatch(setSearchWarehouseId(null));
        //   dispatch(setSearchCompanyId(null));
        // }}
        to="/saved-items"
        onClick={() => hideMenu()}
      >
        <BsFillBookmarkPlusFill size={24} />
        <label className={styles.tooltip}>{t("saved items")}</label>
      </Link>

      <Link
        className={[
          styles.link,
          history.location.pathname === "/my-points"
            ? `${styles.selected}`
            : "",
        ].join(" ")}
        // onClick={() => {
        //   onSelectedChange(SideNavLinks.MY_POINTS);
        //   dispatch(setSearchWarehouseId(null));
        //   dispatch(setSearchCompanyId(null));
        // }}
        to="/my-points"
        onClick={() => hideMenu()}
      >
        <GiMoneyStack size={24} />
        <label className={styles.tooltip}>{t("my points")}</label>
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

export default SideNavPharmacy;
