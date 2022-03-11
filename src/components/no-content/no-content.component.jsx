import React from "react";

import generalStyles from "../../style.module.scss";
import NoContentImage from "../../no-content.jpeg";
import { Colors } from "../../utils/constants";

function NoContent({ msg }) {
  return (
    <div className={[generalStyles.no_content_div].join(" ")}>
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
