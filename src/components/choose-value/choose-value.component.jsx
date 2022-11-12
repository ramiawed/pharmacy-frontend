import React, { useState } from "react";

import Modal from "../../modals/modal/modal.component";

import styles from "./choose-value.module.scss";

const ChooseValue = ({
  values,
  defaultValue,
  close,
  headerTitle,
  chooseHandler,
}) => {
  const [selectedValue, setSelecledValue] = useState(defaultValue);

  return (
    <Modal
      header={headerTitle}
      cancelLabel="cancel-label"
      closeModal={close}
      okLabel="ok-label"
      okModal={() => {
        chooseHandler(selectedValue);
        close();
      }}
      small={true}
    >
      <div className={styles.container}>
        {values.map((city) => (
          <label
            data-value={city.value}
            className={selectedValue === city.value ? styles.selected : ""}
            onClick={() => setSelecledValue(city.value)}
            key={city.value}
            onDoubleClick={() => {
              setSelecledValue(city.value);
              chooseHandler(selectedValue);
              close();
            }}
          >
            {city.label}
          </label>
        ))}
      </div>
    </Modal>
  );
};

export default ChooseValue;
