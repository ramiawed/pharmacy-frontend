import React, { useEffect } from "react";
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
import { MdAddCircle, MdPowerSettingsNew } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllAdvertisements } from "../../redux/advertisements/advertisementsSlice";
import { selectToken } from "../../redux/auth/authSlice";

function AdvertisementPageHeader({ isNew, setIsNew }) {
  const { t } = useTranslation();
  const history = useHistory();
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const refreshHandler = () => {
    dispatch(getAllAdvertisements({ token }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Header>
      <h2>{t("nav-advertise")}</h2>

      <div
        className={[generalStyles.actions, generalStyles.margin_v_4].join(" ")}
      >
        {!isNew && (
          <Icon
            selected={false}
            foreColor={Colors.SECONDARY_COLOR}
            tooltip={t("new-advertisement")}
            onclick={() => {
              setIsNew(true);
            }}
            icon={() => <MdAddCircle size={20} />}
          />
        )}

        {/* Refresh */}
        <Icon
          selected={false}
          foreColor={Colors.SECONDARY_COLOR}
          tooltip={t("refresh-tooltip")}
          onclick={() => {
            refreshHandler();
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
