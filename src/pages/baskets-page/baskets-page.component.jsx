import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";

// icons

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  cancelOperation,
  getBaskets,
  resetBaskets,
  resetBasketsArray,
  selectBaskets,
} from "../../redux/baskets/basketsSlice";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";

// components
import BasketPageHeader from "../../components/baskets-page-header/baskets-page-header.component";
import Basket from "../../components/basket/basket.component";

// constants
import { UserTypeConstants } from "../../utils/constants";

// styles
import generalStyles from "../../style.module.scss";
import NoContent from "../../components/no-content/no-content.component";

const BasketsPage = ({ onSelectedChange }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isOnline = useSelector(selectOnlineStatus);
  const { user, token } = useSelector(selectUserData);
  const { status, baskets, count, error } = useSelector(selectBaskets);

  const [isNew, setIsNew] = useState(false);

  const handleSearch = () => {
    dispatch(getBaskets({ token }));
  };

  const handleMoreResult = () => {
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    handleSearch();
  };

  const handleEnterPress = () => {
    dispatch(resetBasketsArray());
    handleSearch();
  };

  const refreshHandler = () => {
    dispatch(resetBaskets());
    handleSearch();
  };

  useEffect(() => {
    if (baskets.length === 0) handleSearch(1);

    window.scrollTo(0, 0);

    onSelectedChange();

    return () => {
      cancelOperation();
    };
  }, []);

  return user.type === UserTypeConstants.ADMIN ||
    user.type === UserTypeConstants.PHARMACY ||
    user.type === UserTypeConstants.WAREHOUSE ? (
    <>
      <BasketPageHeader isNew={isNew} setIsNew={setIsNew} />
      {count > 0 && !isNew && (
        <div className={generalStyles.count}>
          <span className={generalStyles.label}>{t("baskets-count")}</span>
          <span className={generalStyles.count}>{count}</span>
        </div>
      )}

      {count === 0 && status !== "loading" && !isNew && (
        <>
          <NoContent msg={t("no-basket-to-order")} />
        </>
      )}

      <div className={generalStyles.container_with_header}>
        <div
          style={{
            paddingInline: "10px",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          {isNew ? (
            <Basket setIsNew={setIsNew} editable={true} />
          ) : (
            baskets.map((basket) => (
              <Basket
                basket={basket}
                key={basket._id}
                editable={user.type !== UserTypeConstants.PHARMACY}
              />
            ))
          )}
        </div>
      </div>
    </>
  ) : (
    <Redirect to="/" />
  );
};

export default BasketsPage;
