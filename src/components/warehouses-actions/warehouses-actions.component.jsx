import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import {
  changeDisplayType,
  changeSearchCity,
  changeSearchName,
  selectWarehousesPageState,
} from "../../redux/warehouse/warehousesSlice";
import { selectUser } from "../../redux/auth/authSlice";

// components
import ActionBar from "../action-bar/action-bar.component";
import Icon from "../icon/icon.component";

// react icons
import { RiRefreshLine } from "react-icons/ri";
import { AiFillAppstore } from "react-icons/ai";
import { FaListUl } from "react-icons/fa";
import { VscClearAll } from "react-icons/vsc";
import { IoMdArrowRoundBack } from "react-icons/io";

// constants and utils
import { CitiesName, Colors, UserTypeConstants } from "../../utils/constants";

function WarehousesActions({ refreshHandler }) {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

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
      <ActionBar>
        {/* refresh */}
        <Icon
          foreColor={Colors.MAIN_COLOR}
          tooltip={t("refresh")}
          onclick={refreshHandler}
          icon={() => <RiRefreshLine />}
          withBackground={true}
        />

        {/* clear search filter */}
        {(searchName.length > 0 ||
          (user.type === UserTypeConstants.ADMIN &&
            searchCity !== CitiesName.ALL)) && (
          <Icon
            selected={false}
            foreColor={Colors.MAIN_COLOR}
            tooltip={t("clear filter")}
            onclick={() => {
              dispatch(changeSearchName(""));
              dispatch(changeSearchCity(CitiesName.ALL));
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
          tooltip={t("show as card")}
          onclick={selectCardDisplayTypeHandler}
          icon={() => <AiFillAppstore />}
          withBackground={true}
        />

        {/* display list option */}
        <Icon
          foreColor={
            displayType === "list" ? Colors.SUCCEEDED_COLOR : Colors.MAIN_COLOR
          }
          tooltip={t("show as list")}
          onclick={selectListDisplayTypeHandler}
          icon={() => <FaListUl />}
          withBackground={true}
        />

        <Icon
          withBackground={true}
          tooltip={t("back")}
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

export default WarehousesActions;
