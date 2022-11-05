import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router";
import ReactLoading from "react-loading";
import { useHistory } from "react-router-dom";

// components
import NoContent from "../../components/no-content/no-content.component";
import Icon from "../../components/action-icon/action-icon.component";
import ButtonWithIcon from "../../components/button-with-icon/button-with-icon.component";

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
  selectOfferMedicines,
  cancelOperation,
  resetOfferItemsArray,
  resetOfferItemsPageState,
} from "../../redux/offers/offersSlices";

// styles
import generalStyles from "../../style.module.scss";

// constants
import { Colors, UserTypeConstants } from "../../utils/constants";
import OffersSearchEngine from "../../components/offers-search-engine/offers-search-engine.component";
import ItemOfferRow from "../../components/item-offer-row/item-offer-row.component";

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

      <div className={generalStyles.container_with_header}>
        {/* <MedicinesSearchString pageState={pageState} user={user} /> */}

        <div className={generalStyles.actions}>
          <Icon
            withBackground={true}
            icon={() => <RiRefreshLine />}
            foreColor={Colors.MAIN_COLOR}
            tooltip={t("refresh-tooltip")}
            onclick={handleEnterPress}
          />
          {(pageState.searchName.length > 0 ||
            pageState.searchCompanyName.length > 0 ||
            pageState.searchWarehouseName.length > 0) && (
            <Icon
              withBackground={true}
              selected={false}
              foreColor={Colors.MAIN_COLOR}
              tooltip={t("clear-filter-tooltip")}
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
        </div>

        {count > 0 && (
          <div className={generalStyles.count}>
            <span className={generalStyles.label}>{t("offers-count")}</span>
            <span className={generalStyles.count}>{count}</span>
          </div>
        )}

        {medicines.map((medicine, index) => (
          <ItemOfferRow key={index} item={medicine} />
        ))}

        {count > 0 && status !== "loading" && (
          <div className={generalStyles.count}>
            {medicines.length} / {count}
          </div>
        )}

        {medicines.length === 0 &&
          status !== "loading" &&
          pageState.searchName.length === 0 &&
          pageState.searchCompanyName.length === 0 &&
          pageState.searchWarehouseName.length === 0 && (
            <NoContent msg={t("no-offers-at-all")} />
          )}

        {medicines.length === 0 &&
          status !== "loading" &&
          (pageState.searchName.length !== 0 ||
            pageState.searchCompanyName.length !== 0 ||
            pageState.searchWarehouseName.length !== 0) && (
            <NoContent msg={t("no-result-found")} />
          )}

        {status === "loading" && (
          <div className={generalStyles.flex_container}>
            <ReactLoading color={Colors.SECONDARY_COLOR} type="cylon" />
          </div>
        )}

        {medicines.length < count && status !== "loading" && (
          <div className={generalStyles.flex_container}>
            <ButtonWithIcon
              text={t("more")}
              action={handleMoreResult}
              bgColor={Colors.SECONDARY_COLOR}
              icon={() => <CgMoreVertical />}
            />
          </div>
        )}

        {medicines.length === count && status !== "loading" && count !== 0 && (
          <p
            className={[generalStyles.center, generalStyles.fc_secondary].join(
              " "
            )}
          >
            {t("no-more")}
          </p>
        )}
      </div>
    </>
  ) : (
    <Redirect to="/signin" />
  );
}

export default OffersPage;
