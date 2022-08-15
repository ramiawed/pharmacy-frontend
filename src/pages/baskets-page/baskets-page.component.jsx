import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";
import ReactLoading from "react-loading";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  cancelOperation,
  getBaskets,
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
import NoContent from "../../components/no-content/no-content.component";
import ButtonWithIcon from "../../components/button-with-icon/button-with-icon.component";

// constants
import { Colors, UserTypeConstants } from "../../utils/constants";

// styles
import generalStyles from "../../style.module.scss";

// icons
import { CgMoreVertical } from "react-icons/cg";

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

  useEffect(() => {
    if (baskets.length === 0) handleSearch();

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

      <div className={generalStyles.container_with_header}>
        {count > 0 && !isNew && (
          <div className={generalStyles.count}>
            <span className={generalStyles.label}>{t("baskets-count")}</span>
            <span className={generalStyles.count}>{count}</span>
          </div>
        )}
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

      {count === 0 && status !== "loading" && !isNew && (
        <>
          <NoContent msg={t("no-basket-to-order")} />
        </>
      )}

      {status === "loading" && (
        <div className={generalStyles.flex_container}>
          <ReactLoading color={Colors.SECONDARY_COLOR} type="cylon" />
        </div>
      )}

      {baskets.length < count && (
        <div className={generalStyles.flex_container}>
          <ButtonWithIcon
            text={t("more")}
            action={handleMoreResult}
            bgColor={Colors.SECONDARY_COLOR}
            icon={() => <CgMoreVertical />}
          />
        </div>
      )}

      {baskets.length === count && status !== "loading" && count !== 0 && (
        <p
          className={[generalStyles.center, generalStyles.fc_secondary].join(
            " "
          )}
        >
          {t("no-more")}
        </p>
      )}
    </>
  ) : (
    <Redirect to="/" />
  );
};

export default BasketsPage;
