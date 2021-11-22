import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { BiImage } from "react-icons/bi";
import { MdAddCircle } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../redux/auth/authSlice";
import { addNotification } from "../../redux/notifications/notificationsSlice";
import { Colors } from "../../utils/constants";
import Icon from "../action-icon/action-icon.component";
import Button from "../button/button.component";

import styles from "./new-notification.module.scss";

function NewNotification({ setIsNew }) {
  const { t } = useTranslation();
  const inputFileRef = useRef(null);

  const dispatch = useDispatch();

  const token = useSelector(selectToken);

  const [header, setHeader] = useState("");
  const [body, setBody] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

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
      });
  };

  return (
    <div className={styles.new_notification_div}>
      <div className={styles.row}>
        <label>{t("header")}</label>
        <input
          type="text"
          value={header}
          onChange={(e) => {
            setHeader(e.target.value);
          }}
        />
      </div>
      <div className={styles.row}>
        <label>{t("body")}</label>
        <textarea
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
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
