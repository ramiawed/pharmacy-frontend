import React, { useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectUserData } from "../../redux/auth/authSlice";
import {
  addIdToWarehousesIds,
  cancelOperation,
  getBaskets,
  removeIdFromWarehousesId,
  resetBasketsArray,
  selectBaskets,
} from "../../redux/baskets/basketsSlice";

// components
import SearchPartnerContainer from "../../components/search-partner-container/search-partner-container.component";
import MainContentContainer from "../../components/main-content-container/main-content-container.component";
import SearchContainer from "../../components/search-container/search-container.component";
import ButtonWithIcon from "../../components/button-with-icon/button-with-icon.component";
import ResultsCount from "../../components/results-count/results-count.component";
import NoMoreResult from "../../components/no-more-result/no-more-result.component";
import CylonLoader from "../../components/cylon-loader/cylon-loader.component";
import NoContent from "../../components/no-content/no-content.component";
import ActionBar from "../../components/action-bar/action-bar.component";
import Basket from "../../components/basket/basket.component";
import Icon from "../../components/icon/icon.component";

// icons
import { IoMdArrowRoundBack } from "react-icons/io";
import { CgMoreVertical } from "react-icons/cg";
import { RiRefreshLine } from "react-icons/ri";

// constants
import { Colors, UserTypeConstants } from "../../utils/constants";

const SpecialOffersPage = ({ onSelectedChange }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { token } = useSelector(selectUserData);
  const { status, baskets, count, pageState } = useSelector(selectBaskets);

  const handleSearch = () => {
    dispatch(getBaskets({ token }));
  };

  const handleMoreResult = () => {
    // if (!isOnline) {
    //   dispatch(changeOnlineMsg());
    //   return;
    // }

    handleSearch();
  };

  const handleEnterPress = () => {
    dispatch(resetBasketsArray());
    handleSearch();
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (baskets.length === 0) handleSearch();

    window.scrollTo(0, 0);

    onSelectedChange();

    return () => {
      cancelOperation();
    };
  }, []);
  return user.type === UserTypeConstants.PHARMACY ? (
    <>
      <SearchContainer>
        <SearchPartnerContainer
          label={t("warehouse")}
          partners={pageState?.searchWarehousesIds}
          addId={addIdToWarehousesIds}
          removeId={removeIdFromWarehousesId}
          partnerType={UserTypeConstants.WAREHOUSE}
          action={handleEnterPress}
        />
      </SearchContainer>
      <ActionBar>
        <Icon
          withBackground={true}
          icon={() => <RiRefreshLine />}
          foreColor={Colors.MAIN_COLOR}
          tooltip={t("refresh")}
          onclick={handleEnterPress}
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
      <MainContentContainer>
        {count > 0 && <ResultsCount label={t("baskets count")} count={count} />}
        {baskets?.map((basket) => (
          <Basket basket={basket} key={basket._id} editable={false} />
        ))}

        {count === 0 && status !== "loading" && (
          <NoContent msg={t("no basket to order")} />
        )}
        {status === "loading" && <CylonLoader />}
        {count > 0 && status !== "loading" && (
          <ResultsCount count={`${baskets.length} / ${count}`} />
        )}
        {baskets.length < count && (
          <ActionBar>
            <ButtonWithIcon
              text={t("more")}
              action={handleMoreResult}
              bgColor={Colors.LIGHT_COLOR}
              icon={() => <CgMoreVertical />}
            />
          </ActionBar>
        )}
        {baskets.length === count && status !== "loading" && count !== 0 && (
          <NoMoreResult msg={t("no more")} />
        )}
      </MainContentContainer>
    </>
  ) : (
    <Redirect to="/" />
  );
};

export default SpecialOffersPage;
