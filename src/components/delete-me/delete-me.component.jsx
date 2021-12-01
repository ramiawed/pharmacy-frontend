import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  authSliceSignOut,
  deleteMe,
  selectUserData,
} from "../../redux/auth/authSlice";
import { usersSliceSignOut } from "../../redux/users/usersSlice";
import { favoritesSliceSignOut } from "../../redux/favorites/favoritesSlice";
import { companySliceSignOut } from "../../redux/company/companySlice";
import { warehouseSliceSignOut } from "../../redux/warehouse/warehousesSlice";
import { itemsSliceSignOut } from "../../redux/items/itemsSlices";
import { cartSliceSignOut } from "../../redux/cart/cartSlice";
import { orderSliceSignOut } from "../../redux/orders/ordersSlice";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";
import {
  medicinesSliceSignOut,
  resetMedicines,
} from "../../redux/medicines/medicinesSlices";
import { statisticsSliceSignOut } from "../../redux/statistics/statisticsSlice";
import { warehouseItemsSliceSignOut } from "../../redux/warehouseItems/warehouseItemsSlices";
import { advertisementsSignOut } from "../../redux/advertisements/advertisementsSlice";
import { companiesSectionOneSignOut } from "../../redux/advertisements/companiesSectionOneSlice";
import { companiesSectionTwoSignOut } from "../../redux/advertisements/companiesSectionTwoSlice";
import { itemsSectionOneSignOut } from "../../redux/advertisements/itemsSectionOneSlice";
import { itemsSectionThreeSignOut } from "../../redux/advertisements/itemsSectionThreeSlice";
import { itemsSectionTwoSignOut } from "../../redux/advertisements/itemsSectionTwoSlice";
import { warehousesSectionOneSignOut } from "../../redux/advertisements/warehousesSectionOneSlice";
import { notificationsSignOut } from "../../redux/notifications/notificationsSlice";
import { settingsSignOut } from "../../redux/settings/settingsSlice";
import { usersNotificationsSignOut } from "../../redux/userNotifications/userNotificationsSlice";

// components
import PasswordRow from "../password-row/password-row.component";
import Button from "../button/button.component";

// styles
import generalStyles from "../../style.module.scss";

// constants and utils
import { Colors } from "../../utils/constants";

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
        dispatch(authSliceSignOut());
        dispatch(cartSliceSignOut());
        dispatch(companySliceSignOut());
        dispatch(favoritesSliceSignOut());
        dispatch(itemsSliceSignOut());
        dispatch(statisticsSliceSignOut());
        dispatch(usersSliceSignOut());
        dispatch(warehouseSliceSignOut());
        dispatch(warehouseItemsSliceSignOut());
        dispatch(orderSliceSignOut());
        dispatch(resetMedicines());
        dispatch(advertisementsSignOut());
        dispatch(companiesSectionOneSignOut());
        dispatch(companiesSectionTwoSignOut());
        dispatch(itemsSectionOneSignOut());
        dispatch(itemsSectionThreeSignOut());
        dispatch(itemsSectionTwoSignOut());
        dispatch(warehousesSectionOneSignOut());
        dispatch(medicinesSliceSignOut());
        dispatch(notificationsSignOut());
        dispatch(settingsSignOut());
        dispatch(usersNotificationsSignOut());
      })
      .catch(() => {
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
        <Button
          text="delete-account"
          action={handleDeleteMe}
          bgColor={Colors.FAILED_COLOR}
        />
      </div>
    </>
  );
}

export default DeleteMe;
