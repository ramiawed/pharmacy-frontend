import React from "react";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import {
  cancelOperation,
  resetChangeLogoError,
  resetDeleteError,
  resetPasswordError,
  resetPasswordStatus,
  resetUpdateError,
  resetUpdateStatus,
  selectUserData,
} from "../../redux/auth/authSlice";

// component
import Toast from "../toast/toast.component";
import Loader from "../action-loader/action-loader.component";

// constants
import { Colors } from "../../utils/constants";
import { useTranslation } from "react-i18next";

function UserProfileNotifications() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    changePasswordStatus,
    passwordError,
    changeLogoError,
    changeLogoStatus,
    updateStatus,
    updateError,
    deleteStatus,
    deleteError,
  } = useSelector(selectUserData);

  return (
    <>
      {changePasswordStatus === "loading" && <Loader allowCancel={false} />}

      {changePasswordStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          actionAfterTimeout={() => {
            dispatch(resetPasswordStatus());
          }}
        >
          <p>{t("password change succeeded")}</p>
        </Toast>
      )}

      {passwordError && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          actionAfterTimeout={() => dispatch(resetPasswordError())}
        >
          {passwordError.split("_").map((err, index) => (
            <p key={index}>{t(err)}</p>
          ))}
        </Toast>
      )}

      {updateStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          actionAfterTimeout={() => {
            dispatch(resetUpdateStatus());
          }}
        >
          <p>{t("update-succeeded")}</p>
        </Toast>
      )}

      {updateStatus === "failed" && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          actionAfterTimeout={() => {
            dispatch(resetUpdateError());
          }}
        >
          <p>{t(updateError)}</p>
        </Toast>
      )}

      {changeLogoError && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          actionAfterTimeout={() => dispatch(resetChangeLogoError())}
        >
          <p>{t(changeLogoError)}</p>
        </Toast>
      )}

      {changeLogoStatus === "loading" && (
        <Loader
          allowCancel={true}
          onclick={() => {
            cancelOperation();
          }}
        />
      )}

      {deleteStatus === "loading" && <Loader allowCancel={false} />}

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

export default UserProfileNotifications;
