import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import {
  changeDisplayType,
  changeSearchCity,
  changeSearchName,
  resetCompaniesPageState,
  selectCompaniesPageState,
} from "../../redux/company/companySlice";

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
import { CitiesName, Colors } from "../../utils/constants";

function CompaniesHeader({ search, refreshHandler, count, keyUpHandler }) {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { searchName, searchCity, displayType } = useSelector(
    selectCompaniesPageState
  );

  // Guest types are (Student, Pharmacist, Employee)
  // uses with the SelectCustom
  const citiesNameChangeHandler = (val) => {
    // if the user type is Normal and the job is Student or Pharmacist
    // so the user doesn't contains info about company name and job title
    dispatch(changeSearchCity(val));
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
          placeholder="search-by-company-name"
          onEnterPress={search}
          resetField={() => dispatch(changeSearchName(""))}
          onkeyup={keyUpHandler}
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
            }}
            icon={() => <VscClearAll />}
          />
        )}

        {/* display card option */}
        <Icon
          withBackground={true}
          foreColor={
            displayType === "card" ? Colors.SUCCEEDED_COLOR : Colors.MAIN_COLOR
          }
          tooltip={t("show-item-as-card-tooltip")}
          onclick={() => {
            dispatch(changeDisplayType("card"));
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
