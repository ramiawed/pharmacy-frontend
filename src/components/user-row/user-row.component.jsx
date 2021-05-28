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
import { Colors, GuestJob, UserTypeConstants } from "../../utils/constants";

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
                color={Colors.SUCCEEDED_COLOR}
                tooltip="tooltip-disapprove"
                icon={() => <AiFillUnlock />}
                action={() => handleActionIconClick("disapprove")}
              />
            ) : (
              <ActionButton
                color={Colors.FAILED_COLOR}
                tooltip="tooltip-approve"
                icon={() => <AiFillLock />}
                action={() => handleActionIconClick("approve")}
              />
            )}
          </label>
          <label className={styles.label_small}>
            {user.isActive ? (
              <ActionButton
                color={Colors.SUCCEEDED_COLOR}
                tooltip="tooltip-delete"
                icon={() => <BsFillPersonCheckFill />}
                action={() => handleActionIconClick("delete")}
              />
            ) : (
              <ActionButton
                color={Colors.FAILED_COLOR}
                tooltip="tooltip-undo-delete"
                icon={() => <BsFillPersonDashFill />}
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
                color={Colors.SECONDARY_COLOR}
                tooltip="tooltip-expanded"
                icon={() => <BsFillCaretDownFill />}
                action={() => setCollapsed(!collapsed)}
              />
            ) : (
              <ActionButton
                color={Colors.SECONDARY_COLOR}
                tooltip="tooltip-collapsed"
                icon={() => <BsFillCaretUpFill />}
                action={() => setCollapsed(!collapsed)}
              />
            )}
          </div>
        </div>
        {!collapsed && (
          <div className={styles.expanded_info_div}>
            <div
              style={{
                backgroundImage: 'url("http://localhost:8000/avatar01.png',
              }}
              className={styles.profile_img}
            ></div>
            <div className={styles.advanced_info}>
              <div className={styles.half_row}>
                <label className={styles.label}>{t("user-username")}:</label>
                <label>{user.username}</label>
              </div>
              <div className={styles.half_row}>
                <label className={styles.label}>{t("user-type")}:</label>
                <label>{t(`${user.type.toLowerCase()}`)}</label>
              </div>
              <div className={styles.half_row}>
                <label className={styles.label}>{t("user-city")}:</label>
                <label>{user.city}</label>
              </div>
              <div className={styles.half_row}></div>
              <div className={styles.half_row}>
                <label className={styles.label}>{t("user-district")}:</label>
                <label>{user.district}</label>
              </div>
              <div className={styles.half_row}>
                <label className={styles.label}>{t("user-street")}:</label>
                <label>{user.street}</label>
              </div>

              {/* if the user type is pharmacy or warehouse display employee name and certificate name */}
              {user.type === UserTypeConstants.PHARMACY ||
              user.type === UserTypeConstants.WAREHOUSE ? (
                <>
                  <div className={styles.half_row}>
                    <label className={styles.label}>
                      {t("user-employee-name")}:
                    </label>
                    <label>{user.employeeName}</label>
                  </div>
                  <div className={styles.half_row}>
                    <label className={styles.label}>
                      {t("user-certificate-name")}:
                    </label>
                    <label>{user.certificateName}</label>
                  </div>
                </>
              ) : null}

              {user.type === UserTypeConstants.NORMAL ? (
                <>
                  <div className={styles.half_row}>
                    <label className={styles.label}>{t("user-job")}:</label>
                    <label>{t(`${user.guestDetails.job.toLowerCase()}`)}</label>
                  </div>
                  <div className={styles.half_row}></div>
                  {user.guestDetails.job === GuestJob.EMPLOYEE ? (
                    <>
                      <div className={styles.half_row}>
                        <label className={styles.label}>
                          {t("user-company-name")}:
                        </label>
                        <label>{user.guestDetails.companyName}</label>
                      </div>
                      <div className={styles.half_row}>
                        <label className={styles.label}>
                          {t("user-job-title")}:
                        </label>
                        <label>{user.guestDetails.jobTitle}</label>
                      </div>
                    </>
                  ) : null}
                </>
              ) : null}
            </div>
          </div>
        )}
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
