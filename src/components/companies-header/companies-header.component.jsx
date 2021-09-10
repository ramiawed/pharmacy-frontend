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
  selectCompaniesPageState,
} from "../../redux/company/companySlice";
import { selectFavoritesPartners } from "../../redux/favorites/favoritesSlice";

// components
import Header from "../header/header.component";
import SearchContainer from "../search-container/search-container.component";
import SearchInput from "../search-input/search-input.component";
import Icon from "../action-icon/action-icon.component";
import FavoriteRow from "../favorite-row/favorite-row.component";

// react icons
import { RiRefreshLine } from "react-icons/ri";
import { AiFillAppstore, AiFillStar } from "react-icons/ai";
import { FaListUl } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";

// styles
import generalStyles from "../../style.module.scss";

// constants and utils
import { Colors, UserTypeConstants } from "../../utils/constants";

function CompaniesHeader({ search, refreshHandler, count }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const { searchName, searchCity, displayType, showFavorites } = useSelector(
    selectCompaniesPageState
  );
  const favorites = useSelector(selectFavoritesPartners);

  return (
    <Header>
      <h2>
        {t("companies")} <span>{count}</span>
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

          <SearchInput
            label="user-city"
            id="search-city"
            type="text"
            value={searchCity}
            onchange={(e) => {
              dispatch(changeSearchCity(e.target.value));
            }}
            placeholder="search"
            onEnterPress={search}
            resetField={() => dispatch(changeSearchCity(""))}
          />
        </SearchContainer>
      </div>

      <div
        className={[generalStyles.actions, generalStyles.margin_v_4].join(" ")}
      >
        {/* refresh */}
        <Icon
          selected={false}
          foreColor={Colors.SECONDARY_COLOR}
          tooltip={t("refresh-tooltip")}
          onclick={() => {
            refreshHandler();
            dispatch(changeShowFavorites(false));
          }}
          icon={() => <RiRefreshLine />}
        />

        {/* show favorites */}
        <div className={generalStyles.relative}>
          <Icon
            foreColor={
              showFavorites ? Colors.SUCCEEDED_COLOR : Colors.SECONDARY_COLOR
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
                    <FavoriteRow
                      key={favorite._id}
                      user={favorite}
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
        />

        {/* go back */}
        <Icon
          tooltip={t("go-back")}
          onclick={() => {
            history.goBack();
            if (showFavorites) {
              dispatch(changeShowFavorites(false));
            }
          }}
          icon={() => <IoMdArrowRoundBack size={20} />}
          foreColor={Colors.SECONDARY_COLOR}
        />
      </div>
    </Header>
  );
}

export default CompaniesHeader;
