import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";

// styles
import styles from "./modal.module.scss";

const Modal = ({
  closeModal,
  okModal,
  header,
  children,
  cancelLabel,
  okLabel,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  });

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.closable_div} onClick={closeModal}></div>
      <div className={styles.modal_content}>
        <header className={styles.modal_header} r>
          {t(header)}
        </header>
        <main className={styles.modal_body}>{children}</main>
        <footer className={styles.modal_footer}>
          <button className={styles.ok_button} onClick={okModal}>
            {t(okLabel)}
          </button>
          <button className={styles.cancel_button} onClick={closeModal}>
            {t(cancelLabel)}
          </button>
        </footer>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
