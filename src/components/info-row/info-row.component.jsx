import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// redux stuff
import { unwrapResult } from "@reduxjs/toolkit";

// components
import ActionButton from "../action-button/action-button.component";
import Toast from "../toast/toast.component";

// styles
import styles from "./info-row.module.scss";

// constants
import { Colors } from "../../utils/constants";

// use this promise to abort the operation by click on the cancel button
let promise;

// Info Row component
function InfoRow({ labelText, value, onInputChange, action, field, editable }) {
  const { t } = useTranslation();
  // save the previous value for cancel button
  const [previousValue, setPreviousValue] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // to show loading icon while update the user info in the DB
  const [loading, setLoading] = useState(false);

  // method to handle click on the ok action
  const handleOkAction = () => {
    // no change in the input
    // return the the read mode
    // return
    if (value === previousValue) {
      setIsEditable(false);
      return;
    }

    // input value empty,
    // stay in the edit mode and show an error message below input field
    // return
    if (
      (field === "name" || field === "username" || field === "mobile") &&
      value === ""
    ) {
      setError("enter-value");
      return;
    }

    // dispatch the action
    // if everything is okay
    // 1- return the read mode
    // 2- show a successful toast
    // if there is an error
    // 1- stay at the edit mode
    // 2- show an error message below the input field
    setLoading(true);
    promise = action();
    promise
      .then(unwrapResult)
      .then((originalPromiseResult) => {
        setIsEditable(false);
        setSuccess("update-succeeded");
        setLoading(false);
      })
      .catch((rejectedValueOrSerializedError) => {
        setError(rejectedValueOrSerializedError.message);
        setLoading(false);
      });
  };

  // method to handle enter press in the input field
  const onEnterPress = (e) => {
    if (e.key === "Enter") {
      handleOkAction();
    }
  };

  // method to handle the cancel button
  // return the read mode
  // set the error to empty
  // set the value of the input field to the previous value
  const handleCancel = () => {
    setIsEditable(false);
    setError("");
    onInputChange(field, previousValue);
    if (promise) {
      promise.abort();
    }
  };

  // method to handle escape press in the input field
  const handleEscapePress = (e) => {
    if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <>
      <div
        className={styles.info_row}
        onDoubleClick={() => {
          if (editable) {
            setIsEditable(true);
            setPreviousValue(value);
          }
        }}
      >
        <label className={styles.label}>{labelText}</label>
        {isEditable ? (
          <div className={styles.value}>
            <input
              value={value}
              onChange={(e) => onInputChange(field, e.target.value)}
              onKeyPress={onEnterPress}
              onKeyDown={handleEscapePress}
            />
          </div>
        ) : (
          <div className={styles.value}>
            <label>{value}</label>
          </div>
        )}
        {editable ? (
          isEditable ? (
            <div className={styles.actions}>
              <ActionButton
                text="ok-label"
                action={handleOkAction}
                color={Colors.fc_secondary_COLOR}
                loading={loading}
              />
              <ActionButton
                text="cancel-label"
                action={handleCancel}
                color={Colors.FAILED_COLOR}
              />
            </div>
          ) : (
            <div className={styles.actions}>
              <ActionButton
                text="edit-label"
                action={() => {
                  setIsEditable(true);
                  setPreviousValue(value);
                }}
                color={Colors.SUCCEEDED_COLOR}
              />
            </div>
          )
        ) : null}
      </div>
      {/* show error below the input field */}
      {error && <p className={styles.error}>{t(error)}</p>}
      {/* show toast when the update is succeeded */}
      {success && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          actionAfterTimeout={() => {
            setSuccess("");
          }}
        >
          <p>{t(success)}</p>
        </Toast>
      )}
    </>
  );
}

export default InfoRow;
