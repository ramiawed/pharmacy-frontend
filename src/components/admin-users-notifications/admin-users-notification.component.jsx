import React from "react";
import { useTranslation } from "react-i18next";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import {
  cancelOperation,
  resetActivationDeleteStatus,
  resetError,
  resetUserChangePasswordStatus,
  selectUsers,
} from "../../redux/users/usersSlice";

// constants
import { Colors } from "../../utils/constants";

// components
import Loader from "../action-loader/action-loader.component";
import Toast from "../toast/toast.component";

function AdminUsersNotifications() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const {
    status,
    error,
    activationDeleteStatus,
    activationDeleteStatusMsg,
    resetUserPasswordStatus,
  } = useSelector(selectUsers);

  return (
    <>
      {/* loading components when retrieve the result from DB */}
      {status === "loading" && (
        <Loader
          onclick={() => {
            cancelOperation();
          }}
          allowCancel={true}
        />
      )}

      {/* loading component when admin reset user password */}
      {resetUserPasswordStatus === "loading" && (
        <Loader onclick={() => cancelOperation()} allowCancel={true} />
      )}

      {/* loading component when admin delete or change the activation for a user */}
      {activationDeleteStatus === "loading" && (
        <Loader onclick={() => cancelOperation()} allowCancel={true} />
      )}

      {error && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          toastText={t(error)}
          actionAfterTimeout={() => dispatch(resetError())}
        />
      )}

      {/* show toast to display successfully or failed message */}
      {/* {activationDeleteStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t(activationDeleteStatusMsg)}
          actionAfterTimeout={() => {
            dispatch(resetActivationDeleteStatus());
          }}
        />
      )} */}

      {/* {activationDeleteStatus === "failed" && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          toastText={t(activationDeleteStatusMsg)}
          actionAfterTimeout={() => dispatch(resetActivationDeleteStatus())}
        />
      )} */}

      {/* show toast to display successfully or failed update password */}
      {resetUserPasswordStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t("password-change-succeeded")}
          actionAfterTimeout={() => {
            dispatch(resetUserChangePasswordStatus());
          }}
        />
      )}

      {resetUserPasswordStatus === "failed" && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          toastText={t("password-change-failed")}
          actionAfterTimeout={() => dispatch(resetUserChangePasswordStatus())}
        />
      )}
    </>
  );
}

export default AdminUsersNotifications;
