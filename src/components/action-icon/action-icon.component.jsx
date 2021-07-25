import React from "react";

import generalStyles from "../../style.module.scss";

function ActinIcon({ selected, onclick, tooltip, icon }) {
  return (
    <div
      className={[
        generalStyles.icon,
        selected ? generalStyles.fc_green : generalStyles.fc_secondary,
      ].join(" ")}
      onClick={onclick}
    >
      {icon()}
      <div className={generalStyles.tooltip}>{tooltip}</div>
    </div>
  );
}

export default ActinIcon;
