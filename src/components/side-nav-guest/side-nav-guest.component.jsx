import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

// styles
import styles from "../side-nav.module.scss";

// constants
import { SideNavLinks } from "../../utils/constants.js";
import { CgProfile } from "react-icons/cg";
import { useDispatch } from "react-redux";
import {
  setSearchCompanyId,
  setSearchWarehouseId,
} from "../../redux/medicines/medicinesSlices";

function SideNavGuest({ hideMenu }) {
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <>
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

export default SideNavGuest;
