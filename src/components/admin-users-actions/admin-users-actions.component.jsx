import React from "react";
import { useTranslation } from "react-i18next";

// components
import ActionBar from "../action-bar/action-bar.component";
import Icon from "../icon/icon.component";

// redux stuff
import { useDispatch } from "react-redux";
import { resetPageState } from "../../redux/users/usersSlice";

// react icons
import { BiSortAZ } from "react-icons/bi";
import { RiRefreshLine } from "react-icons/ri";
import { VscClearAll } from "react-icons/vsc";

// constants
import {
  Colors,
  CitiesName,
  GuestJob,
  ShowWarehouseItems,
  UserActiveState,
  UserTypeConstants,
} from "../../utils/constants";
import { FiFilter } from "react-icons/fi";

const AdminUsersActions = ({
  refreshHandler,
  pageState,
  showOrderModalHandler,
  showSearchModalHandler,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    searchName,
    searchCity,
    searchEmployeeName,
    searchCertificateName,
    searchCompanyName,
    searchMobile,
    searchJobTitle,
    active,
    userType,
    searchJob,
    showItems,
  } = pageState;

  const searchFilterCount =
    (searchName.length > 0 ? 1 : 0) +
    (searchCity === CitiesName.ALL ? 0 : 1) +
    (searchJobTitle.length > 0 ? 1 : 0) +
    (searchEmployeeName.length > 0 ? 1 : 0) +
    (searchCertificateName.length > 0 ? 1 : 0) +
    (searchCompanyName.length > 0 ? 1 : 0) +
    (active === UserActiveState.ALL ? 0 : 1) +
    (userType === UserTypeConstants.ALL ? 0 : 1) +
    (searchJob === GuestJob.NONE ? 0 : 1) +
    (showItems === ShowWarehouseItems.ALL ? 0 : 1) +
    (searchMobile.length > 0 ? 1 : 0);

  const orderFilterCount = Object.entries(pageState.orderBy).length;
  return (
    <ActionBar>
      <Icon
        selected={false}
        foreColor={Colors.MAIN_COLOR}
        tooltip={t("refresh-tooltip")}
        icon={() => <RiRefreshLine />}
        onclick={refreshHandler}
        withBackground={true}
      />

      {searchFilterCount || orderFilterCount ? (
        <Icon
          selected={false}
          foreColor={Colors.MAIN_COLOR}
          tooltip={t("clear-filter-tooltip")}
          onclick={() => {
            dispatch(resetPageState());
            refreshHandler();
          }}
          icon={() => <VscClearAll />}
          withBackground={true}
        />
      ) : null}

      <Icon
        icon={() => <FiFilter size={18} color={Colors.MAIN_COLOR} />}
        onclick={showSearchModalHandler}
        tooltip={t("search")}
        withBackground={true}
        withAlertIcon={searchFilterCount > 0}
      />

      <Icon
        icon={() => <BiSortAZ size={18} color={Colors.MAIN_COLOR} />}
        onclick={showOrderModalHandler}
        tooltip={t("sort-results")}
        withBackground={true}
        withAlertIcon={orderFilterCount > 0}
      />
    </ActionBar>
  );
};

export default AdminUsersActions;
