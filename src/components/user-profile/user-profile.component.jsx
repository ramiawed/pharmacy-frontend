// libraries
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// components
import Header from "../header/header.component";
import CardInfo from "../card-info/card-info.component";
import InfoRow from "../info-row/info-row.component";
import PasswordRow from "../password-row/password-row.component";
import ActionButton from "../action-button/action-button.component";
import Toast from "../toast/toast.component";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  selectUserData,
  updateUserInfo,
  changeMyPassword,
  resetPasswordError,
  resetStatus,
  deleteMe,
  signOut,
} from "../../redux/auth/authSlice";
import { resetUsers } from "../../redux/users/usersSlice";
import { resetFavorites } from "../../redux/favorites/favoritesSlice";
import { resetCompanies } from "../../redux/company/companySlice";

// styles
import styles from "./user-profile.module.scss";

// constants, and utile
import { UserTypeConstants, Colors } from "../../utils/constants";
import { checkConnection } from "../../utils/checkInternet";
import { resetWarehouse } from "../../redux/warehouse/warehousesSlice";
import { resetItems } from "../../redux/items/itemsSlices";

function UserProfile() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user, token, passwordError, status } = useSelector(selectUserData);

  const [passwordForDelete, setPasswordForDelete] = useState("");
  const [passwordForDeleteError, setPasswordForDeleteError] = useState("");
  const [noInternetError, setNoInternetError] = useState("");

  // method to handle change in password for delete account
  const handlePasswordForDeleteChange = (field, val) => {
    setPasswordForDelete(val);
    setPasswordForDeleteError("");
  };

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

  const handleChangePassword = () => {
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
    if (!checkConnection()) {
      setNoInternetError("no-internet-connection");
      return;
    }

    dispatch(changeMyPassword({ obj: passwordObj, token }));
  };

  const handleDeleteMe = () => {
    // the password length must be greater than 0
    if (passwordForDelete.length === 0) {
      setPasswordForDeleteError("enter-password");
      return;
    }

    // check the internet connection
    if (!checkConnection()) {
      setNoInternetError("no-internet-connection");
      return;
    }

    // dispatch delete operation
    dispatch(deleteMe({ obj: { password: passwordForDelete }, token }))
      .then(unwrapResult)
      .then((orginalPromiseResult) => {
        // on succeeded sign out and reset redux's store
        dispatch(signOut());
        dispatch(resetUsers());
        dispatch(resetFavorites());
        dispatch(resetCompanies());
        dispatch(resetWarehouse());
        dispatch(resetItems());
      })
      .catch((rejectedValueOrSerializedError) => {
        // on failed, show message below the password input
        setPasswordForDeleteError(t(rejectedValueOrSerializedError.message));
      });
  };

  const [userObj, setUserObj] = useState(user);

  const handleInputChange = (field, val) => {
    setUserObj({
      ...userObj,
      [field]: val,
    });
  };

  const handleOkAction = (field) => {
    // check the internet connection
    if (!checkConnection()) {
      setNoInternetError("no-internet-connection");
      return;
    }

    // dispatch updateUserInfo
    return dispatch(
      updateUserInfo({ obj: { [field]: userObj[field] }, token: token })
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.container}>
      <Header>
        <h2>{t("nav-profile")}</h2>
      </Header>
      <CardInfo headerTitle={t("personal-info")}>
        <InfoRow
          editable={true}
          field="name"
          labelText={t("user-name")}
          value={userObj.name}
          onInputChange={handleInputChange}
          action={() => handleOkAction("name")}
        />
        <InfoRow
          editable={true}
          field="username"
          labelText={t("user-username")}
          value={userObj.username}
          onInputChange={handleInputChange}
          action={() => handleOkAction("username")}
        />
        <InfoRow
          editable={false}
          labelText={t("user-type")}
          value={userObj.type}
        />
      </CardInfo>
      <CardInfo headerTitle={t("communication-info")}>
        <InfoRow
          editable={true}
          field="phone"
          labelText={t("user-phone")}
          value={userObj.phone}
          onInputChange={handleInputChange}
          action={() => handleOkAction("phone")}
        />
        <InfoRow
          editable={true}
          field="mobile"
          labelText={t("user-mobile")}
          value={userObj.mobile}
          onInputChange={handleInputChange}
          action={() => handleOkAction("mobile")}
        />
        <InfoRow
          editable={true}
          field="email"
          labelText={t("user-email")}
          value={userObj.email}
          onInputChange={handleInputChange}
          action={() => handleOkAction("email")}
        />
      </CardInfo>

      <CardInfo headerTitle={t("address-info")}>
        <InfoRow
          editable={true}
          field="city"
          labelText={t("user-city")}
          value={userObj.city}
          onInputChange={handleInputChange}
          action={() => handleOkAction("city")}
        />
        <InfoRow
          editable={true}
          field="district"
          labelText={t("user-district")}
          value={userObj.district}
          onInputChange={handleInputChange}
          action={() => handleOkAction("district")}
        />
        <InfoRow
          editable={true}
          field="street"
          labelText={t("user-street")}
          value={userObj.street}
          onInputChange={handleInputChange}
          action={() => handleOkAction("street")}
        />
      </CardInfo>

      {user.type === UserTypeConstants.PHARMACY ||
      user.type === UserTypeConstants.WAREHOUSE ? (
        <CardInfo headerTitle={t("additional-info")}>
          <InfoRow
            editable={true}
            field="employeeName"
            labelText={t("user-employee-name")}
            value={userObj.employeeName}
            onInputChange={handleInputChange}
            action={() => handleOkAction("employeeName")}
          />
          <InfoRow
            editable={true}
            field="certificateName"
            labelText={t("user-certificate-name")}
            value={userObj.certificateName}
            onInputChange={handleInputChange}
            action={() => handleOkAction("certificateName")}
          />
        </CardInfo>
      ) : (
        <></>
      )}

      {user.type === UserTypeConstants.NORMAL ? (
        <CardInfo headerTitle={t("additional-info")}>
          <InfoRow
            editable={true}
            field="guestDetails.job"
            labelText={t("user-job")}
            value={userObj.guestDetails.job}
            onInputChange={handleInputChange}
            action={() => handleOkAction("guestDetails.job")}
          />
          <InfoRow
            editable={true}
            field="guestDetails.companyName"
            labelText={t("user-company-name")}
            value={userObj.guestDetails.companyName}
            onInputChange={handleInputChange}
            action={() => handleOkAction("guestDetails.companyName")}
          />
        </CardInfo>
      ) : (
        <></>
      )}

      <CardInfo headerTitle={t("change-password")}>
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
        <div className={styles.action_div}>
          <ActionButton
            text="change-password"
            action={handleChangePassword}
            color={Colors.SUCCEEDED_COLOR}
          />
        </div>
      </CardInfo>

      <CardInfo
        headerTitle={t("delete-account")}
        bgColor={Colors.FAILED_COLOR}
        type="warning"
      >
        <PasswordRow
          labelText={t("user-password")}
          field="deletePassword"
          value={passwordForDelete}
          onInputChange={handlePasswordForDeleteChange}
          error={t(passwordForDeleteError)}
        />
        <div className={styles.action_div}>
          <ActionButton
            text="delete-account"
            action={handleDeleteMe}
            color={Colors.FAILED_COLOR}
          />
        </div>
      </CardInfo>

      {passwordError && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          // toastText={t(error)}
          actionAfterTimeout={() => dispatch(resetPasswordError())}
        >
          {passwordError.split("_").map((err, index) => (
            <p key={index}>{t(err)}</p>
          ))}
        </Toast>
      )}

      {status === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          actionAfterTimeout={() => {
            dispatch(resetStatus());
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
      {noInternetError && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          actionAfterTimeout={() => {
            setNoInternetError("");
          }}
        >
          <p>{t(noInternetError)}</p>
        </Toast>
      )}
    </div>
  );
}

export default UserProfile;
