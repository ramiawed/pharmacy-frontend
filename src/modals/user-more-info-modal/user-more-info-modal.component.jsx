import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Colors,
  GuestJob,
  SERVER_URL,
  UserTypeConstants,
} from "../../utils/constants";
import { deleteImage } from "../../utils/handlers";

// components
import LabelValueRow from "../../components/label-value-row/label-value-row.component";
import Separator from "../../components/separator/separator.component";
import Icon from "../../components/icon/icon.component";
import Modal from "../modal/modal.component";
import ActionBar from "../../components/action-bar/action-bar.component";

// react icons
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiImage } from "react-icons/fi";

// styles
import styles from "./user-more-info-modal.module.scss";

// redux stuff
import { useSelector } from "react-redux";
import { selectToken } from "../../redux/auth/authSlice";

function UserMoreInfoModal({ user, close }) {
  const { t } = useTranslation();
  const token = useSelector(selectToken);

  const [showUserDocument, setShowUserDocument] = useState(false);
  const [showDeleteLicenseModal, setShowDeleteLicenseModal] = useState(false);

  const deleteHandler = () => {
    deleteImage(
      { source: `licenses/${user.paper_url}`, id: user._id, type: "license" },
      token
    );
    setShowDeleteLicenseModal(false);
  };

  return (
    <Modal
      header="more info"
      cancelLabel="close"
      closeModal={close}
      small={true}
    >
      <div className={[styles.header].join(" ")}>{t("personal info")}</div>
      <LabelValueRow label="username" value={user.username} />
      <Separator />

      <LabelValueRow
        label="user type"
        value={t(`${user.type.toLowerCase()}`)}
      />
      <Separator />

      <LabelValueRow label="created at" value={user.createdAt.split("T")[0]} />
      <Separator />

      {(user.type === UserTypeConstants.PHARMACY ||
        user.type === UserTypeConstants.GUEST) && (
        <>
          <div className={styles.row}>
            <label className={styles.label}>
              {user.type === UserTypeConstants.PHARMACY
                ? t("pharmacy liscense")
                : t("guest card")}
              :
            </label>
            <label className={styles.value}>{user.paper_url}</label>
          </div>

          <ActionBar>
            <Icon
              selected={false}
              foreColor={Colors.LIGHT_COLOR}
              tooltip={t("show liscense or card")}
              onclick={() => {
                setShowUserDocument(true);
              }}
              icon={() => <FiImage size={24} color={Colors.MAIN_COLOR} />}
              text={t("show liscense or card")}
              withBackground={true}
            />
            <Icon
              selected={false}
              foreColor={Colors.LIGHT_COLOR}
              tooltip={t("delete liscense or card")}
              onclick={() => {
                setShowDeleteLicenseModal(true);
              }}
              icon={() => (
                <RiDeleteBin5Line size={24} color={Colors.MAIN_COLOR} />
              )}
              text={t("delete liscense or card")}
              withBackground={true}
            />
          </ActionBar>
        </>
      )}

      <div className={[styles.header].join(" ")}>{t("communication info")}</div>

      <LabelValueRow label="email" value={user.email} />
      <Separator />

      <LabelValueRow label="phone" value={user.phone} />
      <Separator />

      <LabelValueRow label="mobile" value={user.mobile} />
      <Separator />

      <div className={[styles.header].join(" ")}>{t("address")}</div>
      <LabelValueRow label="city" value={t(user.city)} />
      <Separator />

      <LabelValueRow label="address" value={user.addressDetails} />
      <Separator />

      {/* if the user type is pharmacy or warehouse display employee name and certificate name */}
      {user.type === UserTypeConstants.PHARMACY ||
      user.type === UserTypeConstants.WAREHOUSE ? (
        <>
          <div className={[styles.header].join(" ")}>
            {t("additional info")}
          </div>

          <LabelValueRow label="employee name" value={user.employeeName} />
          <Separator />

          <LabelValueRow
            label="certificate name"
            value={user.certificateName}
          />
          <Separator />
        </>
      ) : null}

      {user.type === UserTypeConstants.GUEST ? (
        <>
          <div className={[styles.header].join(" ")}>
            {t("additional info")}
          </div>
          <LabelValueRow
            label="job"
            value={t(`${user.guestDetails.job.toLowerCase()}`)}
          />
          <Separator />

          {user.guestDetails.job === GuestJob.EMPLOYEE ? (
            <>
              <LabelValueRow
                label="company"
                value={user.guestDetails.companyName}
              />
              <Separator />

              <LabelValueRow
                label="job title"
                value={user.guestDetails.jobTitle}
              />
              <Separator />
            </>
          ) : null}
        </>
      ) : null}

      {showUserDocument && (
        <Modal
          header="show liscense or card"
          cancelLabel="close"
          closeModal={() => {
            setShowUserDocument(false);
          }}
          small={true}
        >
          <img
            src={`${SERVER_URL}/licenses/${user.paper_url}`}
            style={{
              display: "block",
              width: "300px",
              height: "300px",
              marginInline: "auto",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            alt="Thumb"
          />
        </Modal>
      )}

      {showDeleteLicenseModal && (
        <Modal
          header="delete liscense or card"
          cancelLabel="close"
          closeModal={() => {
            setShowDeleteLicenseModal(false);
          }}
          okLabel="ok"
          okModal={deleteHandler}
          small={true}
        >
          <p>{t("delete pharmacy license or card confirm msg")}</p>
        </Modal>
      )}
    </Modal>
  );
}

export default UserMoreInfoModal;
