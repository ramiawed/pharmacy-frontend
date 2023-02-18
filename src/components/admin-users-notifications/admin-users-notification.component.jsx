import React from "react";
import { useTranslation } from "react-i18next";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import {
  cancelOperation,
  resetError,
  resetUserChangePasswordStatus,
  selectUsers,
} from "../../redux/users/usersSlice";
import {
  selectUserData,
  resetDeleteError,
  resetDeleteStatus,
} from "../../redux/auth/authSlice";

// constantss
import { Colors } from "../../utils/constants";

// components
import Loader from "../action-loader/action-loader.component";
import ResultModal from "../result-modal/result-modal.component";
import Toast from "../toast/toast.component";

function AdminUsersNotifications({ refreshHandler }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const { status, error, activationDeleteStatus, resetUserPasswordStatus } =
    useSelector(selectUsers);
  const { deleteError, deleteStatus } = useSelector(selectUserData);

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

      {deleteError && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          toastText={t(deleteError)}
          actionAfterTimeout={() => {
            dispatch(resetDeleteError());
          }}
        />
      )}

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

      {deleteStatus === "succeeded" && (
        <ResultModal
          closeModal={() => {
            dispatch(resetDeleteStatus());
            refreshHandler();
          }}
          type="success"
          msg="user deleted successfully"
        />
      )}
    </>
  );
}

export default AdminUsersNotifications;
