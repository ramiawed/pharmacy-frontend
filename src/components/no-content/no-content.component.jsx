import React from "react";

import generalStyles from "../../style.module.scss";

function NoContent({ msg }) {
  return (
    <div
      className={[generalStyles.no_content_div, generalStyles.fc_white].join(
        " "
      )}
    >
      <p className={generalStyles.fc_white}>{msg}</p>
    </div>
  );
}

export default NoContent;
