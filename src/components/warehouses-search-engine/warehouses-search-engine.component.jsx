import React from "react";
import { useTranslation } from "react-i18next";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import {
  changeSearchCity,
  changeSearchName,
  selectWarehousesPageState,
} from "../../redux/warehouse/warehousesSlice";
import { selectUser } from "../../redux/auth/authSlice";

// components
import SearchContainer from "../search-container/search-container.component";
import SearchInput from "../search-input/search-input.component";
import CitiesDropDown from "../cities-dropdown/cities-dropdown.component";
import SearchRowContainer from "../search-row-container/search-row-container.component";

// constants and utils
import { UserTypeConstants } from "../../utils/constants";

function WarehousesSearchEngine({ search, keyUpHandler }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const { searchName, searchCity } = useSelector(selectWarehousesPageState);

  // when you change the selected city
  const citiesNameChangeHandler = (val) => {
    dispatch(changeSearchCity(val));
  };

  return (
    <>
      <SearchContainer searchAction={search}>
        <SearchInput
          label="user-name"
          id="search-name"
          type="text"
          value={searchName}
          onchange={(e) => {
            dispatch(changeSearchName(e.target.value));
          }}
          placeholder="search-by-warehouse-name"
          onEnterPress={search}
          resetField={() => dispatch(changeSearchName(""))}
          onkeyup={keyUpHandler}
        />

        {user.type === UserTypeConstants.ADMIN && (
          <SearchRowContainer>
            <label>{t("user-city")}</label>
            <CitiesDropDown
              onSelectionChange={citiesNameChangeHandler}
              defaultValue={{
                value: searchCity,
                label: t(searchCity.toLowerCase()),
              }}
            />
          </SearchRowContainer>
        )}
      </SearchContainer>
    </>
  );
}

export default WarehousesSearchEngine;
