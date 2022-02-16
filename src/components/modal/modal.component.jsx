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
  small,
  color,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        closeModal();
      }
    };

    const handleEnter = (event) => {
      if (event.keyCode === 13) {
        if (okModal) {
          okModal();
        }
      }
    };

    window.addEventListener("keydown", handleEsc);
    window.addEventListener("keydown", handleEnter);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEsc);
      window.removeEventListener("keydown", handleEnter);
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
          className={[styles.modal_header].join(" ")}
          style={{
            backgroundColor: color,
          }}
        >
          {t(header)}
        </header>
        <main className={styles.modal_body}>{children}</main>
        <footer className={styles.modal_footer}>
          {okModal && (
            <button
              className={styles.ok_button}
              onClick={okModal}
              style={{
                backgroundColor: color,
              }}
            >
              {t(okLabel)}
            </button>
          )}

          <button
            className={styles.cancel_button}
            onClick={closeModal}
            style={{
              color: color,
            }}
          >
            {t(cancelLabel)}
          </button>
        </footer>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
