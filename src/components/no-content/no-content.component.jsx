import React from "react";

import generalStyles from "../../style.module.scss";
import NoContentImage from "../../no-content.png";

function NoContent({ msg }) {
  return (
    <div
      className={[generalStyles.no_content_div, generalStyles.fc_white].join(
        " "
      )}
    >
      {/* <p className={generalStyles.fc_white}>{msg}</p> */}
      <img
        src={NoContentImage}
        alt="thumb"
        style={{
          width: "150px",
          height: "150px",
        }}
      />
    </div>
  );
}

export default NoContent;
