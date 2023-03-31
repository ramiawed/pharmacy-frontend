// This component will display after 0.1 second.
// This component display in full size of the screen.
// in the center of the screen will show text and loading dots.
// the text describes the action like (deleting, updating, ...)

// Props:
// - text: the text that will display in the center of the component
// - onclick: action that will trigger when click on the component
// - msg1: text to show
// - msg2: text to show

// Own State:
// - show: boolean that indicates to show cancel button or not

// style
import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";

// components
import Button from "../button/button.component";

// style
import styles from "./action-loader.module.scss";

function Loader({ onclick, allowCancel, msg1, msg2 }) {
  const { t } = useTranslation();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const time = setTimeout(() => {
      setShowButton(true);
    }, 100);

    return () => {
      clearTimeout(time);
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={styles.full_size}>
      <ReactLoading color="#fff" type="bars" height={75} width={75} />
      {allowCancel && showButton && (
        <Button
          action={() => {
            if (onclick) onclick();
          }}
          text={t("cancel operation label")}
          classStyle="bg_light"
        />
      )}
      {msg1 && <p className={styles.msg}>{t(msg1)}</p>}
      {msg2 && <p className={styles.msg}>{t(msg2)}</p>}
    </div>,
    document.getElementById("loader")
  );
}

export default Loader;
