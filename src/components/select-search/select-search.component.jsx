import React from "react";
import { useTranslation } from "react-i18next";

// components
import SelectCustom from "../select/select.component";

// constants
import { Colors } from "../../utils/constants";

// styles
import SearchRowContainer from "../search-row-container/search-row-container.component";

const SelectSearch = ({ options, changeHandler, defaultOption, text }) => {
  const { t } = useTranslation();
  return (
    <SearchRowContainer>
      <label>{t(text)}</label>
      <SelectCustom
        bgColor={Colors.SECONDARY_COLOR}
        foreColor="#fff"
        options={options}
        onchange={changeHandler}
        defaultOption={defaultOption}
      />
    </SearchRowContainer>
  );
};

export default SelectSearch;
