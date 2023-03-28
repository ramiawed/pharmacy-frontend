import React from "react";
import { useTranslation } from "react-i18next";

import { SiMicrosoftexcel } from "react-icons/si";

// components
import Icon from "../icon/icon.component";

// constants
import { Colors } from "../../utils/constants";

function InputFile({ fileChangedHandler, small, label }) {
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
        <Icon
          selected={false}
          foreColor={Colors.SUCCEEDED_COLOR}
          tooltip={t("items from excel")}
          onclick={handleClick}
          icon={() => <SiMicrosoftexcel size={24} />}
          withBackground={true}
        />
      ) : (
        <Icon
          selected={false}
          foreColor={Colors.SUCCEEDED_COLOR}
          tooltip={t(label)}
          onclick={handleClick}
          icon={() => <SiMicrosoftexcel size={24} />}
          withBackground={true}
          text={t(label)}
        />
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
