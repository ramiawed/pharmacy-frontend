import React from "react";
import { useTranslation } from "react-i18next";

// constants
import { UserTypeConstants } from "../../utils/constants";

// styles
import styles from "./user-options-menu.module.scss";

const UserOptionsMenu = ({
  user,
  closeHandler,
  changeStatusHandler,
  changePasswordHandler,
  moreInfoHandler,
  deleteAccountForeverHandler,
  increasePointsHandler,
  decreasePointsHandler,
  position,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={[
        styles.menu,
        window.innerHeight * 1 - position > 400
          ? styles.fromTop
          : styles.fromBottom,
      ].join(" ")}
    >
      <div
        className={styles.option}
        onClick={() => {
          changeStatusHandler(user.isActive ? "inactive" : "active");
          closeHandler();
        }}
      >
        {t(user.isActive ? "inactive account action" : "active account action")}
      </div>
      <div
        className={styles.option}
        onClick={() => {
          deleteAccountForeverHandler(true);
          closeHandler();
        }}
      >
        {t("permanently delete the account")}
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
          {t(user.allowShowingMedicines ? "dont show items" : "show items")}
        </div>
      )}

      <div
        className={styles.option}
        onClick={() => {
          changePasswordHandler(true);
          closeHandler();
        }}
      >
        {t("change password")}
      </div>

      <div
        className={styles.option}
        onClick={() => {
          moreInfoHandler(true);
          closeHandler();
        }}
      >
        {t("more info")}
      </div>
    </div>
  );
};

export default UserOptionsMenu;
