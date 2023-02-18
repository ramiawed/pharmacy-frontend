import React from "react";
import { useTranslation } from "react-i18next";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import {
  getAllNotifications,
  resetNotifications,
} from "../../redux/notifications/notificationsSlice";
import { selectToken } from "../../redux/auth/authSlice";

// icons
import { MdAddCircle } from "react-icons/md";
import { RiRefreshLine } from "react-icons/ri";

// components
import ActionBar from "../action-bar/action-bar.component";
import Icon from "../icon/icon.component";
import Header from "../header/header.component";

// constants
import { Colors } from "../../utils/constants";

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
      <Header title="nav-notifications" />
      <ActionBar>
        {!isNew && (
          <>
            <Icon
              selected={false}
              foreColor={Colors.MAIN_COLOR}
              tooltip={t("new-advertisement")}
              onclick={() => {
                setIsNew(true);
              }}
              icon={() => <MdAddCircle size={24} />}
              withBackground={true}
            />

            <Icon
              selected={false}
              foreColor={Colors.MAIN_COLOR}
              tooltip={t("refresh-tooltip")}
              onclick={() => {
                refreshHandler();
              }}
              icon={() => <RiRefreshLine />}
              withBackground={true}
            />
          </>
        )}
      </ActionBar>
    </>
  );
}

export default AdminNotificationsHeader;
