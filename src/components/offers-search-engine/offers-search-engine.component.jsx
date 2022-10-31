import React from "react";

// redux stuff
import { useSelector, useDispatch } from "react-redux";
import {
  selectOfferMedicines,
  setSearchCompanyName,
  setSearchName,
  setSearchWarehouseName,
} from "../../redux/offers/offersSlices";

// components
import SearchContainer from "../search-container/search-container.component";
import SearchInput from "../search-input/search-input.component";

// icons
import { FaSearch } from "react-icons/fa";

const OffersSearchEngine = ({ handleEnterPress, keyUpHandler }) => {
  const dispatch = useDispatch();
  const { pageState } = useSelector(selectOfferMedicines);

  return (
    <SearchContainer searchAction={handleEnterPress}>
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
    </SearchContainer>
  );
};

export default OffersSearchEngine;
