// component uses to change the password for a logged user

// Props
// close: action to execute when press on cancel button
// changePasswordHandler: dispatch change password action
// passwordObj: obj contains the password and confirmPassword
// passwordObjError: obj contains the error for password and confirmPassword
// handlePasswordFieldsChange: change the value in the passwordObj for password and confirmPassword

import React from "react";
import { useTranslation } from "react-i18next";

// components
import Modal from "../modal/modal.component";
import PasswordRow from "../../components/password-row/password-row.component";

function AdminResetUserPasswordModal({
  close,
  changePasswordHandler,
  passwordObj,
  passwordObjError,
  handlePasswordFieldsChange,
}) {
  const { t } = useTranslation();

  return (
    <Modal
      header="change password"
      cancelLabel="cancel"
      closeModal={close}
      small={true}
      okLabel="ok"
      okModal={changePasswordHandler}
    >
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
    </Modal>
  );
}

export default AdminResetUserPasswordModal;
