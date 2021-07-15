import React from "react";
import { useTranslation } from "react-i18next";

import { SiMicrosoftexcel } from "react-icons/si";

// styles
import generalStyles from "../../style.module.scss";
import styles from "./input-file.module.scss";

function InputFile({ fileChangedHandler, small }) {
  const { t } = useTranslation();
  const inputFileRef = React.useRef(null);

  const handleClick = (event) => {
    inputFileRef.current.click();
  };

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    fileChangedHandler(uploadedFile);
  };

  return (
    <>
      {small ? (
        <div
          className={[generalStyles.icon, generalStyles.fc_green].join(" ")}
          onClick={handleClick}
        >
          <SiMicrosoftexcel size={24} />
          <div className={generalStyles.tooltip}>{t("items-from-excel")}</div>
        </div>
      ) : (
        <div
          className={[styles.icon_container, generalStyles.margin_h_auto].join(
            " "
          )}
          onClick={handleClick}
        >
          <SiMicrosoftexcel size={250} />
          <p>{t("items-from-excel")}</p>
          <p>{t("press-here")}</p>
        </div>
      )}

      <input
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        ref={inputFileRef}
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </>
  );
}

export default InputFile;
