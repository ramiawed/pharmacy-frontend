import React from "react";
import { useTranslation } from "react-i18next";

// icons
import { MdAddCircle } from "react-icons/md";
import { RiRefreshLine } from "react-icons/ri";

// components
import Header from "../header/header.component";
import Icon from "../action-icon/action-icon.component";

// styles
import generalStyles from "../../style.module.scss";

// constants
import { Colors } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllNotifications,
  resetNotifications,
} from "../../redux/notifications/notificationsSlice";
import { selectToken } from "../../redux/auth/authSlice";

function AdminNotificationsHeader({ isNew, setIsNew }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const token = useSelector(selectToken);

  const refreshHandler = () => {
    dispatch(resetNotifications());
    dispatch(getAllNotifications({ token }));
  };

  return (
    <>
      <Header>
        <h2>{t("nav-notifications")}</h2>
      </Header>
      <div
        className={[generalStyles.actions, generalStyles.margin_v_4].join(" ")}
      >
        {!isNew && (
          <>
            <Icon
              selected={false}
              foreColor={Colors.GREY_COLOR}
              tooltip={t("new-advertisement")}
              onclick={() => {
                setIsNew(true);
              }}
              icon={() => <MdAddCircle size={20} />}
              withBackground={true}
            />

            <Icon
              selected={false}
              foreColor={Colors.GREY_COLOR}
              tooltip={t("refresh-tooltip")}
              onclick={() => {
                refreshHandler();
              }}
              icon={() => <RiRefreshLine />}
              withBackground={true}
            />
          </>
        )}

        {/* Refresh */}
      </div>
    </>
  );
}

export default AdminNotificationsHeader;
