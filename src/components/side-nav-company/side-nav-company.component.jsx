import React, { memo } from "react";
import { useTranslation } from "react-i18next";

// icons
import { GiMedicines } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";

// components
import CustomLink from "../custom-link/custom-link.component.jsx";

function SideNavCompany({ hideMenu }) {
  const { t } = useTranslation();

  return (
    <>
      <CustomLink
        icon={() => <GiMedicines size={24} />}
        to="/items"
        text={t("items")}
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

export default memo(SideNavCompany);
