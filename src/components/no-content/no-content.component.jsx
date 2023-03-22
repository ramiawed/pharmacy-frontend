import React from "react";
import NoContentImage from "../../assets/no_content.jpeg";

// styles
import styles from "./no-content.module.scss";

// constants
import { Colors } from "../../utils/constants";

function NoContent({ msg }) {
  return (
    <div className={[styles.container].join(" ")}>
      <img
        src={NoContentImage}
        alt="thumb"
        style={{
          width: "150px",
          height: "150px",
        }}
      />

      <p
        style={{
          color: Colors.MAIN_COLOR,
        }}
      >
        {msg}
      </p>
    </div>
  );
}

export default NoContent;
