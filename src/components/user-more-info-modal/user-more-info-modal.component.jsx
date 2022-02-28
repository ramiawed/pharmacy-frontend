import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Colors,
  GuestJob,
  SERVER_URL,
  UserTypeConstants,
} from "../../utils/constants";

// components
import Modal from "../modal/modal.component";
import Icon from "../action-icon/action-icon.component";

// react icons
import { FiImage } from "react-icons/fi";

// styles
import styles from "./user-more-info-modal.module.scss";

function UserMoreInfoModal({ user, close }) {
  const { t } = useTranslation();

  const [showUserDocument, setShowUserDocument] = useState(false);

  return (
    <Modal
      header="user-more-info-title"
      cancelLabel="close-label"
      closeModal={close}
      small={true}
    >
      <div className={[styles.header].join(" ")}>{t("personal-info")}</div>
      <div className={styles.row}>
        <label className={styles.label}>{t("user-username")}:</label>
        <label className={styles.label_value}>{user.username}</label>
      </div>

      <div className={styles.row}>
        <label className={styles.label}>{t("user-type")}:</label>
        <label className={styles.label_value}>
          {t(`${user.type.toLowerCase()}`)}
        </label>
      </div>

      <div className={styles.row}>
        <label className={styles.label}>{t("user-created-at")}:</label>
        <label className={styles.label_value}>
          {user.createdAt.split("T")[0]}
        </label>
      </div>

      {(user.type === UserTypeConstants.PHARMACY ||
        user.type === UserTypeConstants.GUEST) && (
        <div className={styles.row}>
          <label className={styles.label}>
            {user.type === UserTypeConstants.PHARMACY
              ? t("pharmacy-document")
              : t("guest-document")}
            :
          </label>
          {/* <label className={styles.icon}> */}
          <Icon
            selected={false}
            foreColor={Colors.SECONDARY_COLOR}
            tooltip={t("show-paper-url")}
            onclick={() => {
              setShowUserDocument(true);
            }}
            icon={() => <FiImage size={20} />}
          />

          {/* </label> */}
        </div>
      )}

      <div className={[styles.header].join(" ")}>{t("communication-info")}</div>
      <div className={styles.row}>
        <label className={styles.label}>{t("user-email")}:</label>
        <label className={styles.label_value}>{user.email}</label>
      </div>

      <div className={styles.row}>
        <label className={styles.label}>{t("user-phone")}:</label>
        <label className={styles.label_value}>{user.phone}</label>
      </div>

      <div className={styles.row}>
        <label className={styles.label}>{t("user-mobile")}:</label>
        <label className={styles.label_value}>{user.mobile}</label>
      </div>

      <div className={[styles.header].join(" ")}>{t("address-info")}</div>

      <div className={styles.row}>
        <label className={styles.label}>{t("user-city")}:</label>
        <label className={styles.label_value}>{t(user.city)}</label>
      </div>

      <div className={styles.row}>
        <label className={styles.label}>{t("user-address-details")}:</label>
        <label className={styles.label_value}>{user.addressDetails}</label>
      </div>

      {/* if the user type is pharmacy or warehouse display employee name and certificate name */}
      {user.type === UserTypeConstants.PHARMACY ||
      user.type === UserTypeConstants.WAREHOUSE ? (
        <>
          <div className={[styles.header].join(" ")}>
            {t("additional-info")}
          </div>
          <div className={styles.row}>
            <label className={styles.label}>{t("user-employee-name")}:</label>
            <label className={styles.label_value}>{user.employeeName}</label>
          </div>
          <div className={styles.row}>
            <label className={styles.label}>
              {t("user-certificate-name")}:
            </label>
            <label className={styles.label_value}>{user.certificateName}</label>
          </div>
        </>
      ) : null}

      {user.type === UserTypeConstants.GUEST ? (
        <>
          <div className={[styles.header].join(" ")}>
            {t("additional-info")}
          </div>
          <div className={styles.row}>
            <label className={styles.label}>{t("user-job")}:</label>
            <label className={styles.label_value}>
              {t(`${user.guestDetails.job.toLowerCase()}`)}
            </label>
          </div>
          {user.guestDetails.job === GuestJob.EMPLOYEE ? (
            <>
              <div className={styles.row}>
                <label className={styles.label}>
                  {t("user-company-name")}:
                </label>
                <label className={styles.label_value}>
                  {user.guestDetails.companyName}
                </label>
              </div>
              <div className={styles.row}>
                <label className={styles.label}>{t("user-job-title")}:</label>
                <label className={styles.label_value}>
                  {user.guestDetails.jobTitle}
                </label>
              </div>
            </>
          ) : null}
        </>
      ) : null}

      {showUserDocument && (
        <Modal
          header="user-document"
          cancelLabel="close-label"
          closeModal={() => {
            setShowUserDocument(false);
          }}
          small={true}
        >
          <img
            src={`${SERVER_URL}/profiles/${user.paper_url}`}
            style={{
              display: "block",
              width: "300px",
              height: "300px",
              marginInline: "auto",
            }}
            alt="Thumb"
          />
        </Modal>
      )}
    </Modal>
  );
}

export default UserMoreInfoModal;
