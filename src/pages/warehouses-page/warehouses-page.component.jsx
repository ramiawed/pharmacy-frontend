import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";

// components
import WarehousesSearchEngine from "../../components/warehouses-search-engine/warehouses-search-engine.component";
import MainContentContainer from "../../components/main-content-container/main-content-container.component";
import WarehousesActions from "../../components/warehouses-actions/warehouses-actions.component";
import ButtonWithIcon from "../../components/button-with-icon/button-with-icon.component";
import NoMoreResult from "../../components/no-more-result/no-more-result.component";
import ResultsCount from "../../components/results-count/results-count.component";
import PartnerCard from "../../components/partner-card/partner-card.component";
import CylonLoader from "../../components/cylon-loader/cylon-loader.component";
import PartnerRow from "../../components/partner-row/partner-row.component";
import NoContent from "../../components/no-content/no-content.component";
import ActionBar from "../../components/action-bar/action-bar.component";
import Toast from "../../components/toast/toast.component";

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
  selectFavorites,
} from "../../redux/favorites/favoritesSlice";
import { selectOnlineStatus } from "../../redux/online/onlineSlice";

// constants and utils
import {
  CitiesName,
  Colors,
  UserTypeConstants,
} from "../../utils/constants.js";

// styles
import generalStyles from "../../style.module.scss";

// icons
import { CgMoreVertical } from "react-icons/cg";

// handlers
import {
  addPartnerToFavoriteHandler,
  partnerRowClickHandler,
  removePartnerFromFavoriteHandler,
} from "../../utils/handlers";

function WarehousePage({ onSelectedChange }) {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  // selectors
  const isOnline = useSelector(selectOnlineStatus);
  const { token, user } = useSelector(selectUserData);
  const { warehouses, count, status } = useSelector(selectWarehouses);
  const { searchName, searchCity, displayType } = useSelector(
    selectWarehousesPageState
  );

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

  // select favorites from favoriteSlice
  const { error: favoriteError } = useSelector(selectFavorites);

  const [favoritesError, setFavoritesError] = useState(favoriteError);

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

    onSelectedChange();
  }, []);

  return user &&
    (user.type === UserTypeConstants.ADMIN ||
      user.type === UserTypeConstants.PHARMACY) ? (
    <>
      <WarehousesSearchEngine />
      <MainContentContainer>
        <WarehousesActions refreshHandler={refreshHandler} />

        {filteredWarehouses.length > 0 && (
          <ResultsCount
            count={filteredWarehouses.length}
            label={t("warehouses-count")}
          />
        )}

        {/* display as list */}
        {displayType === "list" && (
          <div
            className={[
              generalStyles.flex_container,
              generalStyles.margin_top_10,
            ].join(" ")}
          >
            {filteredWarehouses.map((warehouse) => (
              <PartnerRow
                key={warehouse._id}
                partner={warehouse}
                addPartnerToFavoriteHandler={() =>
                  addPartnerToFavoriteHandler(
                    warehouse,
                    isOnline,
                    dispatch,
                    token,
                    user
                  )
                }
                removePartnerFromFavoriteHandler={() => {
                  removePartnerFromFavoriteHandler(
                    warehouse,
                    isOnline,
                    dispatch,
                    token
                  );
                }}
                partnerRowClickHandler={(allowShowingWarehouseMedicines) =>
                  partnerRowClickHandler(
                    warehouse,
                    allowShowingWarehouseMedicines,
                    user,
                    dispatch,
                    token,
                    history
                  )
                }
              />
            ))}
          </div>
        )}

        {/* display as card */}
        {displayType === "card" && (
          <div
            className={[
              generalStyles.flex_container,
              generalStyles.margin_top_10,
            ].join(" ")}
            style={{
              alignItems: "stretch",
            }}
          >
            {filteredWarehouses.map((warehouse) => (
              <PartnerCard
                key={warehouse._id}
                partner={warehouse}
                addPartnerToFavoriteHandler={() =>
                  addPartnerToFavoriteHandler(
                    warehouse,
                    isOnline,
                    dispatch,
                    token,
                    user
                  )
                }
                removePartnerFromFavoriteHandler={() => {
                  removePartnerFromFavoriteHandler(
                    warehouse,
                    isOnline,
                    dispatch,
                    token
                  );
                }}
                partnerRowClickHandler={(allowShowingWarehouseMedicines) =>
                  partnerRowClickHandler(
                    warehouse,
                    allowShowingWarehouseMedicines,
                    user,
                    dispatch,
                    token,
                    history
                  )
                }
              />
            ))}
          </div>
        )}

        {count > 0 && status !== "loading" && (
          <ResultsCount count={`${filteredWarehouses.length} / ${count}`} />
        )}

        {filteredWarehouses.length === 0 &&
          status !== "loading" &&
          searchName.length === 0 &&
          searchCity === CitiesName.ALL && (
            <NoContent msg={t("no-warehouses")} />
          )}

        {filteredWarehouses.length === 0 &&
          status !== "loading" &&
          (searchName.length !== 0 || searchCity !== CitiesName.ALL) && (
            <NoContent msg={t("no-result-found")} />
          )}

        {status === "loading" && <CylonLoader />}

        {filteredWarehouses.length < count && (
          <ActionBar>
            <ButtonWithIcon
              text={t("more")}
              action={searchHandler}
              bgColor={Colors.SUCCEEDED_COLOR}
              icon={() => <CgMoreVertical />}
            />
          </ActionBar>
        )}

        {filteredWarehouses.length === count &&
          status !== "loading" &&
          count !== 0 && <NoMoreResult msg={t("no-more")} />}

        {favoritesError && (
          <Toast
            bgColor={Colors.FAILED_COLOR}
            foreColor="#fff"
            actionAfterTimeout={() => {
              setFavoritesError("");
            }}
          >
            {t(favoriteError)}
          </Toast>
        )}
      </MainContentContainer>
    </>
  ) : (
    <Redirect to="/" />
  );
}

export default WarehousePage;
