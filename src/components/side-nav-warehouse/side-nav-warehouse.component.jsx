import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSlice";
import { selectSettings } from "../../redux/settings/settingsSlice";
import { resetPageState, setPageState } from "../../redux/items/itemsSlices";
import {
  setSearchCompanyId,
  setSearchWarehouseId,
} from "../../redux/medicines/medicinesSlices";
import { orderSliceSignOut } from "../../redux/orders/ordersSlice";

// styles
import styles from "../side-nav.module.scss";

// constants
import { SideNavLinks, UserTypeConstants } from "../../utils/constants.js";

// icons
import { BsBasket2Fill, BsFillEnvelopeFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { GiMedicines } from "react-icons/gi";

function SideNavWarehouse({ hideMenu }) {
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const {
    settings: { saveOrders },
  } = useSelector(selectSettings);

  return (
    <>
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
        //       warehouse: user,
        //       role: UserTypeConstants.WAREHOUSE,
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
        <label className={styles.tooltip}>{t("my items")}</label>
      </Link>

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
        <label className={styles.tooltip}>{t("my baskets")}</label>
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

export default SideNavWarehouse;
