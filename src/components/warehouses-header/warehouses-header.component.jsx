import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import {
  changeDisplayType,
  changeSearchCity,
  changeSearchName,
  resetWarehousePageState,
  selectWarehousesPageState,
} from "../../redux/warehouse/warehousesSlice";

// components
import SearchContainer from "../search-container/search-container.component";
import SearchInput from "../search-input/search-input.component";
import Icon from "../action-icon/action-icon.component";
import CitiesDropDown from "../cities-dropdown/cities-dropdown.component";

// react icons
import { RiRefreshLine } from "react-icons/ri";
import { AiFillAppstore } from "react-icons/ai";
import { FaListUl } from "react-icons/fa";
import { VscClearAll } from "react-icons/vsc";
import { IoMdArrowRoundBack } from "react-icons/io";

// styles
import generalStyles from "../../style.module.scss";

// constants and utils
import { CitiesName, Colors, UserTypeConstants } from "../../utils/constants";
import { selectUser } from "../../redux/auth/authSlice";

function WarehousesHeader({ search, refreshHandler, count, keyUpHandler }) {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const { searchName, searchCity, displayType } = useSelector(
    selectWarehousesPageState
  );

  // when you change the selected city
  const citiesNameChangeHandler = (val) => {
    dispatch(changeSearchCity(val));
  };

  // select card as display type
  const selectCardDisplayTypeHandler = () => {
    dispatch(changeDisplayType("card"));
  };

  // select list as display type
  const selectListDisplayTypeHandler = () => {
    dispatch(changeDisplayType("list"));
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
          placeholder="search-by-warehouse-name"
          onEnterPress={search}
          resetField={() => dispatch(changeSearchName(""))}
          onkeyup={keyUpHandler}
        />

        {user.type === UserTypeConstants.ADMIN && (
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
        )}
      </SearchContainer>

      {/* action's buttons */}
      <div
        className={[generalStyles.actions, generalStyles.margin_v_4].join(" ")}
      >
        {/* refresh */}
        <Icon
          foreColor={Colors.MAIN_COLOR}
          tooltip={t("refresh-tooltip")}
          onclick={refreshHandler}
          icon={() => <RiRefreshLine />}
          withBackground={true}
        />

        {/* clear search filter */}
        {(searchName.length > 0 || searchCity !== CitiesName.ALL) && (
          <Icon
            selected={false}
            foreColor={Colors.MAIN_COLOR}
            tooltip={t("clear-filter-tooltip")}
            onclick={() => {
              dispatch(resetWarehousePageState());
              refreshHandler();
            }}
            icon={() => <VscClearAll />}
            withBackground={true}
          />
        )}

        {/* display card option */}
        <Icon
          foreColor={
            displayType === "card" ? Colors.SUCCEEDED_COLOR : Colors.MAIN_COLOR
          }
          tooltip={t("show-item-as-card-tooltip")}
          onclick={selectCardDisplayTypeHandler}
          icon={() => <AiFillAppstore />}
          withBackground={true}
        />

        {/* display list option */}
        <Icon
          foreColor={
            displayType === "list" ? Colors.SUCCEEDED_COLOR : Colors.MAIN_COLOR
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
          foreColor={Colors.MAIN_COLOR}
        />
      </div>
    </>
  );
}

export default WarehousesHeader;
