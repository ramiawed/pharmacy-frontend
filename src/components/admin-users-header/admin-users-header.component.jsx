import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { getUsers, resetUsers } from "../../redux/users/usersSlice";
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
import { Colors } from "../../utils/constants";

function AdminUsersHeader({
  count,
  pageState,
  showSearchModalHandler,
  showOrderModalHandler,
}) {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

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

    if (e.code === "Backspace") {
      history.goBack();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler, false);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });

  return (
    <Header>
      <h2>
        {t("partners")} <span>{count}</span>
      </h2>

      <div
        className={[generalStyles.actions, generalStyles.margin_v_4].join(" ")}
      >
        <Icon
          selected={false}
          foreColor={Colors.SECONDARY_COLOR}
          tooltip={t("refresh-tooltip")}
          icon={() => <RiRefreshLine />}
          onclick={refreshHandler}
        />

        <div onClick={showSearchModalHandler}>
          <IconWithNumber
            value={0}
            fillIcon={
              <div className={[generalStyles.icon]}>
                <HiOutlineSearch size={16} color={Colors.SECONDARY_COLOR} />
              </div>
            }
            noFillIcon={
              <div className={generalStyles.icon}>
                <HiOutlineSearch size={16} color={Colors.SECONDARY_COLOR} />
              </div>
            }
            small={true}
            tooltip={t("search")}
          />
        </div>

        <div onClick={showOrderModalHandler}>
          <IconWithNumber
            value={Object.entries(pageState.orderBy).length}
            fillIcon={
              <div className={generalStyles.icon}>
                <BiSortAZ size={16} color={Colors.SECONDARY_COLOR} />
              </div>
            }
            noFillIcon={
              <div className={generalStyles.icon}>
                <BiSortAZ size={16} color={Colors.SECONDARY_COLOR} />
              </div>
            }
            small={true}
            tooltip={t("sort-results")}
          />
        </div>
      </div>
    </Header>
  );
}

export default AdminUsersHeader;
