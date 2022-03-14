import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router";
import ReactLoading from "react-loading";
import { useHistory } from "react-router-dom";

// components
import ItemCard from "../../components/item-card/item-card.component";
import SearchContainer from "../../components/search-container/search-container.component";
import SearchInput from "../../components/search-input/search-input.component";
import ItemRow from "../../components/item-row/item-row.component";
import NoContent from "../../components/no-content/no-content.component";
import Button from "../../components/button/button.component";
import Icon from "../../components/action-icon/action-icon.component";
import MedicinesSearchString from "../../components/medicines-search-string/medicines-search-string.component";

// react-icons
import { FaSearch, FaListUl } from "react-icons/fa";
import { RiRefreshLine } from "react-icons/ri";
import { AiFillAppstore, AiFillStar } from "react-icons/ai";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import { selectFavoritesItems } from "../../redux/favorites/favoritesSlice.js";
import medicinesSlices, {
  getMedicines,
  selectMedicines,
  cancelOperation,
  setSearchName,
  setSearchCompanyName,
  setSearchWarehouseName,
  setSearchInWarehouse,
  setSearchOutWarehouse,
  setCity,
  setDisplayType,
  resetMedicinesArray,
  resetMedicinesPageState,
} from "../../redux/medicines/medicinesSlices";

// styles
import generalStyles from "../../style.module.scss";
import searchContainerStyles from "../../components/search-container/search-container.module.scss";

// constants
import { Colors, UserTypeConstants } from "../../utils/constants";
import { VscClearAll } from "react-icons/vsc";
import { IoMdArrowRoundBack } from "react-icons/io";
import ItemRowNew from "../../components/item-row-new/item-row-new.component";

let timer = null;

