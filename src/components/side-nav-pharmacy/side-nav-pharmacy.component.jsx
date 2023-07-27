import React, { memo } from "react";
import { useTranslation } from "react-i18next";

// redux stuff
import { useSelector } from "react-redux";
import { selectSettings } from "../../redux/settings/settingsSlice";

// icons
import { CgProfile } from "react-icons/cg";
import { BsFillBookmarkPlusFill, BsFillEnvelopeFill } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";

// components
import CustomLink from "../custom-link/custom-link.component";

function SideNavPharmacy({ hideMenu }) {
  const { t } = useTranslation();
  const {
    settings: { saveOrders },
  } = useSelector(selectSettings);

  return (
    <>
      {saveOrders && (
        <CustomLink
          icon={() => <BsFillEnvelopeFill size={24} />}
          to="/orders"
          text={t("orders")}
          onClickHandler={() => hideMenu()}
        />
      )}

      <CustomLink
        icon={() => <BsFillBookmarkPlusFill size={24} />}
        to="/saved-items"
        text={t("saved items")}
        onClickHandler={() => hideMenu()}
      />

      <CustomLink
        icon={() => <GiMoneyStack size={24} />}
        to="/my-points"
        text={t("my points")}
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

export default memo(SideNavPharmacy);
