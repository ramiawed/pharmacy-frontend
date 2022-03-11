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
  resetCompaniesPageState,
  selectCompaniesPageState,
} from "../../redux/company/companySlice";
import { selectFavoritesPartners } from "../../redux/favorites/favoritesSlice";
import CitiesDropDown from "../cities-dropdown/cities-dropdown.component";

// components
import SearchContainer from "../search-container/search-container.component";
import SearchInput from "../search-input/search-input.component";
import Icon from "../action-icon/action-icon.component";
import PartnerRow from "../partner-row/partner-row.component";

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

function CompaniesHeader({ search, refreshHandler, count }) {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { searchName, searchCity, displayType, showFavorites } = useSelector(
    selectCompaniesPageState
  );
  const favorites = useSelector(selectFavoritesPartners);

  // Guest types are (Student, Pharmacist, Employee)
  // uses with the SelectCustom
  const citiesNameChangeHandler = (val) => {
    // if the user type is Normal and the job is Student or Pharmacist
    // so the user doesn't contains info about company name and job title
    dispatch(changeSearchCity(val));
  };

  return (
    <>
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
            placeholder="search-by-company-name"
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
      </>
      <div
        className={[generalStyles.actions, generalStyles.margin_v_4].join(" ")}
      >
        {/* refresh */}
        <Icon
          withBackground={true}
          selected={false}
          foreColor={Colors.MAIN_COLOR}
          tooltip={t("refresh-tooltip")}
          onclick={() => {
            refreshHandler();
            dispatch(changeShowFavorites(false));
          }}
          icon={() => <RiRefreshLine />}
        />

        {(searchName.length > 0 || searchCity !== CitiesName.ALL) && (
          <Icon
            withBackground={true}
            selected={false}
            foreColor={Colors.MAIN_COLOR}
            tooltip={t("clear-filter-tooltip")}
            onclick={() => {
              dispatch(resetCompaniesPageState());
              refreshHandler();
              dispatch(changeShowFavorites(false));
            }}
            icon={() => <VscClearAll />}
          />
        )}

        {/* show favorites */}
        <div className={generalStyles.relative}>
          <Icon
            withBackground={true}
            foreColor={
              showFavorites ? Colors.SUCCEEDED_COLOR : Colors.MAIN_COLOR
            }
            tooltip={t("show-favorite-tooltip")}
            onclick={() => dispatch(changeShowFavorites(!showFavorites))}
            icon={() => <AiFillStar />}
          />

          {showFavorites && (
            <div
              className={[
                generalStyles.favorites_content,
                generalStyles.bg_white,
              ].join(" ")}
            >
              {showFavorites &&
                favorites &&
                favorites
                  .filter(
                    (favorite) => favorite.type === UserTypeConstants.COMPANY
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
          withBackground={true}
          foreColor={
            displayType === "card" ? Colors.SUCCEEDED_COLOR : Colors.MAIN_COLOR
          }
          tooltip={t("show-item-as-card-tooltip")}
          onclick={() => {
            dispatch(changeDisplayType("card"));
            dispatch(changeShowFavorites(false));
          }}
          icon={() => <AiFillAppstore />}
        />

        {/* display list option */}
        <Icon
          withBackground={true}
          foreColor={
            displayType === "list" ? Colors.SUCCEEDED_COLOR : Colors.MAIN_COLOR
          }
          tooltip={t("show-item-as-row-tooltip")}
          onclick={() => {
            dispatch(changeDisplayType("list"));
            dispatch(changeShowFavorites(false));
          }}
          icon={() => <FaListUl />}
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
    </>
  );
}

export default CompaniesHeader;
