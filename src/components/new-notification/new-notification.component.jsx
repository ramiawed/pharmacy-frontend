import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

// redux stuff
import { selectToken } from "../../redux/auth/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "../../redux/notifications/notificationsSlice";

// components
import Icon from "../action-icon/action-icon.component";
import Button from "../button/button.component";

// icons
import { BiImage } from "react-icons/bi";
import { MdAddCircle } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";

// styles
import styles from "./new-notification.module.scss";

// constants
import { Colors } from "../../utils/constants";

function NewNotification({ setIsNew, setSuccessAddingMsg }) {
  const inputFileRef = useRef(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const token = useSelector(selectToken);

  // own states
  const [header, setHeader] = useState("");
  const [body, setBody] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [headerError, setHeaderError] = useState("");
  const [bodyError, setBodyError] = useState("");

  const resetState = () => {
    setHeader("");
    setBody("");

    setIsNew(false);
  };

  const handleAddImageClick = () => {
    inputFileRef.current.click();
  };

  const fileChangedHandler = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const addHandler = () => {
    if (header.trim().length === 0 || body.trim().length === 0) {
      if (header.trim().length === 0) {
        setHeaderError("error");
      }

      if (body.trim().length === 0) {
        setBodyError("error");
      }

      return;
    }

    const data = new FormData();

    if (selectedImage !== null) {
      data.append(
        "logo_url",
        `${Date.now()}.${selectedImage.name.split(".").pop()}`
      );
      data.append("file", selectedImage);
    }

    data.append("header", header);
    data.append("body", body);

    dispatch(addNotification({ data, token }))
      .then(unwrapResult)
      .then(() => {
        setBody("");
        setHeader("");
        setSelectedImage(null);
        setSuccessAddingMsg("add-notification-msg");
      });
  };

  return (
    <div className={styles.new_notification_div}>
      <div
        className={[
          styles.row,
          headerError === "error" ? styles.error : "",
        ].join(" ")}
      >
        <label>{t("header")}</label>
        <input
          type="text"
          value={header}
          onChange={(e) => {
            setHeader(e.target.value);
            setHeaderError("");
          }}
        />
      </div>
      <div
        className={[styles.row, bodyError === "error" ? styles.error : ""].join(
          " "
        )}
      >
        <label>{t("body")}</label>
        <textarea
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
            setBodyError("");
          }}
        />
      </div>

      <div className={styles.row}>
        <label>{t("image-label")}:</label>
        {selectedImage === null ? (
          <>
            <Icon
              selected={false}
              foreColor={Colors.SUCCEEDED_COLOR}
              onclick={handleAddImageClick}
              icon={() => <MdAddCircle size={24} />}
            />
            <input
              multiple={false}
              accept="image/*"
              ref={inputFileRef}
              type="file"
              onChange={fileChangedHandler}
              style={{ display: "none" }}
            />
          </>
        ) : (
          <Icon
            icon={() => <RiDeleteBin5Fill size={24} />}
            selected={false}
            foreColor={Colors.FAILED_COLOR}
            onclick={() => setSelectedImage(null)}
          />
        )}
        <div className={styles.img}>
          {selectedImage ? (
            <img
              src={URL.createObjectURL(selectedImage)}
              className={styles.image}
              alt="Thumb"
            />
          ) : (
            <div>
              <BiImage
                size={128}
                color={Colors.SECONDARY_COLOR}
                onClick={handleAddImageClick}
                style={{
                  cursor: "pointer",
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <Button
          action={addHandler}
          text={t("add-label")}
          bgColor={Colors.SUCCEEDED_COLOR}
        />
        <Button
          action={resetState}
          text={t("cancel-label")}
          bgColor={Colors.FAILED_COLOR}
        />
      </div>
    </div>
  );
}

export default NewNotification;
