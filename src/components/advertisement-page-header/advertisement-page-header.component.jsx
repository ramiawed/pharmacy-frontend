import React from "react";
import { useTranslation } from "react-i18next";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { getAllAdvertisements } from "../../redux/advertisements/advertisementsSlice";
import { selectToken } from "../../redux/auth/authSlice";

// icons
import { MdAddCircle } from "react-icons/md";

// components
import ActionBar from "../action-bar/action-bar.component";
import Header from "../header/header.component";
import Icon from "../icon/icon.component";

// constants
import { Colors } from "../../utils/constants";

function AdvertisementPageHeader({ setIsNew }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const token = useSelector(selectToken);

  const refreshHandler = () => {
    dispatch(getAllAdvertisements({ token }));
  };

  return (
    <>
      <Header title="advertisements" refreshHandler={refreshHandler} />

      <ActionBar>
        <Icon
          selected={false}
          foreColor={Colors.MAIN_COLOR}
          tooltip={t("new")}
          onclick={() => {
            setIsNew(true);
          }}
          icon={() => <MdAddCircle size={24} />}
          withBackground={true}
        />
      </ActionBar>
    </>
  );
}

export default AdvertisementPageHeader;
