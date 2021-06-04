import React from "react";
import { useTranslation } from "react-i18next";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { VscClose } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../../redux/auth/authSlice";
import { SideNavLinks, UserTypeConstants } from "../../utils/constants";
import SideNavAdmin from "../side-nav-admin/side-nav-admin.component";
import SideNavCompany from "../side-nav-company/side-nav-company.component";
import SideNavGuest from "../side-nav-guest/side-nav-guest.component";
import SideNavPharmacy from "../side-nav-pharmacy/side-nav-pharmacy.component";
import SideNavWarehouse from "../side-nav-warehouse/side-nav-warehouse.component";

// styles
import styles from "./side-nav.module.scss";

function SideNav({
  collapsed,
  onCollapsedChange,
  selectedOption,
  onSelectedChange,
}) {
  const { t } = useTranslation();
  const user = useSelector(selectUser);

  return (
    <div
      className={[
        styles.side_nav_container,
        `${collapsed ? styles.collapsed : styles.showed}`,
      ].join(" ")}
    >
      <div className={styles.close_icon} onClick={onCollapsedChange}>
        <VscClose size={32} />
      </div>
      <div
        style={{
          backgroundImage: 'url("http://localhost:8000/avatar01.png',
        }}
        className={styles.profile_img}
      ></div>
      <div className={styles.links}>
        {user.type === UserTypeConstants.ADMIN && (
          <SideNavAdmin
            selectedOption={selectedOption}
            onSelectedChange={onSelectedChange}
          />
        )}
        {user.type === UserTypeConstants.COMPANY && (
          <SideNavCompany
            selectedOption={selectedOption}
            onSelectedChange={onSelectedChange}
          />
        )}
        {user.type === UserTypeConstants.WAREHOUSE && (
          <SideNavWarehouse
            selectedOption={selectedOption}
            onSelectedChange={onSelectedChange}
          />
        )}
        {user.type === UserTypeConstants.PHARMACY && (
          <SideNavPharmacy
            selectedOption={selectedOption}
            onSelectedChange={onSelectedChange}
          />
        )}
        {user.type === UserTypeConstants.GUEST && (
          <SideNavGuest
            selectedOption={selectedOption}
            onSelectedChange={onSelectedChange}
          />
        )}
      </div>
      <button onClick={() => onCollapsedChange()}>
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
