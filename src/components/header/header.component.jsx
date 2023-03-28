import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

// components
import Icon from "../icon/icon.component";

// icons
import { IoMdArrowRoundBack } from "react-icons/io";
import { RiRefreshLine } from "react-icons/ri";

// constants
import { Colors } from "../../utils/constants";

// style
import styles from "./header.module.scss";

function Header({ refreshHandler, title, count }) {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <div className={styles.header}>
      <p>
        {t(title)}
        {count ? <span>{count}</span> : ""}
      </p>
      {refreshHandler && (
        <Icon
          selected={false}
          foreColor={Colors.WHITE_COLOR}
          tooltip={t("refresh")}
          onclick={refreshHandler}
          icon={() => <RiRefreshLine />}
        />
      )}
      <Icon
        onclick={() => {
          history.goBack();
        }}
        icon={() => <IoMdArrowRoundBack />}
        foreColor={Colors.WHITE_COLOR}
      />
    </div>
  );
}

export default Header;
