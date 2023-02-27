import React from "react";
import { useTranslation } from "react-i18next";

// redux stuff
import { useSelector, useDispatch } from "react-redux";
import {
  addIdToCompaniesIds,
  addIdToWarehousesIds,
  removeIdFromCompaniesId,
  removeIdFromWarehousesId,
  selectOfferMedicines,
  setSearchName,
} from "../../redux/itemsWithOffer/itemsWithOffersSlices";

// components
import SearchPartnerContainer from "../search-partner-container/search-partner-container.component";
import SearchContainer from "../search-container/search-container.component";
import SearchInput from "../search-input/search-input.component";

// icons
import { FaSearch } from "react-icons/fa";

// constants
import { UserTypeConstants } from "../../utils/constants";

const OffersSearchEngine = ({ handleEnterPress, keyUpHandler }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { pageState } = useSelector(selectOfferMedicines);

  const isThereSearch =
    pageState.searchName.length > 0 ||
    pageState.searchCompaniesIds.length > 0 ||
    pageState.searchWarehousesIds.length > 0;

  return (
    <SearchContainer
      searchAction={handleEnterPress}
      searchEngineAlert={isThereSearch}
    >
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

      <SearchPartnerContainer
        label={t("item-company")}
        partners={pageState?.searchCompaniesIds}
        addId={addIdToCompaniesIds}
        removeId={removeIdFromCompaniesId}
        partnerType={UserTypeConstants.COMPANY}
        action={handleEnterPress}
      />

      <SearchPartnerContainer
        label={t("item-warehouse")}
        partners={pageState?.searchWarehousesIds}
        addId={addIdToWarehousesIds}
        removeId={removeIdFromWarehousesId}
        partnerType={UserTypeConstants.WAREHOUSE}
        action={handleEnterPress}
      />
    </SearchContainer>
  );
};

export default OffersSearchEngine;
