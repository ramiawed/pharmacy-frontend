import React, { useState } from "react";

import Modal from "../../modals/modal/modal.component";

import { useTheme } from "../../contexts/themeContext";

const ChooseValue = ({
  values,
  defaultValue,
  close,
  headerTitle,
  chooseHandler,
}) => {
  const { theme } = useTheme();
  const [selectedValue, setSelecledValue] = useState(defaultValue);

  return (
    <Modal
      headerText={headerTitle}
      cancelText="cancel"
      closeHandler={close}
      okText="ok"
      okHandler={() => {
        chooseHandler(selectedValue);
        close();
      }}
      showFooter={true}
    >
      <div className="w-full max-h-[200px] overflow-scroll flex flex-row flex-wrap justify-evenly">
        {values.map((val) => (
          <label
            data-value={val.value}
            className={`inline-block w-full sm:w-5/12 text-center p-1 m-1 rounded-md cursor-pointer ${
              theme === "light"
                ? "bg-dark text-white"
                : "d-mixed100-primary300 hover:d-primary500-mixed300"
            } ${
              selectedValue === val.value
                ? theme === "light"
                  ? "bg-green text-white"
                  : "d-primary300-mixed300"
                : ""
            }`}
            // className={selectedValue === val.value ? styles.selected : ""}
            onClick={() => setSelecledValue(val.value)}
            key={val.value}
            onDoubleClick={() => {
              setSelecledValue(val.value);
              chooseHandler(selectedValue);
              close();
            }}
          >
            {val.label}
          </label>
        ))}
      </div>
    </Modal>
  );
};

export default ChooseValue;
