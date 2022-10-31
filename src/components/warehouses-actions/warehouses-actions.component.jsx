import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import {
  changeDisplayType,
  resetWarehousePageState,
  selectWarehousesPageState,
} from "../../redux/warehouse/warehousesSlice";

// components
import Icon from "../action-icon/action-icon.component";

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

function WarehousesActions({ refreshHandler }) {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { searchName, searchCity, displayType } = useSelector(
    selectWarehousesPageState
  );

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
      {/* action's buttons */}
      <div className={[generalStyles.actions].join(" ")}>
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

export default WarehousesActions;
