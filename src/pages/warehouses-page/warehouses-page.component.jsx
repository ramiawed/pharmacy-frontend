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
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  getWarehouses,
  resetWarehouse,
  selectWarehouses,
  selectWarehousesPageState,
  changeShowFavorites,
  cancelOperation,
  changeSearchCity,
  resetWarehousesArray,
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
import {
  CitiesName,
  Colors,
  UserTypeConstants,
} from "../../utils/constants.js";

// styles
import generalStyles from "../../style.module.scss";
import ButtonWithIcon from "../../components/button-with-icon/button-with-icon.component";
import { CgMoreVertical } from "react-icons/cg";

let timer;

function WarehousePage({ onSelectedChange }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const isOnline = useSelector(selectOnlineStatus);
  const { token, user } = useSelector(selectUserData);
  const { warehouses, count, status } = useSelector(selectWarehouses);
  const { searchName, searchCity } = useSelector(selectWarehousesPageState);
  const { displayType } = useSelector(selectWarehousesPageState);

  // select favorites from favoriteSlice
  const { error: favoriteError } = useSelector(selectFavorites);

  const [favoritesError, setFavoritesError] = useState(favoriteError);

  // handle search
  const handleSearch = () => {
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
    );
  };

  const handleMoreResult = () => {
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    handleSearch();
  };

  const handleEnterPress = () => {
    dispatch(resetWarehousesArray());
    handleSearch();
  };

  const refreshHandler = () => {
    dispatch(resetFavorites());
    dispatch(getFavorites({ token }));
    dispatch(resetWarehouse());
    handleSearch();
  };

  const keyUpHandler = (event) => {
    if (event.keyCode === 13) return;
    cancelOperation();

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      handleEnterPress();
    }, 200);
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
        keyUpHandler={keyUpHandler}
      />

      {count > 0 && (
        <div className={generalStyles.count}>
          <span className={generalStyles.label}>{t("warehouses-count")}</span>
          <span className={generalStyles.count}>{count}</span>
        </div>
      )}

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

      {count > 0 && status !== "loading" && (
        <div className={generalStyles.count}>
          {warehouses.length} / {count}
        </div>
      )}

      {warehouses.length === 0 &&
        status !== "loading" &&
        searchName.length === 0 &&
        searchCity === CitiesName.ALL && <NoContent msg={t("no-warehouses")} />}

      {warehouses.length === 0 &&
        status !== "loading" &&
        (searchName.length !== 0 || searchCity !== CitiesName.ALL) && (
          <NoContent msg={t("no-result-found")} />
        )}

      {status === "loading" && (
        <div className={generalStyles.flex_container}>
          <ReactLoading color={Colors.SECONDARY_COLOR} type="cylon" />
        </div>
      )}

      {warehouses.length < count && (
        <div className={generalStyles.flex_container}>
          <ButtonWithIcon
            text={t("more")}
            action={handleMoreResult}
            bgColor={Colors.SECONDARY_COLOR}
            icon={() => <CgMoreVertical />}
          />
        </div>
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
