import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import {
  changeMyPassword,
  resetPasswordStatus,
  selectUserData,
} from "../../redux/auth/authSlice";

// components
import ActionButton from "../action-button/action-button.component";
import PasswordRow from "../password-row/password-row.component";
import Toast from "../toast/toast.component";
import ActionLoader from "../action-loader/action-loader.component";

// constants and utils
import { Colors } from "../../utils/constants";

// styles
import generalStyles from "../../style.module.scss";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";

function ChangePassword() {
  const { t } = useTranslation();
  const { changePasswordStatus, token } = useSelector(selectUserData);
  const dispatch = useDispatch();
  const isOnline = useSelector(selectOnlineStatus);

  const [passwordObj, setPasswordObj] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });

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
        oldPassword: "enter-old-password",
      };
    }

    if (passwordObj.newPassword.length < 5) {
      errorObj = {
        ...errorObj,
        newPassword: "password-length",
      };
    }

    if (passwordObj.newPassword.length === 0) {
      errorObj = {
        ...errorObj,
        newPassword: "enter-password",
      };
    }

    if (passwordObj.newPassword !== passwordObj.newPasswordConfirm) {
      errorObj = {
        ...errorObj,
        newPasswordConfirm: "unequal-passwords",
      };
    }

    if (passwordObj.newPasswordConfirm.length < 5) {
      errorObj = {
        ...errorObj,
        newPasswordConfirm: "confirm-password-length",
      };
    }

    if (passwordObj.newPasswordConfirm.length === 0) {
      errorObj = {
        ...errorObj,
        newPasswordConfirm: "enter-password-confirm",
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

    dispatch(changeMyPassword({ obj: passwordObj, token }));
  };

  return (
    <>
      <PasswordRow
        field="oldPassword"
        labelText={t("old-password")}
        value={passwordObj.oldPassword}
        onInputChange={handlePasswordFieldsChange}
        error={t(passwordObjError.oldPassword)}
      />
      <PasswordRow
        field="newPassword"
        labelText={t("new-password")}
        value={passwordObj.newPassword}
        onInputChange={handlePasswordFieldsChange}
        error={t(passwordObjError.newPassword)}
      />
      <PasswordRow
        field="newPasswordConfirm"
        labelText={t("new-password-confirm")}
        value={passwordObj.newPasswordConfirm}
        onInputChange={handlePasswordFieldsChange}
        error={t(passwordObjError.newPasswordConfirm)}
      />
      <div
        className={[
          generalStyles.flex_center_container,
          generalStyles.padding_v_6,
        ].join(" ")}
      >
        <ActionButton
          text="change-password"
          action={changePasswordHandler}
          color={Colors.SUCCEEDED_COLOR}
        />
      </div>

      {changePasswordStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          actionAfterTimeout={() => {
            dispatch(resetPasswordStatus());
            setPasswordObj({
              oldPassword: "",
              newPassword: "",
              newPasswordConfirm: "",
            });
          }}
        >
          <p>{t("password-change-succeeded")}</p>
        </Toast>
      )}

      {changePasswordStatus === "loading" && <ActionLoader />}
    </>
  );
}

export default ChangePassword;
