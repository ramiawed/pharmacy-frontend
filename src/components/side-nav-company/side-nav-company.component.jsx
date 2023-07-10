import React from "react";
import { Link, useHistory } from "react-router-dom";
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

function SideNavCompany({ hideMenu }) {
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

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
        //       company: user,
        //       warehouse: null,
        //       role: UserTypeConstants.COMPANY,
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
        <label className={styles.tooltip}>{t("nav items")}</label>
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
        <label className={styles.tooltip}>{t("nav profile")}</label>
      </Link>
    </>
  );
}

export default SideNavCompany;