function MedicinesPage({ onSelectedChange }) {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  // selectors
  const { token, user } = useSelector(selectUserData);
  const { medicines, count, status, pageState } = useSelector(selectMedicines);
  const favoritesItems = useSelector(selectFavoritesItems);

  // own state
  const [showFavorites, setShowFavorites] = useState(false);

  // handle search
  const handleSearch = () => {
    if (user.type === UserTypeConstants.PHARMACY) {
      dispatch(setCity(user.city));
    } else {
      dispatch(setCity(""));
    }

    dispatch(getMedicines({ token }));
  };

  const handleMoreResult = () => {
    handleSearch();
  };

  const handleEnterPress = () => {
    dispatch(resetMedicinesArray());
    handleSearch();
  };

  const keyUpHandler = () => {
    cancelOperation();

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      dispatch(resetMedicinesArray());

      handleSearch();
    }, 200);
  };

  useEffect(() => {
    if (medicines.length === 0) {
      handleSearch();
      window.scrollTo(0, 0);
    }

    onSelectedChange();
  }, []);

  return user ? (
    <>
      <SearchContainer searchAction={handleEnterPress}>
        <SearchInput
          label="user-name"
          id="search-name"
          type="text"
          value={pageState.searchName}
          onchange={(e) => {
            dispatch(setSearchName(e.target.value));
          }}
          icon={<FaSearch />}
          placeholder="search-by-name-composition-barcode"
          onEnterPress={handleEnterPress}
          resetField={() => {
            dispatch(setSearchName(""));
          }}
          onkeyup={keyUpHandler}
        />
        {/* // {user.type !== UserTypeConstants.GUEST && companyId === null && ( */}
        {user.type !== UserTypeConstants.GUEST && (
          <SearchInput
            label="item-company"
            id="item-company"
            type="text"
            value={pageState.searchCompanyName}
            onchange={(e) => {
              dispatch(setSearchCompanyName(e.target.value));
            }}
            icon={<FaSearch />}
            placeholder="search-by-company-name"
            onEnterPress={handleEnterPress}
            resetField={() => {
              dispatch(setSearchCompanyName(""));
            }}
          />
        )}

        {/* {user.type !== UserTypeConstants.GUEST && warehouseId === null && ( */}
        {(user.type === UserTypeConstants.ADMIN ||
          user.type === UserTypeConstants.PHARMACY) && (
          <SearchInput
            label="item-warehouse"
            id="item-warehouse"
            type="text"
            value={pageState.searchWarehouseName}
            onchange={(e) => {
              dispatch(setSearchWarehouseName(e.target.value));
            }}
            icon={<FaSearch />}
            placeholder="search-by-warehouse-name"
            onEnterPress={handleEnterPress}
            resetField={() => {
              dispatch(setSearchWarehouseName(""));
            }}
          />
        )}

        {/* {user.type !== UserTypeConstants.GUEST && warehouseId === null && ( */}
        {user.type !== UserTypeConstants.GUEST && (
          <div className={searchContainerStyles.checkbox_div}>
            <input
              type="checkbox"
              value={pageState.searchInWarehouse}
              checked={pageState.searchInWarehouse}
              onChange={() => {
                dispatch(setSearchInWarehouse(!pageState.searchInWarehouse));
                dispatch(setSearchOutWarehouse(false));
              }}
            />
            {user.type === UserTypeConstants.WAREHOUSE && (
              <label>{t("warehouse-in-warehouse")}</label>
            )}
            {user.type !== UserTypeConstants.WAREHOUSE && (
              <label>{t("pharmacy-in-warehouse")}</label>
            )}
          </div>
        )}

        {/* {user.type !== UserTypeConstants.GUEST && warehouseId === null && ( */}
        {user.type !== UserTypeConstants.GUEST && (
          <div className={searchContainerStyles.checkbox_div}>
            <input
              type="checkbox"
              value={pageState.searchOutWarehouse}
              checked={pageState.searchOutWarehouse}
              onChange={() => {
                dispatch(setSearchOutWarehouse(!pageState.searchOutWarehouse));
                dispatch(setSearchInWarehouse(false));
              }}
            />
            {user.type === UserTypeConstants.WAREHOUSE && (
              <label>{t("warehouse-out-warehouse")}</label>
            )}
            {user.type !== UserTypeConstants.WAREHOUSE && (
              <label>{t("pharmacy-out-warehouse")}</label>
            )}
          </div>
        )}
      </SearchContainer>
      <div
        className={generalStyles.container}
        style={{
          marginBlockStart: "50px",
          paddingInlineStart: "50px",
        }}
      >
        <MedicinesSearchString pageState={pageState} user={user} />

        <div className={generalStyles.actions}>
          <Icon
            withBackground={true}
            icon={() => <RiRefreshLine />}
            foreColor={Colors.MAIN_COLOR}
            tooltip={t("refresh-tooltip")}
            onclick={handleEnterPress}
          />
          {(pageState.searchName.length > 0 ||
            pageState.searchCompanyName.length > 0 ||
            pageState.searchWarehouseName.length > 0 ||
            pageState.searchInWarehouse ||
            pageState.searchOutWarehouse) && (
            <Icon
              withBackground={true}
              selected={false}
              foreColor={Colors.MAIN_COLOR}
              tooltip={t("clear-filter-tooltip")}
              onclick={() => {
                dispatch(resetMedicinesPageState());
                handleEnterPress();
                setShowFavorites(false);
              }}
              icon={() => <VscClearAll />}
            />
          )}

          <div className={generalStyles.relative}>
            <Icon
              withBackground={true}
              icon={() => <AiFillStar />}
              foreColor={
                showFavorites ? Colors.SUCCEEDED_COLOR : Colors.MAIN_COLOR
              }
              tooltip={t("show-favorite-tooltip")}
              onclick={() => setShowFavorites(!showFavorites)}
            />

            {showFavorites && (
              <div
                className={[
                  generalStyles.favorites_content,
                  generalStyles.favorites_content_wider,
                  generalStyles.bg_white,
                ].join(" ")}
              >
                {showFavorites &&
                  favoritesItems.map((item) => (
                    <ItemRow
                      key={item._id}
                      item={item}
                      isFavorite={true}
                      isSmallFavorite={true}
                    />
                  ))}
              </div>
            )}
          </div>

          <Icon
            withBackground={true}
            icon={() => <AiFillAppstore />}
            foreColor={
              pageState.displayType === "card"
                ? Colors.SUCCEEDED_COLOR
                : Colors.MAIN_COLOR
            }
            tooltip={t("show-item-as-card-tooltip")}
            onclick={() => dispatch(setDisplayType("card"))}
          />

          <Icon
            withBackground={true}
            icon={() => <FaListUl />}
            foreColor={
              pageState.displayType === "list"
                ? Colors.SUCCEEDED_COLOR
                : Colors.MAIN_COLOR
            }
            tooltip={t("show-item-as-row-tooltip")}
            onclick={() => dispatch(setDisplayType("list"))}
          />

          <Icon
            withBackground={true}
            tooltip={t("go-back")}
            onclick={() => {
              history.goBack();
            }}
            icon={() => <IoMdArrowRoundBack />}
            foreColor={Colors.MAIN_COLOR}
          />
        </div>

        {count > 0 && (
          <div className={generalStyles.count}>
            <span className={generalStyles.label}>{t("items-count")}</span>
            <span className={generalStyles.count}>{count}</span>
          </div>
        )}

        {pageState.displayType === "list" &&
          medicines.map((medicine) => (
            <ItemRowNew key={medicine._id} item={medicine} />
          ))}

        {pageState.displayType === "card" && (
          <div
            className={[
              generalStyles.flex_container,
              generalStyles.margin_top_10,
            ].join(" ")}
          >
            {medicines.map((medicine) => (
              <ItemCard key={medicine._id} companyItem={medicine} />
            ))}
          </div>
        )}

        {count > 0 && status !== "loading" && (
          <div className={generalStyles.count}>
            {medicines.length} / {count}
          </div>
        )}

        {medicines.length === 0 &&
          status !== "loading" &&
          pageState.searchName.length === 0 &&
          pageState.searchCompanyName.length === 0 &&
          pageState.searchWarehouseName.length === 0 &&
          !pageState.searchInWarehouse &&
          !pageState.searchOutWarehouse && <NoContent msg={t("no-items")} />}

        {medicines.length === 0 &&
          status !== "loading" &&
          (pageState.searchName.length !== 0 ||
            pageState.searchCompanyName.length !== 0 ||
            pageState.searchWarehouseName.length !== 0 ||
            pageState.searchInWarehouse ||
            pageState.searchOutWarehouse) && (
            <NoContent msg={t("no-result-found")} />
          )}

        {status === "loading" && (
          <div className={generalStyles.flex_container}>
            <ReactLoading color={Colors.SECONDARY_COLOR} type="cylon" />
          </div>
        )}

        {medicines.length < count && status !== "loading" && (
          <Button
            text={t("more")}
            action={handleMoreResult}
            bgColor={Colors.SECONDARY_COLOR}
          />
        )}

        {medicines.length === count && status !== "loading" && count !== 0 && (
          <p
            className={[generalStyles.center, generalStyles.fc_secondary].join(
              " "
            )}
          >
            {t("no-more")}
          </p>
        )}
      </div>
    </>
  ) : (
    <Redirect to="/signin" />
  );
}

export default MedicinesPage;
