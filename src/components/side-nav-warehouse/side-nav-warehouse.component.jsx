import React, { memo } from "react";
import { useTranslation } from "react-i18next";

// redux stuff
import { useSelector } from "react-redux";
import { selectSettings } from "../../redux/settings/settingsSlice";

// components
import CustomLink from "../custom-link/custom-link.component";

// icons
import { BsBasket2Fill, BsFillEnvelopeFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { GiMedicines } from "react-icons/gi";

function SideNavWarehouse({ hideMenu }) {
  const { t } = useTranslation();

  const {
    settings: { saveOrders },
  } = useSelector(selectSettings);

  return (
    <>
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
          text={t("my orders")}
          onClickHandler={() => hideMenu()}
        />
      )}

      <CustomLink
        icon={() => <BsBasket2Fill size={24} />}
        to="/baskets"
        text={t("my baskets")}
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

export default memo(SideNavWarehouse);
