import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
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
import {
  selectSettings,
  updateSettings,
} from "../../redux/settings/settingsSlice";

// components
import Header from "../../components/header/header.component";
import Icon from "../../components/action-icon/action-icon.component";
import CompaniesSectionOneSettings from "../../components/companies-section-one-settings/companies-section-one-settings.component";
import CompaniesSectionTwoSettings from "../../components/companies-section-two-settings/companies-section-two-settings.component";
import ItemsSectionThreeSettings from "../../components/items-section-three-settings/items-section-three-settings.component";
import ItemsSectionOneSettings from "../../components/items-section-one-settings/items-section-one-settings.component";
import ItemsSectionTwoSettings from "../../components/items-section-two-settings/items-section-two-settings.component";
import WarehousesSectionOneSettings from "../../components/warehouses-section-one-settings/warehouses-section-one-settings.component";
import SettingCheckbox from "../../components/setting-checkbox/setting-checkbox.component";
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
  const {
    settings: { showWarehouseItem, showAdvertisements, saveOrders },
  } = useSelector(selectSettings);

  const changeShowWarehouseItemSettingHandler = () =>
    dispatch(
      updateSettings({
        token,
        obj: {
          showWarehouseItem: !showWarehouseItem,
        },
      })
    );

  const changeShowAdvertisementSettingHandler = () =>
    dispatch(
      updateSettings({
        token,
        obj: {
          showAdvertisements: !showAdvertisements,
        },
      })
    );

  const changeSaveOrdersSettingHandler = () =>
    dispatch(
      updateSettings({
        token,
        obj: {
          saveOrders: !saveOrders,
        },
      })
    );

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
  }, []);

  return user && user.type === UserTypeConstants.ADMIN ? (
    <>
      <Header>
        <h2>{t("nav-settings")}</h2>
        <div className={generalStyles.refresh_icon}>
          <Icon
            selected={false}
            foreColor={Colors.WHITE_COLOR}
            tooltip={t("refresh-tooltip")}
            onclick={refreshHandler}
            icon={() => <RiRefreshLine />}
          />
        </div>
      </Header>
      <div className={generalStyles.container_with_header}>
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
        <SettingCheckbox
          label={t("show-warehouse-items-permission")}
          value={showWarehouseItem}
          action={changeShowWarehouseItemSettingHandler}
        />
        <SettingCheckbox
          label={t("show-advertisement-on-home-page")}
          value={showAdvertisements}
          action={changeShowAdvertisementSettingHandler}
        />
        <SettingCheckbox
          label={t("save-orders-in-database-permission")}
          value={saveOrders}
          action={changeSaveOrdersSettingHandler}
        />
      </div>
      {status === "loading" && <ActionLoader />}
    </>
  ) : (
    <Redirect to="/signin" />
  );
}

export default SettingsPage;
