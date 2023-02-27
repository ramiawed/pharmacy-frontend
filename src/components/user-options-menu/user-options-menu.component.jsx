import React from "react";
import { useTranslation } from "react-i18next";
import { UserTypeConstants } from "../../utils/constants";

import styles from "./user-options-menu.module.scss";

const UserOptionsMenu = ({
  user,
  index,
  closeHandler,
  changeStatusHandler,
  changePasswordHandler,
  moreInfoHandler,
  deleteAccountForeverHandler,
  increasePointsHandler,
  decreasePointsHandler,
}) => {
  const { t } = useTranslation();
  return (
    <div
      className={[
        styles.menu,
        index < 7 ? styles.fromTop : styles.fromBottom,
      ].join(" ")}
    >
      <div
        className={styles.option}
        onClick={() => {
          changeStatusHandler(user.isActive ? "disapprove" : "approve");
          closeHandler();
        }}
      >
        {t(user.isActive ? "deactivate account" : "activate account")}
      </div>
      <div
        className={styles.option}
        onClick={() => {
          deleteAccountForeverHandler(true);
          closeHandler();
        }}
      >
        {t("delete user forever")}
      </div>
      {user.type === UserTypeConstants.PHARMACY && (
        <>
          <div
            className={styles.option}
            onClick={() => {
              increasePointsHandler(true);
              closeHandler();
            }}
          >
            {t("increase points")}
          </div>
          <div
            className={styles.option}
            onClick={() => {
              decreasePointsHandler(true);
              closeHandler();
            }}
          >
            {t("decrease points")}
          </div>
        </>
      )}
      {user.type === UserTypeConstants.WAREHOUSE && (
        <div
          className={styles.option}
          onClick={() => {
            changeStatusHandler(
              user.allowShowingMedicines ? "undoShowMedicines" : "showMedicines"
            );
            closeHandler();
          }}
        >
          {t(
            user.allowShowingMedicines
              ? "tooltip-undo-show-medicines"
              : "tooltip-show-medicines"
          )}
        </div>
      )}

      <div
        className={styles.option}
        onClick={() => {
          changePasswordHandler(true);
          closeHandler();
        }}
      >
        {t("change-password")}
      </div>

      <div
        className={styles.option}
        onClick={() => {
          moreInfoHandler(true);
          closeHandler();
        }}
      >
        {t("user-more-info-title")}
      </div>
    </div>
  );
};

export default UserOptionsMenu;
