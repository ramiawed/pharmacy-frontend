import React from "react";
import NoContentImage from "../../no-content.jpeg";
import styles from "./no-content.module.scss";
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
