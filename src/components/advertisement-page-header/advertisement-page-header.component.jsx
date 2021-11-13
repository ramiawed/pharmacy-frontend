import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { RiRefreshLine } from "react-icons/ri";
import { useHistory } from "react-router";

// components
import Icon from "../action-icon/action-icon.component";

// styles
import generalStyles from "../../style.module.scss";
// constants
import { Colors } from "../../utils/constants";
import { useTranslation } from "react-i18next";
import Header from "../header/header.component";

function AdvertisementPageHeader() {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <Header>
      <h2>{t("nav-advertise")}</h2>

      <div
        className={[generalStyles.actions, generalStyles.margin_v_4].join(" ")}
      >
        {/* Refresh */}
        <Icon
          selected={false}
          foreColor={Colors.SECONDARY_COLOR}
          tooltip={t("refresh-tooltip")}
          onclick={() => {
            // refreshHandler();
            // dispatch(changeShowFavorites(false));
          }}
          icon={() => <RiRefreshLine />}
        />

        {/* go back */}
        <Icon
          tooltip={t("go-back")}
          onclick={() => {
            history.goBack();
          }}
          icon={() => <IoMdArrowRoundBack size={20} />}
          foreColor={Colors.SECONDARY_COLOR}
        />
      </div>
    </Header>
  );
}

export default AdvertisementPageHeader;
