import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

// redux stuff
import { unwrapResult } from "@reduxjs/toolkit";
import { selectToken } from "../../redux/auth/authSlice";
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

    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("title", header);
    formData.append("description", body);

    dispatch(addNotification({ data: formData, token }))
      .then(unwrapResult)
      .then(() => {
        setBody("");
        setHeader("");
        setSelectedImage(null);
        setSuccessAddingMsg("add-notification-msg");
      })
      .catch((err) => {});
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
            <div
              style={{
                display: "none",
              }}
            >
              <form encType="multipart/form-data">
                <div>
                  <input
                    type="file"
                    name="file"
                    onChange={fileChangedHandler}
                    ref={inputFileRef}
                    stye={{ display: "none" }}
                  />
                </div>
              </form>
            </div>
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
