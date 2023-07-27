import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
import CustomButton from "../../components/custom-button/custom-button.component";

// styles
import styles from "./modal.module.scss";
import { useTheme } from "../../contexts/themeContext";

const Modal = ({
  closeHandler,
  okHandler,
  children,
  headerText,
  cancelText,
  okText,
  showHeader,
  showFooter,
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        closeHandler();
      }
    };

    const handleEnter = (event) => {
      if (event.keyCode === 13) {
        if (okHandler) {
          okHandler();
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
    <div
      className={[
        "fixed top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-center z-50",
        styles.modal_content,
      ].join(" ")}
    >
      <div
        className="w-full h-full absolute bg-black opacity-70"
        onClick={closeHandler}
      ></div>
      <div
        className={`${
          theme === "light"
            ? "bg-white shadow-[0_0_15px_3px_rgba(0,0,0,0.4)]"
            : "bg-color-surface-200 shadow-[0_0_50px_10px_rgba(141,146,182,0.4)]"
        } w-4/5 max-w-lg relative overflow-scroll rounded-md flex flex-col`}
      >
        {headerText && (
          <header
            className={`${
              theme === "light"
                ? "text-dark border-light_grey"
                : "text-color-primary-300 border-color-primary-400"
            } border-b-[1px] p-3 bold text-2xl`}
          >
            {t(headerText)}
          </header>
        )}

        <main className="flex flex-col px-3 py-4 max-h-fit overflow-scroll">
          {children}
        </main>
        {showFooter && (
          <footer className={`flex justify-end gap-2 p-2`}>
            {okHandler && (
              <CustomButton
                text={t(okText)}
                onClickHandler={(e) => {
                  e.stopPropagation();
                  okHandler();
                }}
                classname={`${
                  theme === "light"
                    ? "bg-green text-white"
                    : "d-primary500-mixed300"
                }`}
              />
            )}

            <button
              className={`border-none outline-none rounded-md py-1 cursor-pointer px-2 text-md hover:underline underline-offset-4 ${
                theme === "light" ? "text-red" : "text-color-primary-500"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                closeHandler();
              }}
            >
              {t(cancelText)}
            </button>
          </footer>
        )}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
