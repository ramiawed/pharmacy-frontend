import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  resetPageState,
  resetUsers,
} from "../../redux/users/usersSlice";
import { selectToken } from "../../redux/auth/authSlice";

// components
import Header from "../header/header.component";
import IconWithNumber from "../icon-with-number/icon-with-number.component";
import Icon from "../action-icon/action-icon.component";

// react icons
import { BiSortAZ } from "react-icons/bi";
import { RiRefreshLine } from "react-icons/ri";
import { HiOutlineSearch } from "react-icons/hi";

// styles
import generalStyles from "../../style.module.scss";

// constants
import {
  CitiesName,
  Colors,
  GuestJob,
  ShowWarehouseItems,
  UserActiveState,
  UserApprovedState,
  UserTypeConstants,
} from "../../utils/constants";
import { VscClearAll } from "react-icons/vsc";
import AdminUsersSearchString from "../admin-users-search-string/admin-users-search-string.component";

function AdminUsersHeader({
  count,
  pageState,
  showSearchModalHandler,
  showOrderModalHandler,
}) {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    searchName,
    searchCity,
    searchEmployeeName,
    searchCertificateName,
    searchCompanyName,
    searchMobile,
    searchJobTitle,
    approved,
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
    (approved === UserApprovedState.ALL ? 0 : 1) +
    (active === UserActiveState.ALL ? 0 : 1) +
    (userType === UserTypeConstants.ALL ? 0 : 1) +
    (searchJob === GuestJob.NONE ? 0 : 1) +
    (showItems === ShowWarehouseItems.ALL ? 0 : 1) +
    (searchMobile.length > 0 ? 1 : 0);

  const orderFilterCount = Object.entries(pageState.orderBy).length;

  const token = useSelector(selectToken);

  const refreshHandler = () => {
    dispatch(resetUsers());
    dispatch(getUsers({ token }));
  };

  const keyDownHandler = (e) => {
    if (e.code === "F5") {
      refreshHandler();
    }

    if (e.code === "F2") {
      showSearchModalHandler();
    }

    if (e.code === "F4") {
      showOrderModalHandler();
    }

    // if (e.code === "Backspace") {
    //   history.goBack();
    // }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler, false);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });

  return (
    <>
      <Header>
        <h2>
          {t("partners")} <span>{count}</span>
        </h2>
        <AdminUsersSearchString />
      </Header>
      <div
        className={[generalStyles.actions, generalStyles.margin_v_4].join(" ")}
      >
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

        <div onClick={showSearchModalHandler}>
          <IconWithNumber
            value={searchFilterCount}
            fillIcon={
              <div className={[generalStyles.icon]}>
                <HiOutlineSearch size={16} color={Colors.MAIN_COLOR} />
              </div>
            }
            noFillIcon={
              <div className={generalStyles.icon}>
                <HiOutlineSearch size={16} color={Colors.MAIN_COLOR} />
              </div>
            }
            small={true}
            tooltip={t("search")}
            withBackground={true}
          />
        </div>

        <div onClick={showOrderModalHandler}>
          <IconWithNumber
            value={orderFilterCount}
            fillIcon={
              <div className={generalStyles.icon}>
                <BiSortAZ size={16} color={Colors.MAIN_COLOR} />
              </div>
            }
            noFillIcon={
              <div className={generalStyles.icon}>
                <BiSortAZ size={16} color={Colors.MAIN_COLOR} />
              </div>
            }
            small={true}
            tooltip={t("sort-results")}
            withBackground={true}
          />
        </div>
      </div>
    </>
  );
}

export default AdminUsersHeader;
