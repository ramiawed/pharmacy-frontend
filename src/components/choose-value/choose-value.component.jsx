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
      cancelLabel="cancel"
      closeModal={close}
      okLabel="ok"
      okModal={() => {
        chooseHandler(selectedValue);
        close();
      }}
      small={true}
    >
      <div className={styles.container}>
        {values.map((val) => (
          <label
            data-value={val.value}
            className={selectedValue === val.value ? styles.selected : ""}
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
