// this component display the order options and search input.
// Props:
// -	orderOptions: (Array [{value, label}]): array of the options that should provide to the Select Component.
// -	bgColor: (String) the background color.
// -	foreColor: (String) the color of the text.
// -	searchPlaceholder: (String) placeholder for search input field.
// -	searchChange: (handler) handle to execute the text in the search input change.
// -	orderChange: (handler) handler to execute when change the selected option in the Select Component

// 3-party component
import { useTranslation } from "react-i18next";
import Select from "react-select";

// style
import styles from "./select.module.scss";

function SelectCustom({
  bgColor,
  foreColor,
  orderOptions,
  onchange,
  defaultOption,
  caption,
}) {
  const { t } = useTranslation();
  // custom style for the Select Component.
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: bgColor,
      color: bgColor,
      minHeight: "30px",
      height: "30px",
      boxShadow: state.isFocused ? null : null,
      minWidth: "125px",
      borderRadius: "6px",
      marginLeft: "5px",
    }),
    menu: (provided, state) => ({
      ...provided,
      background: bgColor,
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? bgColor : foreColor,
      background: state.isSelected ? foreColor : bgColor,
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      height: "30px",
      padding: "0 6px",
      fontSize: "14px",
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
      <label>{t(caption)}</label>
      {/* third-party component react-select */}
      <Select
        styles={customStyles}
        options={orderOptions}
        defaultValue={defaultOption}
        onChange={(e) => onchange(e.value)}
      />
    </div>
  );
}

export default SelectCustom;
