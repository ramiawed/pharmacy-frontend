import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import {
  changeDisplayType,
  changeSearchCity,
  changeSearchName,
  changeShowFavorites,
  resetWarehousePageState,
  selectWarehousesPageState,
} from "../../redux/warehouse/warehousesSlice";
import { selectFavoritesPartners } from "../../redux/favorites/favoritesSlice";

// components
import SearchContainer from "../search-container/search-container.component";
import SearchInput from "../search-input/search-input.component";
import Icon from "../action-icon/action-icon.component";
import PartnerRow from "../partner-row/partner-row.component";
import CitiesDropDown from "../cities-dropdown/cities-dropdown.component";

// react icons
import { RiRefreshLine } from "react-icons/ri";
import { AiFillAppstore, AiFillStar } from "react-icons/ai";
import { FaListUl } from "react-icons/fa";
import { VscClearAll } from "react-icons/vsc";
import { IoMdArrowRoundBack } from "react-icons/io";

// styles
import generalStyles from "../../style.module.scss";

// constants and utils
import { CitiesName, Colors, UserTypeConstants } from "../../utils/constants";

function WarehousesHeader({ search, refreshHandler, count }) {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { searchName, searchCity, displayType, showFavorites } = useSelector(
    selectWarehousesPageState
  );
  const favorites = useSelector(selectFavoritesPartners);

  // when you change the selected city
  const citiesNameChangeHandler = (val) => {
    dispatch(changeSearchCity(val));
  };

  // select card as display type
  const selectCardDisplayTypeHandler = () => {
    dispatch(changeDisplayType("card"));
    dispatch(changeShowFavorites(false));
  };

  // select list as display type
  const selectListDisplayTypeHandler = () => {
    dispatch(changeDisplayType("list"));
    dispatch(changeShowFavorites(false));
  };

  return (
    <>
      <SearchContainer searchAction={search}>
        <SearchInput
          label="user-name"
          id="search-name"
          type="text"
          value={searchName}
          onchange={(e) => {
            dispatch(changeSearchName(e.target.value));
          }}
          placeholder="search"
          onEnterPress={search}
          resetField={() => dispatch(changeSearchName(""))}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            backgroundColor: Colors.WHITE_COLOR,
            borderRadius: "6px",
          }}
        >
          <CitiesDropDown
            onSelectionChange={citiesNameChangeHandler}
            defaultValue={{
              value: searchCity,
              label: t(searchCity.toLowerCase()),
            }}
            caption="user-city"
          />
        </div>
      </SearchContainer>

      {/* action's buttons */}
      <div
        className={[generalStyles.actions, generalStyles.margin_v_4].join(" ")}
      >
        {/* refresh */}
        <Icon
          foreColor={Colors.GREY_COLOR}
          tooltip={t("refresh-tooltip")}
          onclick={refreshHandler}
          icon={() => <RiRefreshLine />}
          withBackground={true}
        />

        {/* clear search filter */}
        {(searchName.length > 0 || searchCity !== CitiesName.ALL) && (
          <Icon
            selected={false}
            foreColor={Colors.GREY_COLOR}
            tooltip={t("clear-filter-tooltip")}
            onclick={() => {
              dispatch(resetWarehousePageState());
              refreshHandler();
              dispatch(changeShowFavorites(false));
            }}
            icon={() => <VscClearAll />}
            withBackground={true}
          />
        )}

        {/* show favorites */}
        <div className={generalStyles.relative}>
          <Icon
            foreColor={
              showFavorites ? Colors.SUCCEEDED_COLOR : Colors.GREY_COLOR
            }
            tooltip={t("show-favorite-tooltip")}
            onclick={() => dispatch(changeShowFavorites(!showFavorites))}
            icon={() => <AiFillStar />}
            withBackground={true}
          />

          {showFavorites && (
            <div
              className={[
                generalStyles.favorites_content,
                generalStyles.bg_white,
              ].join(" ")}
            >
              {showFavorites &&
                favorites
                  .filter(
                    (favorite) => favorite.type === UserTypeConstants.WAREHOUSE
                  )
                  .map((favorite) => (
                    <PartnerRow
                      key={favorite._id}
                      partner={favorite}
                      withoutBoxShadow={true}
                    />
                  ))}
            </div>
          )}
        </div>

        {/* display card option */}
        <Icon
          foreColor={
            displayType === "card" ? Colors.SUCCEEDED_COLOR : Colors.GREY_COLOR
          }
          tooltip={t("show-item-as-card-tooltip")}
          onclick={selectCardDisplayTypeHandler}
          icon={() => <AiFillAppstore />}
          withBackground={true}
        />

        {/* display list option */}
        <Icon
          foreColor={
            displayType === "list" ? Colors.SUCCEEDED_COLOR : Colors.GREY_COLOR
          }
          tooltip={t("show-item-as-row-tooltip")}
          onclick={selectListDisplayTypeHandler}
          icon={() => <FaListUl />}
          withBackground={true}
        />

        <Icon
          withBackground={true}
          tooltip={t("go-back")}
          onclick={() => {
            history.goBack();
          }}
          icon={() => <IoMdArrowRoundBack />}
          foreColor={Colors.GREY_COLOR}
        />
      </div>
    </>
  );
}

export default WarehousesHeader;
