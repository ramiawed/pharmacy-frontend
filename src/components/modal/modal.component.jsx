import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";

// styles
import styles from "./modal.module.scss";
import generalStyles from "../../style.module.scss";

const Modal = ({
  closeModal,
  okModal,
  header,
  children,
  cancelLabel,
  okLabel,
  small,
  warning,
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
      <div
        className={[
          styles.modal_content,
          small ? styles.small_content : "",
        ].join(" ")}
      >
        <header
          className={[
            styles.modal_header,
            warning ? generalStyles.bg_yellow : "",
          ].join(" ")}
          r
        >
          {t(header)}
        </header>
        <main className={styles.modal_body}>{children}</main>
        <footer className={styles.modal_footer}>
          {okModal && (
            <button className={styles.ok_button} onClick={okModal}>
              {t(okLabel)}
            </button>
          )}

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
