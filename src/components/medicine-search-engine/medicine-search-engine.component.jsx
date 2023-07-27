import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import SearchPartnerContainer from "../search-partner-container/search-partner-container.component";
import ChooserContainer from "../chooser-container/chooser-container.component";
import SearchContainer from "../search-container/search-container.component";
import CustomCheckbox from "../custom-checkbox/custom-checkbox.component";
import SearchInput from "../search-input/search-input.component";
import ChooseValue from "../choose-value/choose-value.component";

// redux stuff
import { useSelector, useDispatch } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  addIdToCompaniesIds,
  addIdToWarehousesIds,
  removeIdFromCompaniesId,
  removeIdFromWarehousesId,
  selectMedicines,
  setSearchHaveOffer,
  setSearchHavepoint,
  setSearchInWarehouse,
  setSearchName,
  setSearchOutWarehouse,
  setSearchWarehouseCompanyId,
} from "../../redux/medicines/medicinesSlices";

// icons
import { FaSearch } from "react-icons/fa";

// constants
import { UserTypeConstants } from "../../utils/constants";

// styles
import searchContainerStyles from "../../components/search-container/search-container.module.scss";

const MedicineSearchEngine = ({ handleEnterPress, keyUpHandler, location }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { pageState } = useSelector(selectMedicines);
  const { user } = useSelector(selectUserData);

  const [showChooseCompanyModal, setShowChooseCompanyModal] = useState(false);

  const companiesOptions = location?.state?.myCompanies
    ? [
        { value: "", label: t("all companies") },
        ...location.state.myCompanies?.map((c) => {
          return { value: c._id, label: c.name };
        }),
      ]
    : [];

  const selectedCompany = companiesOptions.find(
    (c) => c.value === pageState.searchWarehouseCompanyId
  );

  const changeCompanySelectionHandler = (val) => {
    if (val === "") {
      dispatch(setSearchWarehouseCompanyId(null));
      handleEnterPress();
    } else {
      const selectedCompany = companiesOptions.find((c) => c.value === val);
      dispatch(setSearchWarehouseCompanyId(selectedCompany.value));
      handleEnterPress();
    }
  };

  const isThereSearch =
    pageState.searchName.length > 0 ||
    pageState.searchCompanyName.length > 0 ||
    pageState.searchWarehouseName.length > 0 ||
    pageState.searchInWarehouse ||
    pageState.searchOutWarehouse ||
    pageState.searchHaveOffer;

  return (
    <>
      <SearchContainer
        searchAction={handleEnterPress}
        searchEngineAlert={isThereSearch}
      >
        {/* search by medicine name, barcode */}
        <SearchInput
          label="item name"
          id="search-name"
          type="text"
          value={pageState.searchName}
          onchange={(e) => {
            dispatch(setSearchName(e.target.value));
          }}
          icon={<FaSearch />}
          placeholder="search by name composition barcode"
          onEnterPress={handleEnterPress}
          resetField={() => {
            dispatch(setSearchName(""));
          }}
          onkeyup={keyUpHandler}
        />

        {/* search by company name */}
        {pageState.searchCompanyId === null &&
          pageState.searchWarehouseId === null && (
            <SearchPartnerContainer
              label={t("company")}
              partners={pageState?.searchCompaniesIds}
              addId={addIdToCompaniesIds}
              removeId={removeIdFromCompaniesId}
              partnerType={UserTypeConstants.COMPANY}
              action={handleEnterPress}
            />
          )}

        {/* search by warehouse's companies */}
        {pageState.searchWarehouseId !== null && (
          <ChooserContainer
            onclick={() => setShowChooseCompanyModal(true)}
            selectedValue={
              selectedCompany ? selectedCompany.label : t("all companies")
            }
            label="companies"
            styleForSearch={true}
            withoutBorder={true}
          />
        )}

        {pageState.searchWarehouseId === null &&
          user.type !== UserTypeConstants.GUEST &&
          user.type !== UserTypeConstants.WAREHOUSE &&
          user.type !== UserTypeConstants.COMPANY && (
            <SearchPartnerContainer
              label={t("warehouse")}
              partners={pageState?.searchWarehousesIds}
              addId={addIdToWarehousesIds}
              removeId={removeIdFromWarehousesId}
              partnerType={UserTypeConstants.WAREHOUSE}
              action={handleEnterPress}
            />
          )}

        {user.type !== UserTypeConstants.GUEST &&
          user.type !== UserTypeConstants.COMPANY &&
          !pageState.searchWarehouseId && (
            <div className={searchContainerStyles.checkbox_div}>
              <CustomCheckbox
                label={
                  user.type === UserTypeConstants.WAREHOUSE
                    ? t("in warehouse")
                    : t("in warehouses")
                }
                value={pageState.searchInWarehouse}
                changeHandler={() => {
                  dispatch(setSearchInWarehouse(!pageState.searchInWarehouse));
                  dispatch(setSearchOutWarehouse(false));
                  keyUpHandler();
                }}
              />
            </div>
          )}

        {user.type !== UserTypeConstants.GUEST &&
          user.type !== UserTypeConstants.COMPANY &&
          !pageState.searchWarehouseId && (
            <div className={searchContainerStyles.checkbox_div}>
              <CustomCheckbox
                label={
                  user.type === UserTypeConstants.WAREHOUSE
                    ? t("not in warehouse")
                    : t("not in warehouses")
                }
                value={pageState.searchOutWarehouse}
                changeHandler={() => {
                  dispatch(
                    setSearchOutWarehouse(!pageState.searchOutWarehouse)
                  );
                  dispatch(setSearchInWarehouse(false));
                  keyUpHandler();
                }}
              />
            </div>
          )}

        {user.type !== UserTypeConstants.GUEST &&
          user.type !== UserTypeConstants.COMPANY && (
            <>
              <div className={searchContainerStyles.checkbox_div}>
                <CustomCheckbox
                  label={t("have offers")}
                  value={pageState.searchHaveOffer}
                  changeHandler={() => {
                    dispatch(setSearchHaveOffer(!pageState.searchHaveOffer));
                    keyUpHandler();
                  }}
                />
              </div>

              <div className={searchContainerStyles.checkbox_div}>
                <CustomCheckbox
                  label={t("have points")}
                  value={pageState.searchHavePoint}
                  changeHandler={() => {
                    dispatch(setSearchHavepoint(!pageState.searchHavePoint));
                    keyUpHandler();
                  }}
                />
              </div>
            </>
          )}
      </SearchContainer>

      {showChooseCompanyModal && (
        <ChooseValue
          headerTitle="companies"
          close={() => {
            setShowChooseCompanyModal(false);
          }}
          values={companiesOptions}
          defaultValue={selectedCompany ? selectedCompany.value : ""}
          chooseHandler={(value) => {
            changeCompanySelectionHandler(value);
          }}
        />
      )}
    </>
  );
};

export default MedicineSearchEngine;
