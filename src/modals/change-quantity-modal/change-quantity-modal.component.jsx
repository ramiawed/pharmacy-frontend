import React from "react";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { onKeyPressForNumberInput } from "../../utils/constants";
import Modal from "../modal/modal.component";

import styles from "./change-quantity-modal.module.scss";

const ChangeQuantityModal = ({
  okModal,
  value,
  closeModal,
  min,
  max,
  step,
}) => {
  const { t } = useTranslation();

  const [inputValue, setInputValue] = useState(value);
  const [error, setError] = useState(false);
  const inputValueRef = useRef();

  const changeValueHandler = (e) => {
    setInputValue(e.target.value);
    setError(false);
  };

  const confirmValueHandler = () => {
    if (!inputValue) {
      setError(true);
      return;
    }
    if (inputValue < min || inputValue > max) {
      setError(true);
      return;
    }

    okModal(inputValue);
  };

  useEffect(() => {
    inputValueRef.current.focus();
  }, []);

  return (
    <Modal
      header={t("enter value")}
      closeModal={closeModal}
      cancelLabel={t("cancel")}
      okLabel={t("ok")}
      small={true}
      okModal={confirmValueHandler}
    >
      <input
        className={[styles.input, error ? styles.error : ""].join(" ")}
        onKeyPress={onKeyPressForNumberInput}
        value={inputValue}
        onChange={(e) => changeValueHandler(e)}
        type="number"
        min={min}
        max={max}
        step={step}
        ref={inputValueRef}
      />
    </Modal>
  );
};

export default ChangeQuantityModal;
