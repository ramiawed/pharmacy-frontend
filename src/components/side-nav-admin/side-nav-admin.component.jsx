import React from "react";
import { useTranslation } from "react-i18next";

// components
import CustomLink from "../custom-link/custom-link.component";

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
import { useSelector } from "react-redux";

// constants
import { SideNavLinks } from "../../utils/constants.js";

function SideNavAdmin({ hideMenu }) {
  const { t } = useTranslation();

  // selectors
  const {
    settings: { saveOrders },
  } = useSelector(selectSettings);

  return (
    <>
      <CustomLink
        icon={() => <HiUsers size={24} />}
        to="/admin/partners"
        text={t(SideNavLinks.PARTNERS)}
        onClickHandler={() => hideMenu()}
      />

      <CustomLink
        icon={() => <GiMedicines size={24} />}
        to="/items"
        text={t("items")}
        onClickHandler={() => hideMenu()}
      />

      {saveOrders && (
        <CustomLink
          icon={() => <BsFillEnvelopeFill size={24} />}
          to="/orders"
          text={t("orders")}
          onClickHandler={() => hideMenu()}
        />
      )}

      <CustomLink
        icon={() => <BsBasket2Fill size={24} />}
        to="/baskets"
        text={t("baskets")}
        onClickHandler={() => hideMenu()}
      />

      <CustomLink
        icon={() => <BsFillBarChartLineFill size={24} />}
        to="/admin/statistics"
        text={t("statistics")}
        onClickHandler={() => hideMenu()}
      />

      <CustomLink
        icon={() => <RiAdvertisementFill size={24} />}
        to="/admin/advertisements"
        text={t("advertisements")}
        onClickHandler={() => hideMenu()}
      />

      <CustomLink
        icon={() => <MdNotificationsActive size={24} />}
        to="/admin/notifications"
        text={t("notifications")}
        onClickHandler={() => hideMenu()}
      />

      <CustomLink
        icon={() => <MdOutlineSettings size={24} />}
        to="/admin/settings"
        text={t("settings")}
        onClickHandler={() => hideMenu()}
      />

      <CustomLink
        icon={() => <MdBackup size={24} />}
        to="/admin/backup-restore"
        text={t("backup and restore")}
        onClickHandler={() => hideMenu()}
      />

      <CustomLink
        icon={() => <CgProfile size={24} />}
        to="/profile"
        text={t("profile")}
        onClickHandler={() => hideMenu()}
      />
    </>
  );
}

export default SideNavAdmin;
