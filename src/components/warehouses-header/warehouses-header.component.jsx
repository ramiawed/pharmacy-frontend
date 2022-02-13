import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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
import Header from "../header/header.component";
import SearchContainer from "../search-container/search-container.component";
import SearchInput from "../search-input/search-input.component";
import Icon from "../action-icon/action-icon.component";
import PartnerRow from "../partner-row/partner-row.component";

// react icons
import { RiRefreshLine } from "react-icons/ri";
import { AiFillAppstore, AiFillStar } from "react-icons/ai";
import { FaListUl } from "react-icons/fa";
import { VscClearAll } from "react-icons/vsc";

// styles
import generalStyles from "../../style.module.scss";

// constants and utils
import { CitiesName, Colors, UserTypeConstants } from "../../utils/constants";
import SelectCustom from "../select/select.component";

function WarehousesHeader({ search, refreshHandler, count }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { searchName, searchCity, displayType, showFavorites } = useSelector(
    selectWarehousesPageState
  );
  const favorites = useSelector(selectFavoritesPartners);

  // guest options and its change handler
  const citiesOptions = [
    { value: CitiesName.ALL, label: t("all-cities") },
    { value: CitiesName.ALEPPO, label: t("aleppo") },
    { value: CitiesName.DAMASCUS, label: t("damascus") },
    { value: CitiesName.DARAA, label: t("daraa") },
    { value: CitiesName.DEIR_EZ_ZOR, label: t("deir_ez_zor") },
    { value: CitiesName.HAMA, label: t("hama") },
    { value: CitiesName.AL_HASAKAH, label: t("al_hasakah") },
    { value: CitiesName.HOMS, label: t("homs") },
    { value: CitiesName.IDLIB, label: t("idlib") },
    { value: CitiesName.LATAKIA, label: t("latakia") },
    { value: CitiesName.QUNEITRA, label: t("quneitra") },
    { value: CitiesName.RAQQA, label: t("raqqa") },
    { value: CitiesName.AL_SUWAYDA, label: t("al_suwayda") },
    { value: CitiesName.TARTUS, label: t("tartus") },
    {
      value: CitiesName.DAMASCUS_COUNTRYSIDE,
      label: t("damascus_countryside"),
    },
  ];
  // Guest types are (Student, Pharmacist, Employee)
  // uses with the SelectCustom
  const citiesNameChangeHandler = (val) => {
    // if the user type is Normal and the job is Student or Pharmacist
    // so the user doesn't contains info about company name and job title
    dispatch(changeSearchCity(val));
  };

  return (
    <>
      <Header>
        <h2>
          {t("warehouses")} <span>{count}</span>
        </h2>

        <div style={{ position: "relative", height: "50px" }}>
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

            <SelectCustom
              bgColor={Colors.SECONDARY_COLOR}
              foreColor="#fff"
              options={citiesOptions}
              onchange={citiesNameChangeHandler}
              defaultOption={{
                value: searchCity,
                label: t(searchCity.toLowerCase()),
              }}
              caption="user-city"
            />
          </SearchContainer>
        </div>
      </Header>

      <div
        className={[generalStyles.actions, generalStyles.margin_v_4].join(" ")}
      >
        {/* refresh */}
        <Icon
          foreColor={Colors.SECONDARY_COLOR}
          tooltip={t("refresh-tooltip")}
          onclick={refreshHandler}
          icon={() => <RiRefreshLine />}
          withBackground={true}
        />

        {(searchName.length > 0 || searchCity !== CitiesName.ALL) && (
          <Icon
            selected={false}
            foreColor={Colors.SECONDARY_COLOR}
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
              showFavorites ? Colors.SUCCEEDED_COLOR : Colors.SECONDARY_COLOR
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
            displayType === "card"
              ? Colors.SUCCEEDED_COLOR
              : Colors.SECONDARY_COLOR
          }
          tooltip={t("show-item-as-card-tooltip")}
          onclick={() => {
            dispatch(changeDisplayType("card"));
            dispatch(changeShowFavorites(false));
          }}
          icon={() => <AiFillAppstore />}
          withBackground={true}
        />

        {/* display list option */}
        <Icon
          foreColor={
            displayType === "list"
              ? Colors.SUCCEEDED_COLOR
              : Colors.SECONDARY_COLOR
          }
          tooltip={t("show-item-as-row-tooltip")}
          onclick={() => {
            dispatch(changeDisplayType("list"));
            dispatch(changeShowFavorites(false));
          }}
          icon={() => <FaListUl />}
          withBackground={true}
        />
      </div>
    </>
  );
}

export default WarehousesHeader;
