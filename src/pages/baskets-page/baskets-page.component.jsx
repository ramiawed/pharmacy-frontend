import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  cancelOperation,
  getBaskets,
  selectBaskets,
} from "../../redux/baskets/basketsSlice";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";

// components
import MainContentContainer from "../../components/main-content-container/main-content-container.component";
import BasketPageHeader from "../../components/baskets-page-header/baskets-page-header.component";
import CylonLoader from "../../components/cylon-loader/cylon-loader.component";
import ButtonWithIcon from "../../components/button-with-icon/button-with-icon.component";
import NoMoreResult from "../../components/no-more-result/no-more-result.component";
import ResultsCount from "../../components/results-count/results-count.component";
import NoContent from "../../components/no-content/no-content.component";
import Basket from "../../components/basket/basket.component";

// constants
import { Colors, UserTypeConstants } from "../../utils/constants";

// styles
import generalStyles from "../../style.module.scss";

// icons
import { CgMoreVertical } from "react-icons/cg";

const BasketsPage = ({ onSelectedChange }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  // selectors
  const isOnline = useSelector(selectOnlineStatus);
  const { user, token } = useSelector(selectUserData);
  const { status, baskets, count } = useSelector(selectBaskets);

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

      <MainContentContainer>
        {count > 0 && !isNew && (
          <ResultsCount label={t("baskets-count")} count={count} />
        )}
        <div>
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
      </MainContentContainer>

      {count === 0 && status !== "loading" && !isNew && (
        <NoContent msg={t("no-basket-to-order")} />
      )}

      {status === "loading" && <CylonLoader />}

      {baskets.length < count && (
        <div className={generalStyles.flex_container}>
          <ButtonWithIcon
            text={t("more")}
            action={handleMoreResult}
            bgColor={Colors.LIGHT_COLOR}
            icon={() => <CgMoreVertical />}
          />
        </div>
      )}

      {baskets.length === count &&
        status !== "loading" &&
        count !== 0 &&
        !isNew && <NoMoreResult msg={t("no-more")} />}
    </>
  ) : (
    <Redirect to="/" />
  );
};

export default BasketsPage;
