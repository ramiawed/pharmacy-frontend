import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import {
  resetFavorites,
  getFavorites,
  selectFavorites,
  selectFavoriteCompanies,
  selectFavoriteWarehouses,
} from "../../redux/favorites/favoritesSlice";
import { selectUserData } from "../../redux/auth/authSlice";

// components
import MainContentContainer from "../../components/main-content-container/main-content-container.component";
import CenterContainer from "../../components/center-container/center-container.component";
import WarehouseCard from "../../components/warehouse-card/warehouse-card.component";
import ActionLoader from "../../components/action-loader/action-loader.component";
import MedicineRow from "../../components/medicine-row/medicine-row.component";
import CompanyCard from "../../components/company-card/comany-card.component";
import CardInfo from "../../components/card-info/card-info.component";
import Header from "../../components/header/header.component";

// constants
import { UserTypeConstants } from "../../utils/constants.js";
import NoMoreResult from "../../components/no-more-result/no-more-result.component";

function FavoritesPage({ onSelectedChange }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  // get the logged user
  const { user, token } = useSelector(selectUserData);

  // get the favorites partners and favorites items from favoritesSlice
  const { favorites_items: favoritesItems, status } =
    useSelector(selectFavorites);

  const favoriteCompanies = useSelector(selectFavoriteCompanies);
  const favoriteWarehouses = useSelector(selectFavoriteWarehouses);

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
      <MainContentContainer>
        <Header refreshHandler={refreshFavoritesHandler} title="favorites" />
        <div>
          <CardInfo headerTitle={t("items")}>
            {favoritesItems && favoritesItems.length > 0 ? (
              favoritesItems.map((item, index) => (
                <MedicineRow
                  item={item}
                  index={index}
                  key={item._id}
                  showComposition={true}
                />
              ))
            ) : (
              <NoMoreResult msg={t("no products in favorites")} />
            )}
          </CardInfo>
          {/* favorites items */}

          {/* favorite companies */}

          <CardInfo headerTitle={t("companies")}>
            {favoriteCompanies && favoriteCompanies.length > 0 ? (
              <CenterContainer>
                {favoriteCompanies.map((favorite) => (
                  <CompanyCard partner={favorite} key={favorite._id} />
                ))}
              </CenterContainer>
            ) : (
              <NoMoreResult msg={t("no companies in favorites")} />
            )}
          </CardInfo>

          {(user.type === UserTypeConstants.ADMIN ||
            user.type === UserTypeConstants.PHARMACY ||
            user.type === UserTypeConstants.COMPANY) && (
            <CardInfo headerTitle={t("warehouses")}>
              {favoriteWarehouses && favoriteWarehouses.length > 0 ? (
                <CenterContainer>
                  {favoriteWarehouses.map((favorite) => (
                    <WarehouseCard partner={favorite} key={favorite._id} />
                  ))}
                </CenterContainer>
              ) : (
                <NoMoreResult msg={t("no warehouses in favorites")} />
              )}
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
