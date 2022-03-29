// libraries
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUser } from "../../redux/auth/authSlice";
import { resetUserPassword, updateUser } from "../../redux/users/usersSlice";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";

// react-icons
import { BsFillPersonCheckFill, BsFillPersonDashFill } from "react-icons/bs";
import { IoMdMore } from "react-icons/io";
import { BiShow, BiHide } from "react-icons/bi";
import { AiFillUnlock, AiFillLock } from "react-icons/ai";
import { CgPassword } from "react-icons/cg";

// components
import Modal from "../modal/modal.component";
import UserMoreInfoModal from "../user-more-info-modal/user-more-info-modal.component";
import ActinIcon from "../action-icon/action-icon.component";
import AdminResetUserPasswordModal from "../admin-reset-user-password-modal/admin-reset-user-password-modal";
import Icon from "../action-icon/action-icon.component";

// styles
import generalStyles from "../../style.module.scss";
import rowStyles from "../row.module.scss";
import tableStyles from "../table.module.scss";

// constants
import { Colors, UserTypeConstants } from "../../utils/constants";
import {
  setCompany,
  setSearchCompanyName,
  setSearchWarehouseName,
  setRole,
  setWarehouse,
} from "../../redux/items/itemsSlices";

// UserRow component
function UserRow({ user }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const isOnline = useSelector(selectOnlineStatus);
  const token = useSelector(selectToken);
  const loggedUser = useSelector(selectUser);

  // own states
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
            return <p>{t("approve-account-question")}</p>;
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
          return <p>{t("disapprove-account-question")}</p>;
        },
      });
    }

    if (type === "undo-delete") {
      setActionType("undoDelete");
      setModalInfo({
        ...modalInfo,
        header: "undo-delete-account",
        body: () => {
          return <p>{t("undo-delete-account-question")}</p>;
        },
      });
    }

    if (type === "delete") {
      setActionType("delete");
      setModalInfo({
        ...modalInfo,
        header: "delete-account",
        body: () => {
          return <p>{t("delete-account-question")}</p>;
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
            isApproved: false,
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
            isApproved: true,
          },
          userId: user._id,
          token,
        })
      );
    }

    if (actionType === "undoDelete") {
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

    if (actionType === "delete") {
      dispatch(
        updateUser({
          body: {
            isActive: false,
            isApproved: false,
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

  const userNameClickHandler = () => {
    dispatch(setCompany(user.type === UserTypeConstants.COMPANY ? user : null));
    dispatch(
      setSearchCompanyName(
        user.type === UserTypeConstants.COMPANY ? user.name : ""
      )
    );
    dispatch(
      setWarehouse(user.type === UserTypeConstants.WAREHOUSE ? user : null)
    );
    dispatch(
      setSearchWarehouseName(
        user.type === UserTypeConstants.WAREHOUSE ? user.name : ""
      )
    );
    dispatch(
      setRole(
        user.type === UserTypeConstants.COMPANY
          ? UserTypeConstants.COMPANY
          : UserTypeConstants.WAREHOUSE
      )
    );
  };

  return (
    <>
      <div className={[rowStyles.container].join(" ")}>
        <label className={tableStyles.label_large}>
          {user.type === UserTypeConstants.COMPANY ||
          user.type === UserTypeConstants.WAREHOUSE ? (
            <Link
              onClick={userNameClickHandler}
              to={{
                pathname: "/items",
              }}
              className={rowStyles.hover_underline}
            >
              {user.name}
            </Link>
          ) : (
            user.name
          )}
        </label>

        <label
          className={[
            tableStyles.label_small,
            generalStyles.flex_center_container,
          ].join(" ")}
        >
          {user.isApproved ? (
            <Icon
              tooltip={t("tooltip-approve")}
              onclick={() => userStatusChangeConfirmHandler("disapprove")}
              icon={() => <AiFillUnlock />}
              foreColor={Colors.SUCCEEDED_COLOR}
            />
          ) : (
            <Icon
              tooltip={t("tooltip-disapprove")}
              onclick={() => userStatusChangeConfirmHandler("approve")}
              icon={() => <AiFillLock />}
              foreColor={Colors.FAILED_COLOR}
            />
          )}
        </label>

        <label
          className={[
            tableStyles.label_small,
            generalStyles.flex_center_container,
          ].join(" ")}
        >
          {user.isActive ? (
            <Icon
              tooltip={t("tooltip-undo-delete")}
              onclick={() => userStatusChangeConfirmHandler("delete")}
              icon={() => <BsFillPersonCheckFill />}
              foreColor={Colors.SUCCEEDED_COLOR}
            />
          ) : (
            <Icon
              tooltip={t("tooltip-delete")}
              onclick={() => userStatusChangeConfirmHandler("undo-delete")}
              icon={() => <BsFillPersonDashFill />}
              foreColor={Colors.FAILED_COLOR}
            />
          )}
        </label>
        <label
          className={[
            tableStyles.label_small,
            generalStyles.flex_center_container,
          ].join(" ")}
        >
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
        </label>

        <label
          className={[
            tableStyles.label_small,
            generalStyles.flex_center_container,
          ].join(" ")}
        >
          {t(user.type)}
        </label>

        <label
          className={[tableStyles.label_large, tableStyles.hide_on_small].join(
            " "
          )}
        >
          {user.email}
        </label>
        <label
          className={[
            tableStyles.label_medium,
            tableStyles.hide_on_medium,
          ].join(" ")}
        >
          {user.phone}
        </label>
        <label
          className={[
            tableStyles.label_medium,
            tableStyles.hide_on_medium,
          ].join(" ")}
        >
          {user.mobile}
        </label>
        <label
          className={[
            tableStyles.label_xsmall,
            generalStyles.flex_center_container,
          ].join(" ")}
        >
          <Icon
            tooltip={t("change-password-tooltip")}
            onclick={() => setShowResetUserPasswordModal(true)}
            icon={() => <CgPassword />}
            foreColor={Colors.MAIN_COLOR}
          />
        </label>
        <label className={tableStyles.label_xsmall}>
          <Icon
            tooltip={t("user-more-info-title")}
            onclick={() => setShowMoreInfo(true)}
            icon={() => <IoMdMore />}
            foreColor={Colors.MAIN_COLOR}
          />
        </label>
      </div>

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

      {showMoreInfo && (
        <UserMoreInfoModal user={user} close={() => setShowMoreInfo(false)} />
      )}
    </>
  );
}

export default UserRow;
