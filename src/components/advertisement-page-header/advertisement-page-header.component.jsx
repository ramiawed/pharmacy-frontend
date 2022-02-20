import React from "react";
import { useTranslation } from "react-i18next";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { getAllAdvertisements } from "../../redux/advertisements/advertisementsSlice";
import { selectToken } from "../../redux/auth/authSlice";

// icons
import { RiRefreshLine } from "react-icons/ri";
import { MdAddCircle } from "react-icons/md";

// components
import Icon from "../action-icon/action-icon.component";
import Header from "../header/header.component";

// styles
import generalStyles from "../../style.module.scss";

// constants
import { Colors } from "../../utils/constants";

function AdvertisementPageHeader({ isNew, setIsNew }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const token = useSelector(selectToken);

  const refreshHandler = () => {
    dispatch(getAllAdvertisements({ token }));
  };

  return (
    <>
      <Header>
        <h2>{t("nav-advertise")}</h2>
        {isNew && (
          <div
            style={{
              position: "absolute",
              top: "16px",
              left: "42px",
            }}
          >
            <Icon
              selected={false}
              foreColor={Colors.SECONDARY_COLOR}
              tooltip={t("refresh-tooltip")}
              onclick={() => {
                refreshHandler();
              }}
              icon={() => <RiRefreshLine />}
            />
          </div>
        )}
      </Header>
      <div
        className={[generalStyles.actions, generalStyles.margin_v_4].join(" ")}
      >
        {!isNew && (
          <>
            <Icon
              selected={false}
              foreColor={Colors.SECONDARY_COLOR}
              tooltip={t("new-advertisement")}
              onclick={() => {
                setIsNew(true);
              }}
              icon={() => <MdAddCircle size={20} />}
              withBackground={true}
            />
            {/* Refresh */}
            <Icon
              selected={false}
              foreColor={Colors.SECONDARY_COLOR}
              tooltip={t("refresh-tooltip")}
              onclick={() => {
                refreshHandler();
              }}
              icon={() => <RiRefreshLine />}
              withBackground={true}
            />
          </>
        )}
      </div>
    </>
  );
}

export default AdvertisementPageHeader;
