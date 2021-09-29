import React, { useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import { getNewestItems } from "../../redux/advertisements/newestItemsSlice";
import { getMostOrderedItems } from "../../redux/advertisements/mostOrderedItemsSlice";
import { getNewestCompanies } from "../../redux/advertisements/newestCompaniesSlice";
import { getFavoritesItems } from "../../redux/advertisements/favoritesItemsSlice";
import {
  getFavoritesCompanies,
  resetFavoritesCompanies,
} from "../../redux/advertisements/favoritesCompaniesSlice";

// components
import Header from "../../components/header/header.component";
import Icon from "../../components/action-icon/action-icon.component";
import FavoritesCompaniesSettings from "../../components/favorites-companies-settings/favorites-companies-settings.component";
import NewestItemsSettings from "../../components/newest-items-settings/newest-items-settings.component";
import MostOrderedItemsSettings from "../../components/most-ordered-items-settings/most-ordered-items-settings.component";
import FavoritesItemsSettings from "../../components/favorites-items-settings/favorites-items-settings.component";
import NewestCompaniesSettings from "../../components/newest-companies-settings/newest-companies-settings.component";

// icons
import { RiRefreshLine } from "react-icons/ri";
import { IoMdArrowRoundBack } from "react-icons/io";

// styles
import generalStyles from "../../style.module.scss";

// constants
import { Colors, UserTypeConstants } from "../../utils/constants";

function SettingsPage() {
  const { t } = useTranslation();
  const { user, token } = useSelector(selectUserData);
  const history = useHistory();
  const dispatch = useDispatch();

  const refreshHandler = () => {
    dispatch(resetFavoritesCompanies());
    dispatch(getFavoritesCompanies({ token }));
    dispatch(getNewestCompanies({ token }));
    dispatch(getFavoritesItems({ token }));
    dispatch(getNewestItems({ token }));
    dispatch(getMostOrderedItems({ token }));
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
      <FavoritesItemsSettings />
      <NewestItemsSettings />
      <MostOrderedItemsSettings />
    </>
  ) : (
    <Redirect to="/signin" />
  );
}

export default SettingsPage;
