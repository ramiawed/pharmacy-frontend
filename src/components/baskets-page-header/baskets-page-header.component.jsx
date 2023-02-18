import React from "react";
import { useTranslation } from "react-i18next";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  getBaskets,
  resetBasketsArray,
} from "../../redux/baskets/basketsSlice";

// icons
import { MdAddCircle } from "react-icons/md";

// components
import Header from "../header/header.component";
import Icon from "../icon/icon.component";
import ActionBar from "../action-bar/action-bar.component";

// constants
import { Colors, UserTypeConstants } from "../../utils/constants";

function BasketPageHeader({ isNew, setIsNew }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { user, token } = useSelector(selectUserData);

  const refreshHandler = () => {
    dispatch(resetBasketsArray());
    dispatch(getBaskets({ token }));
  };

  return (
    <>
      <Header title="nav-baskets" refreshHandler={refreshHandler} />

      <ActionBar>
        {!isNew && (
          <>
            {user.type !== UserTypeConstants.PHARMACY && (
              <Icon
                selected={false}
                foreColor={Colors.MAIN_COLOR}
                tooltip={t("new-basket")}
                onclick={() => {
                  setIsNew(true);
                }}
                icon={() => <MdAddCircle size={24} />}
                withBackground={true}
              />
            )}
          </>
        )}
      </ActionBar>
    </>
  );
}

export default BasketPageHeader;
