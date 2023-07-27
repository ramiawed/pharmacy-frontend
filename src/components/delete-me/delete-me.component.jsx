import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { deleteMe, selectUserData } from "../../redux/auth/authSlice";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";

// components
import CenterContainer from "../center-container/center-container.component";
import PasswordRow from "../password-row/password-row.component";
import Button from "../button/button.component";

function DeleteMe() {
  const { t } = useTranslation();
  const isOnline = useSelector(selectOnlineStatus);

  const { token, deleteError } = useSelector(selectUserData);
  const dispatch = useDispatch();

  const [passwordForDelete, setPasswordForDelete] = useState("");
  const [passwordForDeleteError, setPasswordForDeleteError] = useState("");

  // method to handle change in password for delete account
  const handlePasswordForDeleteChange = (field, val) => {
    setPasswordForDelete(val);
    setPasswordForDeleteError("");
  };

  const handleDeleteMe = () => {
    // the password length must be greater than 0
    if (passwordForDelete.length === 0) {
      setPasswordForDeleteError("enter password error");
      return;
    }

    // check the internet connection
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    // dispatch delete operation
    dispatch(deleteMe({ obj: { password: passwordForDelete }, token }))
      .then(unwrapResult)
      .then(() => {
        // on succeeded sign out and reset redux's store
        dispatch({
          type: "SIGNOUT_REQUEST",
        });
        localStorage.removeItem("token");
      })
      .catch(() => {
        // on failed, show message below the password input
        setPasswordForDeleteError(t(deleteError));
      });
  };

  return (
    <>
      <PasswordRow
        labelText={t("password")}
        field="deletePassword"
        value={passwordForDelete}
        onInputChange={handlePasswordForDeleteChange}
        error={t(passwordForDeleteError)}
      />
      <CenterContainer>
        <Button
          text="delete user"
          action={handleDeleteMe}
          classStyle="bg_red"
        />
      </CenterContainer>
    </>
  );
}

export default DeleteMe;
