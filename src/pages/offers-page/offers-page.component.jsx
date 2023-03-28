import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";

// components
import MainContentContainer from "../../components/main-content-container/main-content-container.component";
import OffersSearchEngine from "../../components/offers-search-engine/offers-search-engine.component";
import ButtonWithIcon from "../../components/button-with-icon/button-with-icon.component";
import NoMoreResult from "../../components/no-more-result/no-more-result.component";
import ItemOfferRow from "../../components/item-offer-row/item-offer-row.component";
import ResultsCount from "../../components/results-count/results-count.component";
import CylonLoader from "../../components/cylon-loader/cylon-loader.component";
import ActionBar from "../../components/action-bar/action-bar.component";
import NoContent from "../../components/no-content/no-content.component";
import Icon from "../../components/icon/icon.component";

// react-icons
import { RiRefreshLine } from "react-icons/ri";
import { VscClearAll } from "react-icons/vsc";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CgMoreVertical } from "react-icons/cg";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  getOffers,
  cancelOperation,
  resetOfferItemsArray,
  resetOfferItemsPageState,
  selectOfferMedicines,
} from "../../redux/itemsWithOffer/itemsWithOffersSlices";

// constants
import { Colors, UserTypeConstants } from "../../utils/constants";

let timer = null;

function OffersPage({ onSelectedChange }) {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  // selectors
  const { token, user } = useSelector(selectUserData);
  const { medicines, count, status, pageState } =
    useSelector(selectOfferMedicines);

  // handle search
  const handleSearch = () => {
    dispatch(getOffers({ token }));
  };

  const handleMoreResult = () => {
    handleSearch();
  };

  const handleEnterPress = () => {
    dispatch(resetOfferItemsArray());
    handleSearch();
  };

  const keyUpHandler = (e) => {
    cancelOperation();

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      dispatch(resetOfferItemsArray());

      handleSearch();
    }, 200);
  };

  useEffect(() => {
    if (medicines.length === 0) {
      handleSearch();
      window.scrollTo(0, 0);
    }

    onSelectedChange();
  }, []);

  return user &&
    (user.type === UserTypeConstants.PHARMACY ||
      user.type === UserTypeConstants.ADMIN) ? (
    <>
      <OffersSearchEngine
        handleEnterPress={handleEnterPress}
        keyUpHandler={keyUpHandler}
      />

      <MainContentContainer>
        <ActionBar>
          <Icon
            withBackground={true}
            icon={() => <RiRefreshLine />}
            foreColor={Colors.MAIN_COLOR}
            tooltip={t("refresh")}
            onclick={handleEnterPress}
          />
          {(pageState.searchName.length > 0 ||
            pageState.searchCompaniesIds.length > 0 ||
            pageState.searchWarehousesIds.length > 0) && (
            <Icon
              withBackground={true}
              selected={false}
              foreColor={Colors.MAIN_COLOR}
              tooltip={t("clear filter")}
              onclick={() => {
                dispatch(resetOfferItemsPageState());
                handleEnterPress();
              }}
              icon={() => <VscClearAll />}
            />
          )}

          <Icon
            withBackground={true}
            tooltip={t("go-back")}
            onclick={() => {
              history.goBack();
            }}
            icon={() => <IoMdArrowRoundBack />}
            foreColor={Colors.MAIN_COLOR}
          />
        </ActionBar>

        {count > 0 && <ResultsCount label={t("offers count")} count={count} />}

        {medicines.map((medicine, index) => (
          <ItemOfferRow
            key={index}
            item={medicine}
            index={index}
            searchString={pageState.searchName}
            type="offer"
          />
        ))}

        {count > 0 && status !== "loading" && (
          <ResultsCount count={`${medicines.length} / ${count}`} />
        )}

        {medicines.length === 0 &&
          status !== "loading" &&
          pageState.searchName.length === 0 && (
            <NoContent msg={t("no offers")} />
          )}

        {medicines.length === 0 &&
          status !== "loading" &&
          pageState.searchName.length !== 0 && (
            <NoContent msg={t("no result found")} />
          )}

        {status === "loading" && <CylonLoader />}

        {medicines.length < count && status !== "loading" && (
          <ActionBar>
            <ButtonWithIcon
              text={t("more")}
              action={handleMoreResult}
              bgColor={Colors.SUCCEEDED_COLOR}
              icon={() => <CgMoreVertical />}
            />
          </ActionBar>
        )}

        {medicines.length === count && status !== "loading" && count !== 0 && (
          <NoMoreResult msg={t("no more")} />
        )}
      </MainContentContainer>
    </>
  ) : (
    <Redirect to="/signin" />
  );
}

export default OffersPage;
