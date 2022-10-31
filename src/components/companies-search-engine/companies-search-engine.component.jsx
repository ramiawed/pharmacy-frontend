import React from "react";
import { useTranslation } from "react-i18next";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import {
  changeSearchCity,
  changeSearchName,
  selectCompaniesPageState,
} from "../../redux/company/companySlice";

// components
import SearchContainer from "../search-container/search-container.component";
import SearchInput from "../search-input/search-input.component";
import CitiesDropDown from "../cities-dropdown/cities-dropdown.component";
import SearchRowContainer from "../search-row-container/search-row-container.component";

function CompaniesSearchEngine({ search, keyUpHandler }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { searchName, searchCity } = useSelector(selectCompaniesPageState);

  // Guest types are (Student, Pharmacist, Employee)
  // uses with the SelectCustom
  const citiesNameChangeHandler = (val) => {
    // if the user type is Normal and the job is Student or Pharmacist
    // so the user doesn't contains info about company name and job title
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
          placeholder="search-by-company-name"
          onEnterPress={search}
          resetField={() => dispatch(changeSearchName(""))}
          onkeyup={keyUpHandler}
        />

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
      </SearchContainer>
    </>
  );
}

export default CompaniesSearchEngine;
