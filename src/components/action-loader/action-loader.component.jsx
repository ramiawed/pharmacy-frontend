// This component will display after 1 second.
// This component display in full size of the screen.
// in the center of the screen will show text and loading dots.
// the text describes the action like (deleting, updating, ...)

// Props:
// - bgColor: background color
// - foreColor: text color
// - text: the text that will display in the center of the component
// - onclick: action that will trigger when click on the component

// Own State:
// - show: boolean that indicates if show the component or not.

// style
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";

// style
import "./action-loader.style.scss";
import generalStyles from "../../style.module.scss";
import { useTranslation } from "react-i18next";

function ActionLoader({ bgColor, foreColor, text, onclick, allowCancel }) {
  const { t } = useTranslation();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const time = setTimeout(() => {
      setShowButton(true);
    }, 3000);

    return () => {
      clearTimeout(time);
    };
  }, []);

  return (
    <>
      <div className="full-size">
        <ReactLoading color="#fff" type="bars" height={75} width={75} />
        {allowCancel && (
          <button
            onClick={onclick}
            className={[
              generalStyles.button,
              generalStyles.bg_secondary,
              generalStyles.fc_white,
              generalStyles.margin_h_auto,
              generalStyles.block,
              generalStyles.padding_v_10,
              generalStyles.padding_h_12,
            ].join(" ")}
          >
            {t("cancel-operation-label")}
          </button>
        )}
      </div>
    </>
  );
}

export default ActionLoader;
