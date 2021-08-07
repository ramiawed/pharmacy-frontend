import React from "react";
import { useTranslation } from "react-i18next";

// components
import Modal from "../modal/modal.component";
import PasswordRow from "../password-row/password-row.component";

function AdminResetUserPasswordModal({
  close,
  resetPassword,
  passwordObj,
  passwordObjError,
  handlePasswordFieldsChange,
}) {
  const { t } = useTranslation();

  return (
    <Modal
      header="change-password-tooltip"
      cancelLabel="close-label"
      closeModal={close}
      small={true}
      okLabel="ok-label"
      okModal={resetPassword}
    >
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
    </Modal>
  );
}

export default AdminResetUserPasswordModal;
