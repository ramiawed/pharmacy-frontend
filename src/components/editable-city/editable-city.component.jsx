import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// redux stuff
import { unwrapResult } from "@reduxjs/toolkit";
import { cancelOperation } from "../../redux/auth/authSlice";

// components
import Button from "../button/button.component";
import CitiesDropDown from "../cities-dropdown/cities-dropdown.component";

// styles
import styles from "./editable-city.module.scss";
import generalStyles from "../../style.module.scss";

// constants
import { Colors } from "../../utils/constants";

// use this promise to abort the operation by click on the cancel button
let promise;

// Info Row component
function EditableCity({
  labelText,
  value,
  onInputChange,
  action,
  field,
  editable,
}) {
  const { t } = useTranslation();

  // save the previous value for cancel button
  const [previousValue, setPreviousValue] = useState(value);
  const [isEditable, setIsEditable] = useState(false);
  const [error, setError] = useState("");

  // to show loading icon while update the user info in the DB
  const [loading, setLoading] = useState(false);

  // method to handle click on the ok action
  const handleOkAction = () => {
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

  // method to handle the cancel button
  // return the read mode
  // set the error to empty
  // set the value of the input field to the previous value
  const cancelHandler = () => {
    setLoading(false);
    setIsEditable(false);
    setError("");
    onInputChange(previousValue.value);
    cancelOperation();
  };

  return (
    <>
      <div className={styles.info_row}>
        <label className={styles.label}>{labelText}</label>
        {isEditable ? (
          <div className={styles.value}>
            <CitiesDropDown
              onSelectionChange={onInputChange}
              defaultValue={value}
              caption=""
            />
          </div>
        ) : (
          <div className={styles.value}>
            <label>{value.label}</label>
          </div>
        )}
        {editable ? (
          isEditable ? (
            <div className={styles.actions}>
              <Button
                text="ok-label"
                action={handleOkAction}
                bgColor={Colors.SECONDARY_COLOR}
                loading={loading}
              />
              <div style={{ minWidth: "10px" }}></div>
              <Button
                text="cancel-label"
                action={cancelHandler}
                bgColor={Colors.FAILED_COLOR}
              />
            </div>
          ) : (
            <div className={generalStyles.flex_center_container}>
              {/* <Button
                text="edit-label"
                action={() => {
                  setIsEditable(true);
                  setPreviousValue(value);
                }}
                bgColor={Colors.SUCCEEDED_COLOR}
              /> */}
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

export default EditableCity;
