import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router";
import ReactLoading from "react-loading";
import { useHistory, useLocation } from "react-router-dom";

// components
import NoContent from "../../components/no-content/no-content.component";
import Icon from "../../components/action-icon/action-icon.component";
import MedicinesSearchString from "../../components/medicines-search-string/medicines-search-string.component";
import MedicineRow from "../../components/medicine-row/medicine-row.component";
import ButtonWithIcon from "../../components/button-with-icon/button-with-icon.component";
import MedicineCard from "../../components/medicine-card/medicine-card.component";
import MedicineSearchEngine from "../../components/medicine-search-engine/medicine-search-engine.component";

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
  setCity,
  setDisplayType,
  resetMedicinesArray,
  resetMedicinesPageState,
} from "../../redux/medicines/medicinesSlices";

// styles
import generalStyles from "../../style.module.scss";

// constants
import { Colors, UserTypeConstants } from "../../utils/constants";

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
    if (user.type === UserTypeConstants.PHARMACY) {
      dispatch(setCity(user.city));
    } else {
      dispatch(setCity(""));
    }

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
      window.scrollTo(0, 0);
    }

    onSelectedChange();
  }, []);

  return user ? (
    <>
      <MedicineSearchEngine
        handleEnterPress={handleEnterPress}
        keyUpHandler={keyUpHandler}
        location={location}
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
            pageState.searchWarehouseName.length > 0 ||
            pageState.searchInWarehouse ||
            pageState.searchOutWarehouse) && (
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
        </div>

        {count > 0 && (
          <div className={generalStyles.count}>
            <span className={generalStyles.label}>{t("items-count")}</span>
            <span className={generalStyles.count}>{count}</span>
          </div>
        )}

        {pageState.displayType === "list" &&
          medicines.map((medicine) => (
            <MedicineRow key={medicine._id} item={medicine} />
          ))}

        {pageState.displayType === "card" && (
          <div
            className={[
              generalStyles.flex_container,
              generalStyles.margin_top_10,
            ].join(" ")}
          >
            {medicines.map((medicine) => (
              <MedicineCard key={medicine._id} companyItem={medicine} />
            ))}
          </div>
        )}

        {count > 0 && status !== "loading" && (
          <div className={generalStyles.count}>
            {medicines.length} / {count}
          </div>
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

export default MedicinesPage;
