import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useTranslation } from "react-i18next";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { changeLogo, selectUserData } from "../../redux/auth/authSlice";
import { changeItemLogo } from "../../redux/items/itemsSlices";

function InputFileImage({ type, item, readOnly, onchange }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const inputFileRef = React.useRef(null);

  const { token, user } = useSelector(selectUserData);

  const handleClick = () => {
    inputFileRef.current.click();
  };

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      const data = new FormData();
      if (type === "partner") {
        data.append(
          "name",
          `${user.username}${Date.now()}.${uploadedFile.name.split(".").pop()}`
        );
      } else {
        data.append(
          "name",
          `${item.name.replace("%", "")}${Date.now()}.${uploadedFile.name
            .split(".")
            .pop()}`
        );
      }

      data.append("file", uploadedFile);

      if (type === "partner") {
        dispatch(changeLogo({ data, token }))
          .then(unwrapResult)
          .then(() => {
            if (onchange) {
              onchange();
            }
          });
      } else {
        const { _id } = item;
        dispatch(changeItemLogo({ data, _id, token }))
          .then(unwrapResult)
          .then(() => {
            if (onchange) {
              onchange();
            }
          });
      }
    }
  };

  return (
    <>
      <div>
        <button
          className={["button", "bg_light", "fc_white"].join(" ")}
          style={{
            padding: "6px 12px",
          }}
          onClick={handleClick}
          disabled={readOnly}
        >
          {t("change-logo")}
        </button>
      </div>

      <input
        multiple={false}
        accept="image/*"
        ref={inputFileRef}
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </>
  );
}

export default InputFileImage;
