import React from "react";
import { useTranslation } from "react-i18next";

// components
import SelectCustom from "../select/select.component";

// constants
import { CitiesName, Colors } from "../../utils/constants";

function CitiesDropDown({ onSelectionChange, defaultValue, caption }) {
  const { t } = useTranslation();

  const citiesOptions = [
    { value: CitiesName.ALL, label: t("all-cities") },
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

  return (
    <>
      <SelectCustom
        bgColor={Colors.SECONDARY_COLOR}
        foreColor="#fff"
        options={citiesOptions}
        onchange={onSelectionChange}
        defaultOption={defaultValue}
      />
    </>
  );
}

export default CitiesDropDown;
