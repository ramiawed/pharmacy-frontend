import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

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
  const history = useHistory();
  const dispatch = useDispatch();

  const token = useSelector(selectToken);

  const refreshHandler = () => {
    dispatch(resetNotifications());
    dispatch(getAllNotifications({ token }));
  };

  return (
    <Header>
      <h2>{t("nav-notifications")}</h2>

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
          }}
          icon={() => <RiRefreshLine />}
        />
      </div>
    </Header>
  );
}

export default AdminNotificationsHeader;