import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import {
  changeDisplayType,
  changeSearchCity,
  changeSearchName,
  selectCompaniesPageState,
} from "../../redux/company/companySlice";

// components
import Icon from "../icon/icon.component";
import ActionBar from "../action-bar/action-bar.component";

// react icons
import { RiRefreshLine } from "react-icons/ri";
import { AiFillAppstore } from "react-icons/ai";
import { FaListUl } from "react-icons/fa";
import { VscClearAll } from "react-icons/vsc";
import { IoMdArrowRoundBack } from "react-icons/io";

// constants and utils
import { CitiesName, Colors } from "../../utils/constants";

function CompaniesActions({ refreshHandler }) {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { searchName, searchCity, displayType } = useSelector(
    selectCompaniesPageState
  );

  return (
    <>
      <ActionBar>
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
              dispatch(changeSearchName(""));
              dispatch(changeSearchCity(CitiesName.ALL));
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
      </ActionBar>
    </>
  );
}

export default CompaniesActions;
