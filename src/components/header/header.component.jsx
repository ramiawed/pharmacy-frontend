import React from "react";
import { useTranslation } from "react-i18next";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useHistory } from "react-router-dom";
import { Colors } from "../../utils/constants";
import Icon from "../action-icon/action-icon.component";

// style
import styles from "./header.module.scss";

function Header({ children }) {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <div className={styles.header}>
      {children}
      <div className={styles.back}>
        <Icon
          tooltip={t("go-back")}
          onclick={() => {
            history.goBack();
          }}
          icon={() => <IoMdArrowRoundBack />}
          foreColor={Colors.WHITE_COLOR}
        />
      </div>
    </div>
  );
}

export default Header;
