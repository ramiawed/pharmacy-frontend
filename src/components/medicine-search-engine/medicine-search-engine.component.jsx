import React from "react";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  selectMedicines,
  setSearchCompanyName,
  setSearchHaveOffer,
  setSearchInWarehouse,
  setSearchName,
  setSearchOutWarehouse,
  setSearchWarehouseName,
} from "../../redux/medicines/medicinesSlices";
import { Colors, UserTypeConstants } from "../../utils/constants";
import SearchContainer from "../search-container/search-container.component";
import SearchInput from "../search-input/search-input.component";
import SearchRowContainer from "../search-row-container/search-row-container.component";
import SelectCustom from "../select/select.component";

// styles
import searchContainerStyles from "../../components/search-container/search-container.module.scss";

const MedicineSearchEngine = ({ handleEnterPress, keyUpHandler, location }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { pageState } = useSelector(selectMedicines);
  const { user } = useSelector(selectUserData);

  const companiesOptions = [
    { value: "", label: t("all-companies") },
    ...location.state.myCompanies.map((c) => {
      return { value: c._id, label: c.name };
    }),
  ];

  const selectedCompany = companiesOptions.find(
    (c) => c.label === pageState.searchCompanyName
  );

  const changeCompanySelectionHandler = (val) => {
    if (val === "") {
      dispatch(setSearchCompanyName(""));
      handleEnterPress();
    } else {
      const selectedCompany = companiesOptions.find((c) => c.value === val);
      dispatch(setSearchCompanyName(selectedCompany.label));
      handleEnterPress();
    }
  };

  return (
    <SearchContainer searchAction={handleEnterPress}>
      {/* search by medicine name, barcode */}
      <SearchInput
        label="user-name"
        id="search-name"
        type="text"
        value={pageState.searchName}
        onchange={(e) => {
          dispatch(setSearchName(e.target.value));
        }}
        icon={<FaSearch />}
        placeholder="search-by-name-composition-barcode"
        onEnterPress={handleEnterPress}
        resetField={() => {
          dispatch(setSearchName(""));
        }}
        onkeyup={keyUpHandler}
      />

      {/* search by company name */}
      {pageState.searchCompanyId === null &&
        pageState.searchWarehouseId === null && (
          <SearchInput
            label="item-company"
            id="item-company"
            type="text"
            value={pageState.searchCompanyName}
            onchange={(e) => {
              dispatch(setSearchCompanyName(e.target.value));
            }}
            icon={<FaSearch />}
            placeholder="search-by-company-name"
            onEnterPress={handleEnterPress}
            resetField={() => {
              dispatch(setSearchCompanyName(""));
            }}
            onkeyup={keyUpHandler}
          />
        )}

      {/* <SearchPartnerContainer
        label={t("item-company")}
        partners={pageState?.searchCompaniesIds}
        addId={addIdToCompaniesIds}
        removeId={removeIdFromCompaniesId}
        partnerType={UserTypeConstants.COMPANY}
      />*/}

      {/* search by warehouse's companies */}
      {pageState.searchWarehouseId !== null && (
        <SearchRowContainer>
          <label>{t("companies")}</label>
          <SelectCustom
            bgColor={Colors.SECONDARY_COLOR}
            foreColor="#fff"
            options={companiesOptions}
            onchange={changeCompanySelectionHandler}
            defaultOption={
              selectedCompany
                ? selectedCompany
                : {
                    value: "",
                    label: t("all-companies"),
                  }
            }
          />
        </SearchRowContainer>
      )}

      {pageState.searchWarehouseId === null &&
        user.type !== UserTypeConstants.GUEST && (
          <SearchInput
            label="item-warehouse"
            id="item-warehouse"
            type="text"
            value={pageState.searchWarehouseName}
            onchange={(e) => {
              dispatch(setSearchWarehouseName(e.target.value));
            }}
            icon={<FaSearch />}
            placeholder="search-by-warehouse-name"
            onEnterPress={handleEnterPress}
            resetField={() => {
              dispatch(setSearchWarehouseName(""));
            }}
            onkeyup={keyUpHandler}
          />
        )}

      {/* <SearchPartnerContainer
        label={t("item-warehouse")}
        partners={pageState?.searchWarehousesIds}
        addId={addIdToWarehousesIds}
        removeId={removeIdFromWarehousesId}
        partnerType={UserTypeConstants.WAREHOUSE}
      /> */}

      {user.type !== UserTypeConstants.GUEST && !pageState.searchWarehouseId && (
        <div className={searchContainerStyles.checkbox_div}>
          <input
            id="inWarehouseCkbox"
            type="checkbox"
            value={pageState.searchInWarehouse}
            checked={pageState.searchInWarehouse}
            onChange={() => {
              dispatch(setSearchInWarehouse(!pageState.searchInWarehouse));
              dispatch(setSearchOutWarehouse(false));
              keyUpHandler();
            }}
          />
          {user.type === UserTypeConstants.WAREHOUSE && (
            <label htmlFor="inWarehouseCkbox">
              {t("warehouse-in-warehouse")}
            </label>
          )}
          {user.type !== UserTypeConstants.WAREHOUSE && (
            <label htmlFor="inWarehouseCkbox">
              {t("pharmacy-in-warehouse")}
            </label>
          )}
        </div>
      )}

      {user.type !== UserTypeConstants.GUEST && !pageState.searchWarehouseId && (
        <div className={searchContainerStyles.checkbox_div}>
          <input
            id="outWarehouseCkbox"
            type="checkbox"
            value={pageState.searchOutWarehouse}
            checked={pageState.searchOutWarehouse}
            onChange={() => {
              dispatch(setSearchOutWarehouse(!pageState.searchOutWarehouse));
              dispatch(setSearchInWarehouse(false));
              keyUpHandler();
            }}
          />
          {user.type === UserTypeConstants.WAREHOUSE && (
            <label htmlFor="outWarehouseCkbox">
              {t("warehouse-out-warehouse")}
            </label>
          )}
          {user.type !== UserTypeConstants.WAREHOUSE && (
            <label htmlFor="outWarehouseCkbox">
              {t("pharmacy-out-warehouse")}
            </label>
          )}
        </div>
      )}

      {user.type !== UserTypeConstants.GUEST &&
        (pageState.searchWarehouseId || pageState.searchCompanyId) && (
          <div className={searchContainerStyles.checkbox_div}>
            <input
              id="medicineHaveOfferCkbox"
              type="checkbox"
              value={pageState.searchHaveOffer}
              checked={pageState.searchHaveOffer}
              onChange={() => {
                dispatch(setSearchHaveOffer(!pageState.searchHaveOffer));
                keyUpHandler();
              }}
            />
            <label htmlFor="medicineHaveOfferCkbox">
              {t("medicies-have-offer-label")}
            </label>
          </div>
        )}
    </SearchContainer>
  );
};

export default MedicineSearchEngine;
