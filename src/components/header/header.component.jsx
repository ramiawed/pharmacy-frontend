import React from "react";
import { useHistory } from "react-router-dom";

// components
import Icon from "../action-icon/action-icon.component";

// icons
import { IoMdArrowRoundBack } from "react-icons/io";

// constants
import { Colors } from "../../utils/constants";

// style
import styles from "./header.module.scss";

function Header({ children }) {
  const history = useHistory();

  return (
    <div className={styles.header}>
      {children}
      <div className={styles.back}>
        <Icon
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
