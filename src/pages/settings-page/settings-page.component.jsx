import React, { useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import { getCompaniesSectionOne } from "../../redux/advertisements/companiesSectionOneSlice";
import { getCompaniesSectionTwo } from "../../redux/advertisements/companiesSectionTwoSlice";
import { getItemsSectionOne } from "../../redux/advertisements/itemsSectionOneSlice";
import { getItemsSectionTwo } from "../../redux/advertisements/itemsSectionTwoSlice";
import { getItemsSectionThree } from "../../redux/advertisements/itemsSectionThreeSlice";
import { getWarehousesSectionOne } from "../../redux/advertisements/warehousesSectionOneSlice";
import { selectSettings } from "../../redux/settings/settingsSlice";

// components
import Header from "../../components/header/header.component";
import Icon from "../../components/action-icon/action-icon.component";
import CompaniesSectionOneSettings from "../../components/companies-section-one-settings/companies-section-one-settings.component";
import CompaniesSectionTwoSettings from "../../components/companies-section-two-settings/companies-section-two-settings.component";
import ItemsSectionThreeSettings from "../../components/items-section-three-settings/items-section-three-settings.component";
import ItemsSectionOneSettings from "../../components/items-section-one-settings/items-section-one-settings.component";
import ItemsSectionTwoSettings from "../../components/items-section-two-settings/items-section-two-settings.component";
import ShowWarehouseItemsSetting from "../../components/show-warehouse-items-setting/show-warehouse-items-setting.component";
import SaveOrdersSettings from "../../components/save-orders-setting/save-orders-setting.component";
import WarehousesSectionOneSettings from "../../components/warehouses-section-one-settings/warehouses-section-one-settings.component";
import ShowAdvertisementsSettings from "../../components/show-advertisements-setting/show-advertisements-setting.component";

import { default as ActionLoader } from "../../components/action-loader/action-loader.component";

// icons
import { RiRefreshLine } from "react-icons/ri";

// styles
import generalStyles from "../../style.module.scss";

// constants
import { Colors, UserTypeConstants } from "../../utils/constants";

function SettingsPage({ onSelectedChange }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { status } = useSelector(selectSettings);
  const { user, token } = useSelector(selectUserData);

  const refreshHandler = () => {
    dispatch(getCompaniesSectionOne({ token }));
    dispatch(getCompaniesSectionTwo({ token }));
    dispatch(getItemsSectionOne({ token }));
    dispatch(getItemsSectionTwo({ token }));
    dispatch(getItemsSectionThree({ token }));
    dispatch(getWarehousesSectionOne({ token }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    onSelectedChange();
  }, [dispatch]);

  return user && user.type === UserTypeConstants.ADMIN ? (
    <>
      <div className={generalStyles.container}>
        <Header>
          <h2>{t("nav-settings")}</h2>
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
              onclick={refreshHandler}
              icon={() => <RiRefreshLine />}
            />
          </div>
        </Header>
        <CompaniesSectionOneSettings />
        <CompaniesSectionTwoSettings />
        <WarehousesSectionOneSettings />
        <ItemsSectionOneSettings />
        <ItemsSectionTwoSettings />
        <ItemsSectionThreeSettings />
        <div>
          <h3 style={{ color: Colors.FAILED_COLOR }}>
            {t("general-settings")}
          </h3>
        </div>
        <ShowWarehouseItemsSetting />
        <ShowAdvertisementsSettings />
        <SaveOrdersSettings />
      </div>
      {status === "loading" && <ActionLoader />}
    </>
  ) : (
    <Redirect to="/signin" />
  );
}

export default SettingsPage;