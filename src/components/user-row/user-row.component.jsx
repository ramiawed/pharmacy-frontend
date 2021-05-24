// libraries
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BsFillCaretDownFill,
  BsFillCaretUpFill,
  BsFillPersonCheckFill,
  BsFillPersonDashFill,
} from "react-icons/bs";
import { AiFillUnlock, AiFillLock } from "react-icons/ai";

// component
import ActionButton from "../action-button/action-button.component";

// styles
import styles from "./user-row.module.scss";
import Modal from "../modal/modal.component";
import { useTranslation } from "react-i18next";

function UserRow({ user, index }) {
  const { t } = useTranslation();
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

  const handleActionClick = (type) => {
    if (type === "approve") {
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

    if (type === "disapprove") {
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

  return (
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
              action={() => handleActionClick("disapprove")}
            />
          ) : (
            <ActionButton
              tooltip="tooltip-approve"
              icon={() => <AiFillLock color="rgb(255, 100, 100)" />}
              action={() => handleActionClick("approve")}
            />
          )}
        </label>
        <label className={styles.label_small}>
          {user.isActive ? (
            <ActionButton
              tooltip="tooltip-delete"
              icon={() => <BsFillPersonCheckFill color="rgb(100, 175, 100)" />}
              action={() => handleActionClick("delete")}
            />
          ) : (
            <ActionButton
              tooltip="tooltip-undo-delete"
              icon={() => <BsFillPersonDashFill color="rgb(255, 100, 100)" />}
              action={() => handleActionClick("undo-delete")}
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
          closeModal={() => setShowModal(false)}
        >
          {modalInfo.body()}
        </Modal>
      )}
    </motion.div>
  );
}

export default UserRow;
