import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import {
  changeSearchCity,
  changeSearchName,
  selectWarehousesPageState,
} from "../../redux/warehouse/warehousesSlice";
import { selectUser } from "../../redux/auth/authSlice";

// components
import CustomButton from "../custom-button/custom-button.component";
import ActionBar from "../action-bar/action-bar.component";

// react icons
import { RiRefreshLine } from "react-icons/ri";
import { VscClearAll } from "react-icons/vsc";
import { IoMdArrowRoundBack } from "react-icons/io";

// constants and utils
import { CitiesName, UserTypeConstants } from "../../utils/constants";

// context
import { useTheme } from "../../contexts/themeContext";

function WarehousesActions({ refreshHandler }) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const { searchName, searchCity } = useSelector(selectWarehousesPageState);

  return (
    <ActionBar>
      {/* clear search filter */}
      {(searchName.length > 0 ||
        (user.type === UserTypeConstants.ADMIN &&
          searchCity !== CitiesName.ALL)) && (
        <CustomButton
          icon={() => <VscClearAll />}
          onClickHandler={() => {
            dispatch(changeSearchName(""));
            dispatch(changeSearchCity(CitiesName.ALL));
          }}
          classname={`${
            theme === "light" ? "bg-dark text-white" : "d-primary500-mixed300"
          }`}
          tooltip={t("clear filter")}
        />
      )}

      {/* refresh */}
      <CustomButton
        icon={() => <RiRefreshLine />}
        onClickHandler={() => {
          refreshHandler();
        }}
        classname={`${
          theme === "light" ? "bg-dark text-white" : "d-primary500-mixed300"
        }`}
        tooltip={t("refresh")}
      />

      {/* back button */}
      <CustomButton
        icon={() => <IoMdArrowRoundBack />}
        onClickHandler={() => {
          history.goBack();
        }}
        classname={`${
          theme === "light" ? "bg-dark text-white" : "d-primary500-mixed300"
        }`}
        tooltip={t("back")}
      />
    </ActionBar>
  );
}

export default WarehousesActions;
