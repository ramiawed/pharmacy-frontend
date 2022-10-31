// this component display the order options and search input.
// Props:
// -	orderOptions: (Array [{value, label}]): array of the options that should provide to the Select Component.
// -	bgColor: (String) the background color.
// -	foreColor: (String) the color of the text.
// -	searchPlaceholder: (String) placeholder for search input field.
// -	searchChange: (handler) handle to execute the text in the search input change.
// -	orderChange: (handler) handler to execute when change the selected option in the Select Component

// 3-party component
import React from "react";
import Select from "react-select";
import { Colors } from "../../utils/constants";

// style
import styles from "./select.module.scss";

function SelectCustom({
  bgColor,
  foreColor,
  options,
  onchange,
  defaultOption,
}) {
  // custom style for the Select Component.
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: bgColor,
      color: bgColor,
      minHeight: "35px",
      height: "35px",
      maxHeight: "100px",
      boxShadow: state.isFocused ? null : null,
      borderRadius: "6px",
      flex: 1,
    }),
    menu: (provided, state) => ({
      ...provided,
      background: bgColor,
      zIndex: 15,
      maxHeight: "20px",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? bgColor : foreColor,
      background: state.isSelected ? foreColor : bgColor,
      height: "36px",
      fontSize: "16px",
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      height: "30px",
      padding: "0 6px",
      fontSize: "16px",
      color: Colors.MAIN_COLOR,
    }),

    input: (provided, state) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorSeparator: (state) => ({
      display: "none,",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "30px",
    }),
  };

  return (
    <div className={styles.order_container}>
      <Select
        styles={customStyles}
        options={options}
        defaultValue={defaultOption}
        onChange={(e) => onchange(e.value)}
      />

      {/* third-party component react-select */}
    </div>
  );
}

export default SelectCustom;
