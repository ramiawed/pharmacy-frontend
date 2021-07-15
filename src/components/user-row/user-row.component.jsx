// libraries
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// redux stuff
import { useDispatch, useSelector } from "react-redux";

import { selectToken } from "../../redux/auth/authSlice";
import {
  userApproveChange,
  deleteUser,
  undoDeleteUser,
  resetUserPassword,
} from "../../redux/users/usersSlice";

// react-icons
import { BsFillPersonCheckFill, BsFillPersonDashFill } from "react-icons/bs";
import { IoMdMore } from "react-icons/io";
import { AiFillUnlock, AiFillLock, AiFillEdit } from "react-icons/ai";

// component
import Modal from "../modal/modal.component";
import UserMoreInfoModal from "../user-more-info-modal/user-more-info-modal.component";
import PasswordRow from "../password-row/password-row.component";

// styles
import generalStyles from "../../style.module.scss";
import rowStyles from "../row.module.scss";
import tableStyles from "../table.module.scss";

// constants
import { checkConnection } from "../../utils/checkInternet";

// UserRow component
function UserRow({ user, index }) {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const token = useSelector(selectToken);

  const [modalInfo, setModalInfo] = useState({
    header: "",
    body: "",
    cancelLabel: "cancel-label",
    okLabel: "ok-label",
  });
  const [showModal, setShowModal] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [showResetUserPasswordModal, setShowResetUserPasswordModal] =
    useState(false);
  const [actionType, setActionType] = useState("");
  const [passwordObj, setPasswordObj] = useState({
    newPassword: "",
    newPasswordConfirm: "",
  });

  const [passwordObjError, setPasswordObjError] = useState({
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

  const changeUserPassword = () => {
    let errorObj = {};

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
      return;
    }

    dispatch(
      resetUserPassword({
        userId: user._id,
        newPassword: passwordObj.newPassword,
        newPasswordConfirm: passwordObj.newPasswordConfirm,
        token,
      })
    );

    setPasswordObj({
      newPassword: "",
      newPasswordConfirm: "",
    });

    setShowResetUserPasswordModal(false);
  };

  // handle press on the action icon in each row
  // based on the type of the action icon will set the modal info
  // show modal
  const handleActionIconClick = (type) => {
    // the icon represent that the user is approve by the admin
    // when click on this icon show warning message
    if (type === "approve") {
      if (!user.isActive) {
        setActionType("");
        setModalInfo({
          ...modalInfo,
          header: "warning",
          body: () => {
            return (
              <>
                <p>{t("can't-approve-user")}</p>
              </>
            );
          },
        });
      } else {
        setActionType("disapprove");
        setModalInfo({
          ...modalInfo,
          header: "approve-account",
          body: () => {
            return (
              <>
                <p>{t("approve-account-question")}</p>
              </>
            );
          },
        });
      }
    }

    if (type === "disapprove") {
      setActionType("approve");
      setModalInfo({
        ...modalInfo,
        header: "disapprove-account",
        body: () => {
          return (
            <>
              <p>{t("disapprove-account-question")}</p>
            </>
          );
        },
      });
    }

    if (type === "undo-delete") {
      setActionType("delete");
      setModalInfo({
        ...modalInfo,
        header: "undo-delete-account",
        body: () => {
          return (
            <>
              <p>{t("undo-delete-account-question")}</p>
            </>
          );
        },
      });
    }

    if (type === "delete") {
      setActionType("undo-delete");
      setModalInfo({
        ...modalInfo,
        header: "delete-account",
        body: () => {
          return (
            <>
              <p>{t("delete-account-question")}</p>
            </>
          );
        },
      });
    }

    setShowModal(true);
  };

  // handle press ok in the modal
  // this handler based on the actionType state
  // if the actionType === approve dispatch disapprove action
  // if the actionType === disapprove dispatch approve action
  const handlePressOkOnModal = () => {
    // dispatch disapprove action from usersSlice
    if (actionType === "approve") {
      dispatch(
        userApproveChange({
          status: "disable",
          userId: user._id,
          token: token,
        })
      );
    }

    // dispatch approve action from usesSlice
    if (actionType === "disapprove") {
      dispatch(
        userApproveChange({
          status: "enable",
          userId: user._id,
          token: token,
        })
      );
    }

    if (actionType === "delete") {
      dispatch(undoDeleteUser({ userId: user._id, token: token }));
    }

    if (actionType === "undo-delete") {
      dispatch(deleteUser({ userId: user._id, token: token }));
    }

    setShowModal(false);
  };

  return (
    <>
      <div className={[rowStyles.container].join(" ")}>
        {/* <div className={styles.basic_info}> */}
        <label className={tableStyles.label_large}>{user.name}</label>
        {/* <label>{user.username}</label> */}
        <label className={tableStyles.label_small}>
          {user.isApproved ? (
            <div
              className={[
                generalStyles.icon,
                generalStyles.fc_green,
                generalStyles.margin_h_auto,
              ].join(" ")}
              onClick={() => handleActionIconClick("disapprove")}
            >
              <AiFillUnlock size={16} />
              <div className={generalStyles.tooltip}>
                {t("tooltip-disapprove")}
              </div>
            </div>
          ) : (
            <div
              className={[
                generalStyles.icon,
                generalStyles.fc_red,
                generalStyles.margin_h_auto,
              ].join(" ")}
              onClick={() => handleActionIconClick("approve")}
            >
              <AiFillLock size={16} />
              <div className={generalStyles.tooltip}>
                {t("tooltip-approve")}
              </div>
            </div>
          )}
        </label>
        <label className={tableStyles.label_small}>
          {user.isActive ? (
            <div
              className={[
                generalStyles.icon,
                generalStyles.fc_green,
                generalStyles.margin_h_auto,
              ].join(" ")}
              onClick={() => handleActionIconClick("delete")}
            >
              <BsFillPersonCheckFill size={16} />
              <div className={generalStyles.tooltip}>{t("tooltip-delete")}</div>
            </div>
          ) : (
            <div
              className={[
                generalStyles.icon,
                generalStyles.fc_red,
                generalStyles.margin_h_auto,
              ].join(" ")}
              onClick={() => handleActionIconClick("undo-delete")}
            >
              <BsFillPersonDashFill size={16} />
              <div className={generalStyles.tooltip}>
                {t("tooltip-undo-delete")}
              </div>
            </div>
          )}{" "}
        </label>
        <label className={tableStyles.label_large}> {user.email}</label>
        <label className={tableStyles.label_medium}>{user.phone}</label>
        <label className={tableStyles.label_medium}>{user.mobile}</label>
        <label className={tableStyles.label_xsmall}>
          <div
            className={[generalStyles.icon, generalStyles.margin_h_auto].join(
              " "
            )}
            onClick={() => setShowResetUserPasswordModal(true)}
          >
            <AiFillEdit />
            <div className={generalStyles.tooltip}>
              {t("change-password-tooltip")}
            </div>
          </div>
        </label>
        <label className={tableStyles.label_xsmall}>
          <div
            className={[generalStyles.icon, generalStyles.margin_h_auto].join(
              " "
            )}
            onClick={() => setShowMoreInfo(true)}
          >
            <IoMdMore size={20} />
            <div className={generalStyles.tooltip}>
              {t("user-more-info-title")}
            </div>
          </div>
        </label>
      </div>

      {showModal && (
        <Modal
          header={modalInfo.header}
          cancelLabel={modalInfo.cancelLabel}
          okLabel={modalInfo.okLabel}
          okModal={() => handlePressOkOnModal()}
          closeModal={() => setShowModal(false)}
          small={true}
        >
          {modalInfo.body()}
        </Modal>
      )}

      {showResetUserPasswordModal && (
        <Modal
          header="change-password-tooltip"
          okLabel="ok-label"
          cancelLabel="cancel-label"
          okModal={changeUserPassword}
          closeModal={() => {
            setShowResetUserPasswordModal(false);
            setPasswordObj({
              newPassword: "",
              newPasswordConfirm: "",
            });
            setPasswordObjError({
              newPassword: "",
              newPasswordConfirm: "",
            });
          }}
          small={true}
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
      )}

      {showMoreInfo && (
        <UserMoreInfoModal user={user} close={() => setShowMoreInfo(false)} />
      )}
    </>
  );
}

export default UserRow;
