// libraries
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// redux stuff
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserForever, selectToken } from "../../redux/auth/authSlice";
import { resetUserPassword, updateUser } from "../../redux/users/usersSlice";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";
import { setPageState } from "../../redux/items/itemsSlices";

// react-icons
import { BsFillPersonCheckFill, BsFillPersonDashFill } from "react-icons/bs";
import { IoMdMore } from "react-icons/io";
import { BiShow, BiHide } from "react-icons/bi";
import { AiFillUnlock, AiFillLock } from "react-icons/ai";

// components
import AdminResetUserPasswordModal from "../../modals/admin-reset-user-password-modal/admin-reset-user-password-modal";
import UserMoreInfoModal from "../../modals/user-more-info-modal/user-more-info-modal.component";
import ChildFlexOneDiv from "../child-flex-one-div/child-flex-one-div.component";
import UserOptionsMenu from "../user-options-menu/user-options-menu.component";
import FixedSizeDiv from "../fixed-size-div/fixed-size-div.component";
import RowContainer from "../row-container/row-container.component";
import Modal from "../../modals/modal/modal.component";
import Icon from "../icon/icon.component";

// styles
import rowStyles from "../row.module.scss";
import styles from "./user-row.module.scss";
// constants
import { Colors, UserTypeConstants } from "../../utils/constants";

