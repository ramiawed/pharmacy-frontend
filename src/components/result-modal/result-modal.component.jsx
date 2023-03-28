import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";

// icons
import { MdDoneOutline, MdOutlineErrorOutline } from "react-icons/md";

// constants
import { Colors } from "../../utils/constants";

// styles
import styles from "./result-modal.module.scss";

const ResultModal = ({ closeModal, msg, type }) => {
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
      <div className={[styles.modal_content].join(" ")}>
        <main className={styles.modal_body}>
          {type === "success" ? (
            <MdDoneOutline
              color={Colors.SUCCEEDED_COLOR}
              className={styles.icon}
            />
          ) : (
            <MdOutlineErrorOutline
              color={Colors.FAILED_COLOR}
              className={styles.icon}
            />
          )}

          {msg && (
            <p
              className={
                type === "success" ? styles.success_msg : styles.failed_msg
              }
            >
              {t(msg)}
            </p>
          )}
        </main>
        <footer className={styles.modal_footer}>
          <button
            className={
              type === "success" ? styles.success_button : styles.failed_button
            }
            onClick={(e) => {
              closeModal();
              e.stopPropagation();
            }}
          >
            {t("close")}
          </button>
        </footer>
      </div>
    </div>,
    document.getElementById("success-modal-root")
  );
};

export default ResultModal;
