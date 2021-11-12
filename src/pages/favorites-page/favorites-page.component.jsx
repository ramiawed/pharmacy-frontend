// this page display the favorite companies, warehouses, items
// depends on the favoritesSlice

// favoritesSlice contains
// 1- favorites
// 2- favorites_items

import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Redirect, useHistory } from "react-router-dom";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import {
  resetFavorites,
  getFavorites,
  selectFavorites,
} from "../../redux/favorites/favoritesSlice";
import { selectUserData } from "../../redux/auth/authSlice";

// components
import CardInfo from "../../components/card-info/card-info.component";
import Header from "../../components/header/header.component";
import PartnerRow from "../../components/partner-row/partner-row.component";

// styles
import generalStyles from "../../style.module.scss";

// constants
import { Colors, UserTypeConstants } from "../../utils/constants.js";
import Icon from "../../components/action-icon/action-icon.component";
import { RiRefreshLine } from "react-icons/ri";
import { IoMdArrowRoundBack } from "react-icons/io";
import ItemRow from "../../components/item-row/item-row.component";

function FavoritesPage() {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  // selectors
  // get the logged user
  const { user, token } = useSelector(selectUserData);

  // get the favorites partners and favorites items from favoritesSlice
  // const favoritesPartners = useSelector(selectFavoritesPartners);
  // const favoritesItems = useSelector(selectFavoritesItems);
  const {
    favorites_partners: favoritesPartners,
    favorites_items: favoritesItems,
  } = useSelector(selectFavorites);

  const refreshFavoritesHandler = () => {
    dispatch(resetFavorites());
    dispatch(getFavorites({ token }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return user ? (
    <div className={generalStyles.container}>
      <Header>
        <h2>{t("favorites")}</h2>
        <div
          className={[generalStyles.actions, generalStyles.margin_v_4].join(
            " "
          )}
        >
          <Icon
            selected={false}
            foreColor={Colors.SECONDARY_COLOR}
            tooltip={t("refresh-tooltip")}
            onclick={refreshFavoritesHandler}
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

      {/* favorite companies */}
      <CardInfo headerTitle={t("companies")}>
        {favoritesPartners &&
          favoritesPartners
            .filter((favorite) => favorite.type === UserTypeConstants.COMPANY)
            .map((favorite) => (
              <PartnerRow
                key={favorite._id}
                partner={favorite}
                withoutBoxShadow={true}
              />
            ))}
      </CardInfo>

      {/* favorites warehouses */}
      <CardInfo headerTitle={t("warehouses")}>
        {favoritesPartners &&
          favoritesPartners
            .filter((favorite) => favorite.type === UserTypeConstants.WAREHOUSE)
            .map((favorite) => (
              <PartnerRow
                key={favorite._id}
                partner={favorite}
                withoutBoxShadow={true}
              />
            ))}
      </CardInfo>

      {/* favorites items */}
      <CardInfo headerTitle={t("nav-items")}>
        {favoritesItems &&
          favoritesItems.map((item) => (
            <ItemRow
              key={item._id}
              item={item}
              withoutBoxShadow={true}
              isFavorite={true}
            />
          ))}
      </CardInfo>

      {/* {status === "loading" && <ActionLoader allowCancel={false} />} */}
    </div>
  ) : (
    <Redirect to="/signin" />
  );
}

export default FavoritesPage;