// UserRow component
function UserRow({ user, index }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const isOnline = useSelector(selectOnlineStatus);
  const token = useSelector(selectToken);

  // own states
  const [modalInfo, setModalInfo] = useState({
    header: "",
    body: "",
    cancelLabel: "cancel-label",
    okLabel: "ok-label",
  });
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [showResetUserPasswordModal, setShowResetUserPasswordModal] =
    useState(false);
  const [actionType, setActionType] = useState("");
  const [showDeleteConfirmModel, setShowDeleteConfirmModel] = useState(false);
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
  const passwordFieldsChangeHandler = (field, val) => {
    setPasswordObj({
      ...passwordObj,
      [field]: val,
    });
    setPasswordObjError({
      ...passwordObjError,
      [field]: "",
    });
  };

  const changeUserPasswordHandler = () => {
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
    if (!isOnline) {
      dispatch(changeOnlineMsg());
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
  const userStatusChangeConfirmHandler = (type) => {
    // the icon represent that the user is approve by the admin
    // when click on this icon show warning message
    if (type === "approve") {
      setActionType("disapprove");
      setModalInfo({
        ...modalInfo,
        header: "approve-account",
        body: () => {
          return <p>{t("approve-account-question")}</p>;
        },
      });
    }

    if (type === "disapprove") {
      setActionType("approve");
      setModalInfo({
        ...modalInfo,
        header: "disapprove-account",
        body: () => {
          return <p>{t("disapprove-account-question")}</p>;
        },
      });
    }

    if (type === "showMedicines") {
      setActionType("showMedicines");
      setModalInfo({
        ...modalInfo,
        header: "show-medicines",
        body: () => {
          return <p>{t("show-warehouse-medicines")}</p>;
        },
      });
    }

    if (type === "undoShowMedicines") {
      setActionType("undoShowMedicines");
      setModalInfo({
        ...modalInfo,
        header: "show-medicines",
        body: () => {
          return <p>{t("undo-show-warehouse-medicines")}</p>;
        },
      });
    }

    setShowModal(true);
  };

  // handle press ok in the modal
  // this handler based on the actionType state
  const okActionForConfirmModal = () => {
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    // dispatch disapprove action from usersSlice
    if (actionType === "approve") {
      dispatch(
        updateUser({
          body: {
            isActive: false,
          },
          userId: user._id,
          token,
        })
      );
    }

    // dispatch approve action from usesSlice
    if (actionType === "disapprove") {
      dispatch(
        updateUser({
          body: {
            isActive: true,
          },
          userId: user._id,
          token,
        })
      );
    }

    if (actionType === "undoShowMedicines") {
      dispatch(
        updateUser({
          body: {
            allowShowingMedicines: false,
          },
          userId: user._id,
          token,
        })
      );
    }

    if (actionType === "showMedicines") {
      dispatch(
        updateUser({
          body: {
            allowShowingMedicines: true,
          },
          userId: user._id,
          token,
        })
      );
    }

    setShowModal(false);
  };

  const resetPasswordFieldHandler = () => {
    setShowResetUserPasswordModal(false);
    setPasswordObj({
      newPassword: "",
      newPasswordConfirm: "",
    });
    setPasswordObjError({
      newPassword: "",
      newPasswordConfirm: "",
    });
  };

  const deleteUserForeverHandler = () => {
    dispatch(deleteUserForever({ id: user._id, token }))
      .then(unwrapResult)
      .then(() => {})
      .catch((err) => {});

    setShowDeleteConfirmModel(false);
  };

  const userNameClickHandler = () => {
    dispatch(
      setPageState({
        company: user.type === UserTypeConstants.COMPANY ? user : null,
        warehouse: user.type === UserTypeConstants.WAREHOUSE ? user : null,
        role:
          user.type === UserTypeConstants.COMPANY
            ? UserTypeConstants.COMPANY
            : UserTypeConstants.WAREHOUSE,
      })
    );
  };

  return (
    <>
      <RowContainer isEsven={index % 2}>
        <ChildFlexOneDiv>
          {user.isActive ? (
            <Icon
              tooltip={t("tooltip-undo-delete")}
              onclick={() => userStatusChangeConfirmHandler("disapprove")}
              icon={() => <BsFillPersonCheckFill />}
              foreColor={Colors.SUCCEEDED_COLOR}
            />
          ) : (
            <Icon
              tooltip={t("tooltip-delete")}
              onclick={() => userStatusChangeConfirmHandler("approve")}
              icon={() => <BsFillPersonDashFill />}
              foreColor={Colors.FAILED_COLOR}
            />
          )}
          {user.type === UserTypeConstants.COMPANY ||
          user.type === UserTypeConstants.WAREHOUSE ? (
            <Link
              onClick={userNameClickHandler}
              to={{
                pathname: "/items",
              }}
              className={rowStyles.hover_underline}
            >
              <label>{user.name}</label>
            </Link>
          ) : (
            <label>{user.name}</label>
          )}
        </ChildFlexOneDiv>

        <FixedSizeDiv size="large">
          <label>{t(user.type)}</label>
        </FixedSizeDiv>

        <FixedSizeDiv size="large">
          <label>{t(user.mobile)}</label>
        </FixedSizeDiv>

        <FixedSizeDiv size="medium">
          {user.type === UserTypeConstants.WAREHOUSE ? (
            user.allowShowingMedicines ? (
              <Icon
                tooltip={t("tooltip-show-medicines")}
                onclick={() =>
                  userStatusChangeConfirmHandler("undoShowMedicines")
                }
                icon={() => <BiShow />}
                foreColor={Colors.SUCCEEDED_COLOR}
              />
            ) : (
              <Icon
                tooltip={t("tooltip-undo-show-medicines")}
                onclick={() => userStatusChangeConfirmHandler("showMedicines")}
                icon={() => <BiHide />}
                foreColor={Colors.FAILED_COLOR}
              />
            )
          ) : (
            <></>
          )}
        </FixedSizeDiv>

        <FixedSizeDiv size="small">
          <Icon
            tooltip={t("user-more-info-title")}
            onclick={() => setShowMenu(true)}
            icon={() => <IoMdMore />}
            foreColor={Colors.MAIN_COLOR}
          />
        </FixedSizeDiv>

        {showMenu && (
          <UserOptionsMenu
            user={user}
            index={index}
            closeHandler={() => setShowMenu(false)}
            changeStatusHandler={userStatusChangeConfirmHandler}
            changePasswordHandler={setShowResetUserPasswordModal}
            moreInfoHandler={setShowMoreInfo}
            deleteAccountForeverHandler={setShowDeleteConfirmModel}
          />
        )}
      </RowContainer>

      {showModal && (
        <Modal
          header={modalInfo.header}
          cancelLabel={modalInfo.cancelLabel}
          okLabel={modalInfo.okLabel}
          okModal={okActionForConfirmModal}
          closeModal={() => setShowModal(false)}
          small={true}
        >
          {modalInfo.body()}
        </Modal>
      )}

      {showResetUserPasswordModal && (
        <AdminResetUserPasswordModal
          close={resetPasswordFieldHandler}
          changePasswordHandler={changeUserPasswordHandler}
          passwordObj={passwordObj}
          passwordObjError={passwordObjError}
          handlePasswordFieldsChange={passwordFieldsChangeHandler}
        />
      )}

      {showDeleteConfirmModel && (
        <Modal
          header="delete-user-header"
          cancelLabel="cancel-label"
          okLabel="ok-label"
          okModal={deleteUserForeverHandler}
          closeModal={() => setShowDeleteConfirmModel(false)}
          small={true}
        >
          <p>{t("do you want to delete user forever")}</p>
        </Modal>
      )}

      {showMenu && (
        <div
          onClick={() => setShowMenu(false)}
          className={styles.closable_div}
        ></div>
      )}

      {showMoreInfo && (
        <UserMoreInfoModal user={user} close={() => setShowMoreInfo(false)} />
      )}
    </>
  );
}

export default UserRow;
