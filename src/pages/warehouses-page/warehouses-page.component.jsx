import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";

// components
import WarehousesSearchEngine from "../../components/warehouses-search-engine/warehouses-search-engine.component";
import MainContentContainer from "../../components/main-content-container/main-content-container.component";
import WarehousesActions from "../../components/warehouses-actions/warehouses-actions.component";
import CenterContainer from "../../components/center-container/center-container.component";
import NoMoreResult from "../../components/no-more-result/no-more-result.component";
import ResultsCount from "../../components/results-count/results-count.component";
import CylonLoader from "../../components/cylon-loader/cylon-loader.component";
import PartnerRow from "../../components/partner-row/partner-row.component";
import NoContent from "../../components/no-content/no-content.component";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  getWarehouses,
  resetWarehouse,
  selectWarehouses,
  selectWarehousesPageState,
  changeSearchCity,
} from "../../redux/warehouse/warehousesSlice";
import {
  getFavorites,
  resetFavorites,
} from "../../redux/favorites/favoritesSlice";
import { selectOnlineStatus } from "../../redux/online/onlineSlice";

// constants and utils
import { CitiesName, UserTypeConstants } from "../../utils/constants.js";

// icons

// handlers
import {
  addPartnerToFavoriteHandler,
  partnerRowClickHandler,
  removePartnerFromFavoriteHandler,
} from "../../utils/handlers";
import WarehouseCard from "../../components/warehouse-card/warehouse-card.component";

function WarehousePage() {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  // selectors
  const isOnline = useSelector(selectOnlineStatus);
  const { token, user } = useSelector(selectUserData);
  const { warehouses, status } = useSelector(selectWarehouses);
  const { searchName, searchCity } = useSelector(selectWarehousesPageState);

  let filteredWarehouses = warehouses.filter((warehouse) => {
    if (searchName.trim().length > 0) {
      return warehouse.name.includes(searchName.trim());
    }
    return true;
  });

  filteredWarehouses = filteredWarehouses.filter((warehouse) => {
    if (searchCity !== CitiesName.ALL) {
      return warehouse.city === searchCity;
    }
    return true;
  });

  // handle search
  const searchHandler = () => {
    if (
      user.type === UserTypeConstants.PHARMACY ||
      user.type === UserTypeConstants.GUEST ||
      user.type === UserTypeConstants.WAREHOUSE
    ) {
      dispatch(changeSearchCity(user.city));
    }

    dispatch(
      getWarehouses({
        token,
      })
    );
  };

  const refreshHandler = () => {
    dispatch(resetFavorites());
    dispatch(getFavorites({ token }));
    dispatch(resetWarehouse());
    searchHandler();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return user &&
    (user.type === UserTypeConstants.ADMIN ||
      user.type === UserTypeConstants.PHARMACY) ? (
    <>
      <MainContentContainer>
        <WarehousesSearchEngine />

        <WarehousesActions refreshHandler={refreshHandler} />

        {filteredWarehouses.length > 0 && (
          <ResultsCount
            label={t("warehouses count")}
            count={filteredWarehouses.length}
          />
        )}

        <CenterContainer>
          {filteredWarehouses.map((warehouse) => (
            <WarehouseCard partner={warehouse} key={warehouse._id} />
            // <PartnerRow
            //   key={warehouse._id}
            //   partner={warehouse}
            //   addPartnerToFavoriteHandler={() =>
            //     addPartnerToFavoriteHandler(
            //       warehouse,
            //       isOnline,
            //       dispatch,
            //       token,
            //       user
            //     )
            //   }
            //   removePartnerFromFavoriteHandler={() => {
            //     removePartnerFromFavoriteHandler(
            //       warehouse,
            //       isOnline,
            //       dispatch,
            //       token
            //     );
            //   }}
            //   partnerRowClickHandler={(allowShowingWarehouseMedicines) =>
            //     partnerRowClickHandler(
            //       warehouse,
            //       allowShowingWarehouseMedicines,
            //       user,
            //       dispatch,
            //       token,
            //       history
            //     )
            //   }
            // />
          ))}
        </CenterContainer>

        {filteredWarehouses.length === 0 &&
          status !== "loading" &&
          searchName.length === 0 &&
          searchCity === CitiesName.ALL && (
            <NoContent msg={t("no warehouses")} />
          )}

        {filteredWarehouses.length === 0 &&
          status !== "loading" &&
          (searchName.length !== 0 || searchCity !== CitiesName.ALL) && (
            <NoContent msg={t("no result found")} />
          )}

        {status === "loading" && <CylonLoader />}

        {status !== "loading" && filteredWarehouses.length > 0 && (
          <NoMoreResult msg={t("no more")} />
        )}
      </MainContentContainer>
    </>
  ) : (
    <Redirect to="/" />
  );
}

export default WarehousePage;
