import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import { UserTypeConstants } from "../../utils/constants";

// styles
import generalStyles from "../../style.module.scss";
import styles from "./baskets-options-page.module.scss";
import { useHistory } from "react-router-dom";

const BasketsOptionsPage = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { user } = useSelector(selectUserData);

  return (
    <div className={generalStyles.container_with_header}>
      <div
        className={styles.option}
        onClick={() => {
          history.push("/all-baskets");
        }}
      >
        {user.type === UserTypeConstants.WAREHOUSE
          ? t("my-baskets")
          : t("baskets")}
      </div>
      <div
        onClick={() => {
          history.push("/ordered-baskets");
        }}
        className={styles.option}
      >
        {t("baskets-order")}
      </div>
    </div>
  );
};

export default BasketsOptionsPage;
