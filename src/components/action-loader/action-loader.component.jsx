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
// - show: boolean that indicates to show cancel button or not

// style
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useTranslation } from "react-i18next";

// components
import Button from "../button/button.component";

// style
import styles from "./action-loader.module.scss";

// constants
import { Colors } from "../../utils/constants";

function Loader({ onclick, allowCancel }) {
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
      <div className={styles.full_size}>
        <ReactLoading color="#fff" type="bars" height={75} width={75} />
        {allowCancel && showButton && (
          <Button
            action={() => {
              if (onclick) onclick();
            }}
            text={t("cancel-operation-label")}
            bgColor={Colors.SECONDARY_COLOR}
          />
        )}
      </div>
    </>
  );
}

export default Loader;
