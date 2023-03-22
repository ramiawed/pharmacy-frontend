import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router";
import { useHistory, useLocation } from "react-router-dom";

// components
import MainContentContainer from "../../components/main-content-container/main-content-container.component";
import MedicineSearchEngine from "../../components/medicine-search-engine/medicine-search-engine.component";
import CenterContainer from "../../components/center-container/center-container.component";
import ButtonWithIcon from "../../components/button-with-icon/button-with-icon.component";
import NoMoreResult from "../../components/no-more-result/no-more-result.component";
import MedicineCard from "../../components/medicine-card/medicine-card.component";
import ResultsCount from "../../components/results-count/results-count.component";
import CylonLoader from "../../components/cylon-loader/cylon-loader.component";
import MedicineRow from "../../components/medicine-row/medicine-row.component";
import ActionBar from "../../components/action-bar/action-bar.component";
import NoContent from "../../components/no-content/no-content.component";
import Icon from "../../components/icon/icon.component";

// react-icons
import { FaListUl } from "react-icons/fa";
import { RiRefreshLine } from "react-icons/ri";
import { AiFillAppstore } from "react-icons/ai";
import { VscClearAll } from "react-icons/vsc";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CgMoreVertical } from "react-icons/cg";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  getMedicines,
  selectMedicines,
  cancelOperation,
  setDisplayType,
  resetMedicinesArray,
  resetMedicinesPageState,
} from "../../redux/medicines/medicinesSlices";

// constants
import { Colors } from "../../utils/constants";

let timer = null;

function MedicinesPage({ onSelectedChange }) {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  // selectors
  const { token, user } = useSelector(selectUserData);
  const { medicines, count, status, pageState } = useSelector(selectMedicines);

  // handle search
  const handleSearch = () => {
    dispatch(getMedicines({ token }));
  };

  const handleMoreResult = () => {
    handleSearch();
  };

  const handleEnterPress = () => {
    dispatch(resetMedicinesArray());
    handleSearch();
  };

  const keyUpHandler = (e) => {
    cancelOperation();

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      dispatch(resetMedicinesArray());

      handleSearch();
    }, 200);
  };

  useEffect(() => {
    if (medicines.length === 0) {
      handleSearch();
    }
    window.scrollTo(0, 0);

    onSelectedChange();
  }, []);

  return user ? (
    <>
      <MedicineSearchEngine
        handleEnterPress={handleEnterPress}
        keyUpHandler={keyUpHandler}
        location={location}
      />
      <MainContentContainer>
        <ActionBar>
          <Icon
            withBackground={true}
            icon={() => <RiRefreshLine />}
            foreColor={Colors.MAIN_COLOR}
            tooltip={t("refresh-tooltip")}
            onclick={handleEnterPress}
          />
          {(pageState.searchName.length > 0 ||
            pageState.searchCompanyName.length > 0 ||
            pageState.searchWarehouseName.length > 0 ||
            pageState.searchInWarehouse ||
            pageState.searchOutWarehouse ||
            pageState.searchHaveOffer) && (
            <Icon
              withBackground={true}
              selected={false}
              foreColor={Colors.MAIN_COLOR}
              tooltip={t("clear-filter-tooltip")}
              onclick={() => {
                dispatch(resetMedicinesPageState());
                handleEnterPress();
              }}
              icon={() => <VscClearAll />}
            />
          )}

          <Icon
            withBackground={true}
            icon={() => <AiFillAppstore />}
            foreColor={
              pageState.displayType === "card"
                ? Colors.SUCCEEDED_COLOR
                : Colors.MAIN_COLOR
            }
            tooltip={t("show-item-as-card-tooltip")}
            onclick={() => dispatch(setDisplayType("card"))}
          />

          <Icon
            withBackground={true}
            icon={() => <FaListUl />}
            foreColor={
              pageState.displayType === "list"
                ? Colors.SUCCEEDED_COLOR
                : Colors.MAIN_COLOR
            }
            tooltip={t("show-item-as-row-tooltip")}
            onclick={() => dispatch(setDisplayType("list"))}
          />

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

        {count > 0 && <ResultsCount label={t("items-count")} count={count} />}

        {pageState.displayType === "list" &&
          medicines.map((medicine, index) => (
            <MedicineRow
              key={medicine._id}
              item={medicine}
              index={index}
              searchString={pageState.searchName}
              showComposition={true}
            />
          ))}

        {pageState.displayType === "card" && (
          <CenterContainer>
            {medicines.map((medicine) => (
              <MedicineCard
                key={medicine._id}
                item={medicine}
                searchString={pageState.searchName}
              />
            ))}
          </CenterContainer>
        )}

        {count > 0 && status !== "loading" && (
          <ResultsCount count={`${medicines.length} / ${count}`} />
        )}

        {medicines.length === 0 &&
          status !== "loading" &&
          pageState.searchName.length === 0 &&
          pageState.searchCompanyName.length === 0 &&
          pageState.searchWarehouseName.length === 0 &&
          !pageState.searchInWarehouse &&
          !pageState.searchOutWarehouse && <NoContent msg={t("no-items")} />}

        {medicines.length === 0 &&
          status !== "loading" &&
          (pageState.searchName.length !== 0 ||
            pageState.searchCompanyName.length !== 0 ||
            pageState.searchWarehouseName.length !== 0 ||
            pageState.searchInWarehouse ||
            pageState.searchOutWarehouse) && (
            <NoContent msg={t("no-result-found")} />
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
          <NoMoreResult msg={t("no-more")} />
        )}
      </MainContentContainer>
    </>
  ) : (
    <Redirect to="/signin" />
  );
}

export default MedicinesPage;
