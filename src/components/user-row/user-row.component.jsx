// libraries
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";

import {
  userApproveChange,
  deleteUser,
  undoDeleteUser,
} from "../../redux/users/usersSlice";

// react-icons
import {
  BsFillCaretDownFill,
  BsFillCaretUpFill,
  BsFillPersonCheckFill,
  BsFillPersonDashFill,
} from "react-icons/bs";
import { AiFillUnlock, AiFillLock } from "react-icons/ai";

// component
import ActionButton from "../action-button/action-button.component";
import Modal from "../modal/modal.component";

// styles
import styles from "./user-row.module.scss";
import { selectToken } from "../../redux/auth/authSlice";

// UserRow component
function UserRow({ user, index }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const token = useSelector(selectToken);

  const containerVariant = {
    hidden: {
      opacity: 0,
      left: "-100vh",
    },
    visible: {
      opacity: 1,
      left: "0",
      transition: {
        type: "tween",
        delay: index * 0.02,
      },
    },
  };
  const [modalInfo, setModalInfo] = useState({
    header: "",
    body: "",
    cancelLabel: "cancel-label",
    okLabel: "ok-label",
  });
  const [showModal, setShowModal] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [actionType, setActionType] = useState("");

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
      <motion.div
        variants={containerVariant}
        initial="hidden"
        animate="visible"
        className={[
          styles.user_row,
          collapsed ? "" : `${styles.user_row_expanded}`,
          index % 2 === 0 ? `${styles.odd}` : `${styles.even}`,
        ].join(" ")}
      >
        <div className={styles.basic_info}>
          <label className={styles.label_large}>{user.name}</label>
          {/* <label>{user.username}</label> */}
          <label className={styles.label_small}>
            {user.isApproved ? (
              <ActionButton
                tooltip="tooltip-disapprove"
                icon={() => <AiFillUnlock color="rgb(100, 175, 100)" />}
                action={() => handleActionIconClick("disapprove")}
              />
            ) : (
              <ActionButton
                tooltip="tooltip-approve"
                icon={() => <AiFillLock color="rgb(255, 100, 100)" />}
                action={() => handleActionIconClick("approve")}
              />
            )}
          </label>
          <label className={styles.label_small}>
            {user.isActive ? (
              <ActionButton
                tooltip="tooltip-delete"
                icon={() => (
                  <BsFillPersonCheckFill color="rgb(100, 175, 100)" />
                )}
                action={() => handleActionIconClick("delete")}
              />
            ) : (
              <ActionButton
                tooltip="tooltip-undo-delete"
                icon={() => <BsFillPersonDashFill color="rgb(255, 100, 100)" />}
                action={() => handleActionIconClick("undo-delete")}
              />
            )}{" "}
          </label>
          <label className={styles.label_large}> {user.email}</label>
          <label className={styles.label_medium}>{user.phone}</label>
          <label className={styles.label_medium}>{user.mobile}</label>
          <div className={styles.actions_div}>
            {collapsed ? (
              <ActionButton
                tooltip="tooltip-expanded"
                icon={() => <BsFillCaretDownFill color="rgb(100, 100, 255)" />}
                action={() => setCollapsed(!collapsed)}
              />
            ) : (
              <ActionButton
                tooltip="tooltip-collapsed"
                icon={() => <BsFillCaretUpFill />}
                action={() => setCollapsed(!collapsed)}
              />
            )}
          </div>
        </div>
        {!collapsed && <div className={styles.expanded_info}>some info</div>}
        {showModal && (
          <Modal
            header={modalInfo.header}
            cancelLabel={modalInfo.cancelLabel}
            okLabel={modalInfo.okLabel}
            okModal={() => handlePressOkOnModal()}
            closeModal={() => setShowModal(false)}
          >
            {modalInfo.body()}
          </Modal>
        )}
      </motion.div>
    </>
  );
}

export default UserRow;
