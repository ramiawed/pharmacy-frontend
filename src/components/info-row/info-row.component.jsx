import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// redux stuff
import { unwrapResult } from "@reduxjs/toolkit";

// components
import Button from "../button/button.component";

// styles
import styles from "./info-row.module.scss";

// constants
import { cancelOperation } from "../../redux/auth/authSlice";

// use this promise to abort the operation by click on the cancel button
let promise;

// Info Row component
function InfoRow({ labelText, value, onInputChange, action, field, editable }) {
  const { t } = useTranslation();

  // save the previous value for cancel button
  const [previousValue, setPreviousValue] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [error, setError] = useState("");

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

    // check if the promise is not undefined
    if (promise) {
      promise
        .then(unwrapResult)
        .then((originalPromiseResult) => {
          setIsEditable(false);
          setLoading(false);
        })
        .catch((rejectedValueOrSerializedError) => {
          setError(
            rejectedValueOrSerializedError.message
              ? rejectedValueOrSerializedError.message
              : rejectedValueOrSerializedError
          );
          setLoading(false);
          if (!rejectedValueOrSerializedError.message) {
            setIsEditable(false);
            setError("");
            onInputChange(field, previousValue);
          }
        });
    } else {
      cancelHandler();
    }
  };

  // method to handle enter press in the input field
  const onEnterPressHandler = (e) => {
    if (e.key === "Enter") {
      handleOkAction();
    }
  };

  // method to handle the cancel button
  // return the read mode
  // set the error to empty
  // set the value of the input field to the previous value
  const cancelHandler = () => {
    setLoading(false);
    setIsEditable(false);
    setError("");
    onInputChange(field, previousValue);
    cancelOperation();
  };

  // method to handle escape press in the input field
  const escapePressHandler = (e) => {
    if (e.key === "Escape") {
      cancelHandler();
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
              onChange={(e) => {
                onInputChange(field, e.target.value);
                setError("");
              }}
              onKeyPress={onEnterPressHandler}
              onKeyDown={escapePressHandler}
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
              <Button
                text="ok-label"
                action={handleOkAction}
                classStyle="bg_light"
                loading={loading}
              />
              <div style={{ minWidth: "10px" }}></div>
              <Button
                text="cancel"
                action={cancelHandler}
                classStyle="bg_red"
              />
            </div>
          ) : (
            <div className={"flex_center_container"}>
              <Button
                text="edit-label"
                action={() => {
                  setIsEditable(true);
                  setPreviousValue(value);
                }}
                classStyle="bg_green"
              />
            </div>
          )
        ) : null}
      </div>

      {/* show error below the input field */}
      {error && error !== "cancel" && error !== "timeout" && (
        <p className={styles.error}>{t(error)}</p>
      )}
    </>
  );
}

export default InfoRow;
