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
import { selectOnlineStatus } from "../../redux/online/onlineSlice";

// components
import CardInfo from "../../components/card-info/card-info.component";
import Header from "../../components/header/header.component";
import PartnerRow from "../../components/partner-row/partner-row.component";
import Icon from "../../components/action-icon/action-icon.component";
import ItemRow from "../../components/item-row/item-row.component";
import ActionLoader from "../../components/action-loader/action-loader.component";

// icons
import { RiRefreshLine } from "react-icons/ri";

// styles
import generalStyles from "../../style.module.scss";

// constants
import { Colors, UserTypeConstants } from "../../utils/constants.js";

// handlers
import {
  addCompanyToOurCompaniesHandler,
  addPartnerToFavoriteHandler,
  partnerRowClickHandler,
  removeCompanyFromOurCompaniesHandler,
  removePartnerFromFavoriteHandler,
} from "../../utils/handlers";

function FavoritesPage({ onSelectedChange }) {
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  // get the logged user
  const { user, token } = useSelector(selectUserData);

  // get the favorites partners and favorites items from favoritesSlice
  const {
    favorites_partners: favoritesPartners,
    favorites_items: favoritesItems,
    status,
  } = useSelector(selectFavorites);
  const isOnline = useSelector(selectOnlineStatus);

  const refreshFavoritesHandler = () => {
    dispatch(resetFavorites());
    dispatch(getFavorites({ token }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    onSelectedChange();
  }, []);

  return user ? (
    <>
      <Header>
        <h2>{t("favorites")}</h2>
        <div className={generalStyles.refresh_icon}>
          <Icon
            selected={false}
            foreColor={Colors.WHITE_COLOR}
            tooltip={t("refresh-tooltip")}
            onclick={refreshFavoritesHandler}
            icon={() => <RiRefreshLine />}
          />
        </div>
      </Header>
      <div className={generalStyles.container_with_header}>
        <div
          style={{
            paddingInline: "10px",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
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
          {/* favorites items */}

          {/* favorite companies */}

          <CardInfo headerTitle={t("companies")}>
            {favoritesPartners &&
              favoritesPartners
                .filter(
                  (favorite) => favorite.type === UserTypeConstants.COMPANY
                )
                .map((favorite) => (
                  <PartnerRow
                    key={favorite._id}
                    partner={favorite}
                    withoutBoxShadow={true}
                    addPartnerToFavoriteHandler={() =>
                      addPartnerToFavoriteHandler(
                        favorite,
                        isOnline,
                        dispatch,
                        token,
                        user
                      )
                    }
                    addCompanyToOurCompaniesHandler={() =>
                      addCompanyToOurCompaniesHandler(favorite, dispatch, token)
                    }
                    removeCompanyFromOurCompaniesHandler={() => {
                      removeCompanyFromOurCompaniesHandler(
                        favorite,
                        isOnline,
                        dispatch,
                        token
                      );
                    }}
                    removePartnerFromFavoriteHandler={() => {
                      removePartnerFromFavoriteHandler(
                        favorite,
                        isOnline,
                        dispatch,
                        token
                      );
                    }}
                    partnerRowClickHandler={(allowShowingWarehouseMedicines) =>
                      partnerRowClickHandler(
                        favorite,
                        allowShowingWarehouseMedicines,
                        user,
                        dispatch,
                        token,
                        history
                      )
                    }
                  />
                ))}
          </CardInfo>

          {(user.type === UserTypeConstants.ADMIN ||
            user.type === UserTypeConstants.PHARMACY ||
            user.type === UserTypeConstants.COMPANY) && (
            <CardInfo headerTitle={t("warehouses")}>
              {favoritesPartners &&
                favoritesPartners
                  .filter(
                    (favorite) => favorite.type === UserTypeConstants.WAREHOUSE
                  )
                  .map((favorite) => (
                    <PartnerRow
                      key={favorite._id}
                      partner={favorite}
                      withoutBoxShadow={true}
                      addPartnerToFavoriteHandler={() =>
                        addPartnerToFavoriteHandler(
                          favorite,
                          isOnline,
                          dispatch,
                          token,
                          user
                        )
                      }
                      addCompanyToOurCompaniesHandler={() =>
                        addCompanyToOurCompaniesHandler(
                          favorite,
                          dispatch,
                          token
                        )
                      }
                      removeCompanyFromOurCompaniesHandler={() => {
                        removeCompanyFromOurCompaniesHandler(
                          favorite,
                          isOnline,
                          dispatch,
                          token
                        );
                      }}
                      removePartnerFromFavoriteHandler={() => {
                        removePartnerFromFavoriteHandler(
                          favorite,
                          isOnline,
                          dispatch,
                          token
                        );
                      }}
                      partnerRowClickHandler={(
                        allowShowingWarehouseMedicines
                      ) =>
                        partnerRowClickHandler(
                          favorite,
                          allowShowingWarehouseMedicines,
                          user,
                          dispatch,
                          token,
                          history
                        )
                      }
                    />
                  ))}
            </CardInfo>
          )}
        </div>
        {/* favorites warehouses */}

        {status === "loading" && <ActionLoader allowCancel={false} />}
      </div>
    </>
  ) : (
    <Redirect to="/signin" />
  );
}

export default FavoritesPage;
