import React, { useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice.js";

// components
import FavoritesItems from "../../components/favorites-items/favorites-items.component";
import MostOrderItems from "../../components/most-order-items/most-order-items.component";
import NewestItems from "../../components/newest-items/newest-items.component";
import Header from "../../components/header/header.component.jsx";

// styles
import generalStyles from "../../style.module.scss";

// constants
import { Colors, UserTypeConstants } from "../../utils/constants.js";
import { RiRefreshLine } from "react-icons/ri";
import { IoMdArrowRoundBack } from "react-icons/io";
import Icon from "../../components/action-icon/action-icon.component.jsx";
import {
  getFavoritesCompanies,
  resetFavoritesCompanies,
} from "../../redux/advertisements/favoritesCompaniesSlice.js";
import { useTranslation } from "react-i18next";
import FavoritesCompaniesSettings from "../../components/favorites-companies-settings/favorites-companies-settings.component.jsx";
import NewestCompaniesSettings from "../../components/newest-companies-settings/newest-companies-settings.component";
import { getNewestCompanies } from "../../redux/advertisements/newestCompaniesSlice";

function SettingsPage() {
  const { t } = useTranslation();
  const { user, token } = useSelector(selectUserData);
  const history = useHistory();
  const dispatch = useDispatch();

  const refreshHandler = () => {
    dispatch(resetFavoritesCompanies());
    dispatch(getFavoritesCompanies({ token }));
    dispatch(getNewestCompanies({ token }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return user && user.type === UserTypeConstants.ADMIN ? (
    <>
      <Header>
        <h2>{t("nav-settings")}</h2>
        <div
          className={[generalStyles.actions, generalStyles.margin_v_4].join(
            " "
          )}
        >
          <Icon
            selected={false}
            foreColor={Colors.SECONDARY_COLOR}
            tooltip={t("refresh-tooltip")}
            onclick={refreshHandler}
            icon={() => <RiRefreshLine />}
          />

          <Icon
            selected={false}
            foreColor={Colors.SECONDARY_COLOR}
            tooltip={t("go-back")}
            onclick={() => {
              history.goBack();
            }}
            icon={() => <IoMdArrowRoundBack size={20} />}
          />
        </div>
      </Header>

      <FavoritesCompaniesSettings />
      <NewestCompaniesSettings />
      <FavoritesItems />
      <NewestItems />
      <MostOrderItems />
    </>
  ) : (
    <Redirect to="/signin" />
  );
}

export default SettingsPage;
