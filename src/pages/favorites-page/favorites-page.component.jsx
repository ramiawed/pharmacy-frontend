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
import MainContentContainer from "../../components/main-content-container/main-content-container.component";
import ActionLoader from "../../components/action-loader/action-loader.component";
import MedicineRow from "../../components/medicine-row/medicine-row.component";
import PartnerRow from "../../components/partner-row/partner-row.component";
import CardInfo from "../../components/card-info/card-info.component";
import Header from "../../components/header/header.component";

// constants
import { UserTypeConstants } from "../../utils/constants.js";

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
      <Header refreshHandler={refreshFavoritesHandler} title="favorites" />
      <MainContentContainer>
        <div>
          <CardInfo headerTitle={t("nav-items")}>
            {favoritesItems &&
              favoritesItems.map((item, index) => (
                <MedicineRow
                  item={item}
                  index={index}
                  key={item._id}
                  showComposition={true}
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
                    fullWidth={true}
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
                        isOnline,
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
                      fullWidth={true}
                      withoutBoxShadow={true}
                      withoutDeliverOption={true}
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
      </MainContentContainer>
    </>
  ) : (
    <Redirect to="/signin" />
  );
}

export default FavoritesPage;
