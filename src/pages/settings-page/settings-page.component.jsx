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
import WarehousesSectionOneSettings from "../../components/warehouses-section-one-settings/warehouses-section-one-settings.component";
import CompaniesSectionOneSettings from "../../components/companies-section-one-settings/companies-section-one-settings.component";
import CompaniesSectionTwoSettings from "../../components/companies-section-two-settings/companies-section-two-settings.component";
import ItemsSectionThreeSettings from "../../components/items-section-three-settings/items-section-three-settings.component";
import ItemsSectionOneSettings from "../../components/items-section-one-settings/items-section-one-settings.component";
import ItemsSectionTwoSettings from "../../components/items-section-two-settings/items-section-two-settings.component";
import MainContentContainer from "../../components/main-content-container/main-content-container.component";
import { default as ActionLoader } from "../../components/action-loader/action-loader.component";

// constants
import { Colors, UserTypeConstants } from "../../utils/constants";
import Checkbox from "../../components/checkbox/checkbox.component";
import { useTheme } from "../../contexts/themeContext";

function SettingsPage() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { status } = useSelector(selectSettings);
  const { user, token } = useSelector(selectUserData);
  const {
    settings: { showWarehouseItem, showAdvertisements },
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
  }, []);

  return user && user.type === UserTypeConstants.ADMIN ? (
    <>
      <MainContentContainer>
        <Header title="settings" refreshHandler={refreshHandler} />
        <div className="px-4">
          <CompaniesSectionOneSettings />
          <CompaniesSectionTwoSettings />
          <WarehousesSectionOneSettings />
          <ItemsSectionOneSettings />
          <ItemsSectionTwoSettings />
          <ItemsSectionThreeSettings />

          <div className="flex flex-col items-start gap-1 m-2 max-w-fit">
            <p
              className={`${
                theme === "light" ? "text-red" : "text-color-primary-600"
              } text-lg bold `}
            >
              {t("general settings")}
            </p>

            <Checkbox
              check={showWarehouseItem}
              clickHandler={changeShowWarehouseItemSettingHandler}
              label={t("show warehouse items permission")}
              classname={`${
                theme === "light"
                  ? "bg-dark text-white"
                  : "d-mixed100-primary300"
              }`}
              labelClassname={`${
                theme === "light" ? "text-dark" : "text-color-primary-300"
              }`}
            />

            <Checkbox
              check={showAdvertisements}
              clickHandler={changeShowAdvertisementSettingHandler}
              label={t("show advertisement on home page")}
              classname={`${
                theme === "light"
                  ? "bg-dark text-white"
                  : "d-mixed100-primary300"
              }`}
              labelClassname={`${
                theme === "light" ? "text-dark" : "text-color-primary-300"
              }`}
            />
          </div>
        </div>
      </MainContentContainer>
      {status === "loading" && <ActionLoader />}
    </>
  ) : (
    <Redirect to="/signin" />
  );
}

export default SettingsPage;
