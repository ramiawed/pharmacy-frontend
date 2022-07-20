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
import { RiRefreshLine } from "react-icons/ri";

// components
import Header from "../header/header.component";
import Icon from "../action-icon/action-icon.component";

// styles
import generalStyles from "../../style.module.scss";

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
      <Header>
        <h2>{t("nav-baskets")}</h2>
      </Header>
      <div
        className={[generalStyles.actions, generalStyles.margin_v_4].join(" ")}
      >
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

            <Icon
              selected={false}
              foreColor={Colors.MAIN_COLOR}
              tooltip={t("refresh-tooltip")}
              onclick={() => {
                refreshHandler();
              }}
              icon={() => <RiRefreshLine />}
              withBackground={true}
            />
          </>
        )}
      </div>
    </>
  );
}

export default BasketPageHeader;
