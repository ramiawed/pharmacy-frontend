import React from "react";
import { useTranslation } from "react-i18next";
import { GuestJob, UserTypeConstants } from "../../utils/constants";

// components
import Modal from "../modal/modal.component";

// styles
import styles from "./user-more-info-modal.module.scss";

function UserMoreInfoModal({ user, close }) {
  const { t } = useTranslation();

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
        <label className={styles.label}>{t("user-district")}:</label>
        <label className={styles.label_value}>{user.district}</label>
      </div>

      <div className={styles.row}>
        <label className={styles.label}>{t("user-street")}:</label>
        <label className={styles.label_value}>{user.street}</label>
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

      {user.type === UserTypeConstants.NORMAL ? (
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
    </Modal>
  );
}

export default UserMoreInfoModal;
