import React, { useState } from "react";
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
import ChooserContainer from "../chooser-container/chooser-container.component";
import SearchContainer from "../search-container/search-container.component";
import ChooseValue from "../choose-value/choose-value.component";
import SearchInput from "../search-input/search-input.component";

// constants and utils
import { CitiesName, UserTypeConstants } from "../../utils/constants";

function WarehousesSearchEngine({ onSearch, keyUpHandler }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const { searchName, searchCity } = useSelector(selectWarehousesPageState);

  const [showChooseCityModal, setShowChooseCityModal] = useState(false);

  // guest options and its change handler
  const citiesOptions = [
    { value: CitiesName.ALL, label: t("all cities") },
    { value: CitiesName.ALEPPO, label: t("aleppo") },
    { value: CitiesName.DAMASCUS, label: t("damascus") },
    { value: CitiesName.DARAA, label: t("daraa") },
    { value: CitiesName.DEIR_EZ_ZOR, label: t("deir_ez_zor") },
    { value: CitiesName.HAMA, label: t("hama") },
    { value: CitiesName.AL_HASAKAH, label: t("al_hasakah") },
    { value: CitiesName.HOMS, label: t("homs") },
    { value: CitiesName.IDLIB, label: t("idlib") },
    { value: CitiesName.LATAKIA, label: t("latakia") },
    { value: CitiesName.QUNEITRA, label: t("quneitra") },
    { value: CitiesName.RAQQA, label: t("raqqa") },
    { value: CitiesName.AL_SUWAYDA, label: t("al_suwayda") },
    { value: CitiesName.TARTUS, label: t("tartus") },
    {
      value: CitiesName.DAMASCUS_COUNTRYSIDE,
      label: t("damascus_countryside"),
    },
  ];

  const isThereSearch =
    searchName.trim().length > 0 || searchCity !== CitiesName.ALL;

  return (
    <>
      <SearchContainer searchEngineAlert={isThereSearch}>
        <SearchInput
          label="name"
          id="search-name"
          type="text"
          value={searchName}
          onchange={(e) => {
            dispatch(changeSearchName(e.target.value));
          }}
          placeholder="search by warehouse name"
          resetField={() => dispatch(changeSearchName(""))}
        />

        {user.type === UserTypeConstants.ADMIN && (
          <ChooserContainer
            onclick={() => setShowChooseCityModal(true)}
            selectedValue={searchCity}
            label="city"
            styleForSearch={true}
            withoutBorder={true}
          />
        )}
      </SearchContainer>

      {showChooseCityModal && (
        <ChooseValue
          headerTitle="city"
          close={() => {
            setShowChooseCityModal(false);
          }}
          values={citiesOptions}
          defaultValue={searchCity}
          chooseHandler={(value) => {
            dispatch(changeSearchCity(value));
            // onSearch();
          }}
        />
      )}
    </>
  );
}

export default WarehousesSearchEngine;
