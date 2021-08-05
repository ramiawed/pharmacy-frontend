import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMe,
  resetDeleteError,
  selectUserData,
  signOut,
} from "../../redux/auth/authSlice";
import { resetUsers } from "../../redux/users/usersSlice";
import { resetFavorites } from "../../redux/favorites/favoritesSlice";
import { resetCompanies } from "../../redux/company/companySlice";
import { resetWarehouse } from "../../redux/warehouse/warehousesSlice";
import { resetItems } from "../../redux/items/itemsSlices";
import { resetCompanyItems } from "../../redux/companyItems/companyItemsSlices";
import { resetCartItems } from "../../redux/cart/cartSlice";
import { unwrapResult } from "@reduxjs/toolkit";

// components
import ActionButton from "../action-button/action-button.component";
import PasswordRow from "../password-row/password-row.component";
import Toast from "../toast/toast.component";

// styles
import generalStyles from "../../style.module.scss";

// constants and utils
import { Colors } from "../../utils/constants";
import ActionLoader from "../action-loader/action-loader.component";
import {
  changeOnlineMsg,
  changeOnlineStatus,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";

function DeleteMe() {
  const { t } = useTranslation();
  const isOnline = useSelector(selectOnlineStatus);
  const { token, deleteError, deleteStatus } = useSelector(selectUserData);
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
      setPasswordForDeleteError("enter-password");
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
        dispatch(signOut());
        dispatch(resetUsers());
        dispatch(resetFavorites());
        dispatch(resetCompanies());
        dispatch(resetWarehouse());
        dispatch(resetItems());
        dispatch(resetCompanyItems());
        dispatch(resetCartItems());
      })
      .catch((rejectedValueOrSerializedError) => {
        // on failed, show message below the password input
        setPasswordForDeleteError(t(deleteError));
      });
  };

  return (
    <>
      <PasswordRow
        labelText={t("user-password")}
        field="deletePassword"
        value={passwordForDelete}
        onInputChange={handlePasswordForDeleteChange}
        error={t(passwordForDeleteError)}
      />
      <div
        className={[
          generalStyles.flex_center_container,
          generalStyles.padding_v_6,
        ].join(" ")}
      >
        <ActionButton
          text="delete-account"
          action={handleDeleteMe}
          color={Colors.FAILED_COLOR}
        />
      </div>

      {deleteStatus === "loading" && <ActionLoader allowCancel={false} />}

      {deleteError && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          actionAfterTimeout={() => dispatch(resetDeleteError())}
        >
          <p>{t(deleteError)}</p>
        </Toast>
      )}
    </>
  );
}

export default DeleteMe;
