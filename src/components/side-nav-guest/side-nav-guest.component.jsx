import React, { memo } from "react";
import { useTranslation } from "react-i18next";

// constants
import { CgProfile } from "react-icons/cg";

// components
import CustomLink from "../custom-link/custom-link.component";

function SideNavGuest({ hideMenu }) {
  const { t } = useTranslation();

  return (
    <CustomLink
      icon={() => <CgProfile size={24} />}
      to="/profile"
      text={t("profile")}
      onClickHandler={() => hideMenu()}
    />
  );
}

export default memo(SideNavGuest);
