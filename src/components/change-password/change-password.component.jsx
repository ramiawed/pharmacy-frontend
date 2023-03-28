// component to change the password for logged user

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// redux stuff
import { unwrapResult } from "@reduxjs/toolkit";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";
import { useDispatch, useSelector } from "react-redux";
import { changeMyPassword, selectUserData } from "../../redux/auth/authSlice";

// components
import PasswordRow from "../password-row/password-row.component";
import Button from "../button/button.component";

function ChangePassword() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const { token } = useSelector(selectUserData);
  const isOnline = useSelector(selectOnlineStatus);

  // own state that holds the oldPassword, newPassword, newPasswordConfirm values
  const [passwordObj, setPasswordObj] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });

  // own state that holds the error of oldPassword, newPassword, newPasswordConfirm values
  const [passwordObjError, setPasswordObjError] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });

  // method to handle the change in the input in password and confirm password
  // for change password
  const handlePasswordFieldsChange = (field, val) => {
    setPasswordObj({
      ...passwordObj,
      [field]: val,
    });
    setPasswordObjError({
      ...passwordObjError,
      [field]: "",
    });
  };

  const changePasswordHandler = () => {
    let errorObj = {};
    if (passwordObj.oldPassword.length === 0) {
      errorObj = {
        ...errorObj,
        oldPassword: "enter old password error",
      };
    }

    if (passwordObj.newPassword.length < 5) {
      errorObj = {
        ...errorObj,
        newPassword: "password length error",
      };
    }

    if (passwordObj.newPassword.length === 0) {
      errorObj = {
        ...errorObj,
        newPassword: "enter password error",
      };
    }

    if (passwordObj.newPassword !== passwordObj.newPasswordConfirm) {
      errorObj = {
        ...errorObj,
        newPasswordConfirm: "unequal passwords error",
      };
    }

    if (passwordObj.newPasswordConfirm.length < 5) {
      errorObj = {
        ...errorObj,
        newPasswordConfirm: "confirm password length error",
      };
    }

    if (passwordObj.newPasswordConfirm.length === 0) {
      errorObj = {
        ...errorObj,
        newPasswordConfirm: "enter password confirm error",
      };
    }

    if (Object.entries(errorObj).length !== 0) {
      setPasswordObjError({
        ...passwordObjError,
        ...errorObj,
      });
      return;
    }

    // check the internet connection
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    dispatch(changeMyPassword({ obj: passwordObj, token }))
      .then(unwrapResult)
      .then(() => {
        setPasswordObj({
          oldPassword: "",
          newPassword: "",
          newPasswordConfirm: "",
        });
      });
  };

  return (
    <>
      <PasswordRow
        field="oldPassword"
        labelText={t("old password")}
        value={passwordObj.oldPassword}
        onInputChange={handlePasswordFieldsChange}
        error={t(passwordObjError.oldPassword)}
      />
      <PasswordRow
        field="newPassword"
        labelText={t("new password")}
        value={passwordObj.newPassword}
        onInputChange={handlePasswordFieldsChange}
        error={t(passwordObjError.newPassword)}
      />
      <PasswordRow
        field="newPasswordConfirm"
        labelText={t("password confirm")}
        value={passwordObj.newPasswordConfirm}
        onInputChange={handlePasswordFieldsChange}
        error={t(passwordObjError.newPasswordConfirm)}
      />
      <div
        className={["flex_center_container"].join(" ")}
        style={{ padding: "6px 0" }}
      >
        <Button
          text="change password"
          action={changePasswordHandler}
          classStyle="bg_green"
        />
      </div>
    </>
  );
}

export default ChangePassword;
