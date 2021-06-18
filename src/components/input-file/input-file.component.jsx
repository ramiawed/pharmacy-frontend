import React from "react";

import { SiMicrosoftexcel } from "react-icons/si";

import styles from "./input-file.module.scss";

function InputFile({ fileChangedHandler, small }) {
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
      <div className={styles.excel_icon}>
        <SiMicrosoftexcel
          className={[styles.icon, small ? styles.small : ""].join(" ")}
          onClick={handleClick}
        />
      </div>

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
