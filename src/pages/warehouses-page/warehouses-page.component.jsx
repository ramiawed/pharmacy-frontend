import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router";
import ReactLoading from "react-loading";

// components
import PartnerRow from "../../components/partner-row/partner-row.component";
import PartnerCard from "../../components/partner-card/partner-card.component";
import Button from "../../components/button/button.component";
import Toast from "../../components/toast/toast.component";
import NoContent from "../../components/no-content/no-content.component";
import WarehousesHeader from "../../components/warehouses-header/warehouses-header.component";

// redux stuff
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  getWarehouses,
  resetWarehouse,
  selectWarehouses,
  changePage,
  selectWarehousesPageState,
  resetStatus,
  changeShowFavorites,
  cancelOperation,
  changeSearchCity,
} from "../../redux/warehouse/warehousesSlice";
import {
  getFavorites,
  resetFavorites,
  selectFavorites,
} from "../../redux/favorites/favoritesSlice";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";

// constants and utils
import { Colors, UserTypeConstants } from "../../utils/constants.js";

// styles
import generalStyles from "../../style.module.scss";

function WarehousePage({ onSelectedChange }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const isOnline = useSelector(selectOnlineStatus);
  const { token, user } = useSelector(selectUserData);
  const { warehouses, count, status, error } = useSelector(selectWarehouses);
  const { displayType, page } = useSelector(selectWarehousesPageState);

  // select favorites from favoriteSlice
  const { error: favoriteError } = useSelector(selectFavorites);

  const [favoritesError, setFavoritesError] = useState(favoriteError);

  // handle search
  const handleSearch = (page) => {
    dispatch(changeShowFavorites());

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
    )
      .then(unwrapResult)
      .then(() => {
        dispatch(changePage(page + 1));
      });
  };

  const handleMoreResult = () => {
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    handleSearch(page);
  };

  const handleEnterPress = () => {
    dispatch(resetWarehouse());
    dispatch(changePage(1));
    handleSearch(1);
  };

  const refreshHandler = () => {
    dispatch(resetFavorites());
    dispatch(getFavorites({ token }));
    dispatch(resetWarehouse());
    dispatch(changePage(1));
    handleSearch(1);
  };

  useEffect(() => {
    if (warehouses.length === 0) handleSearch(1);

    window.scrollTo(0, 0);

    onSelectedChange();

    return () => {
      cancelOperation();
    };
  }, []);

  return user &&
    (user.type === UserTypeConstants.ADMIN ||
      user.type === UserTypeConstants.PHARMACY) ? (
    <div className={generalStyles.container}>
      <WarehousesHeader
        count={count}
        search={handleEnterPress}
        refreshHandler={refreshHandler}
      />

      {/* display as list */}
      {displayType === "list" &&
        warehouses.map((warehouse) => (
          <PartnerRow key={warehouse._id} partner={warehouse} />
        ))}

      {/* display as card */}
      {displayType === "card" && (
        <div
          className={[
            generalStyles.flex_container,
            generalStyles.margin_top_10,
          ].join(" ")}
        >
          {warehouses.map((warehouse) => (
            <PartnerCard key={warehouse._id} partner={warehouse} />
          ))}
        </div>
      )}

      {/* show loading indicator when data loading from db */}
      {/* {status === "loading" && <Loader allowCancel={false} />} */}

      {warehouses.length === 0 && status !== "loading" && (
        <>
          <NoContent msg={t("no-warehouses")} />
        </>
      )}

      {status === "loading" && (
        <div className={generalStyles.flex_container}>
          <ReactLoading color={Colors.SECONDARY_COLOR} type="cylon" />
        </div>
      )}

      {warehouses.length < count && (
        <Button
          text={t("more")}
          action={handleMoreResult}
          bgColor={Colors.SECONDARY_COLOR}
        />
      )}

      {warehouses.length === count && status !== "loading" && count !== 0 && (
        <p
          className={[generalStyles.center, generalStyles.fc_secondary].join(
            " "
          )}
        >
          {t("no-more")}
        </p>
      )}

      {error && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          actionAfterTimeout={() => {
            dispatch(resetStatus());
          }}
        >
          {t(error)}
        </Toast>
      )}

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
    </div>
  ) : (
    <Redirect to="/" />
  );
}

export default WarehousePage;
