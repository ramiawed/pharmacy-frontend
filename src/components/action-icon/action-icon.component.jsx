import React from "react";

import generalStyles from "../../style.module.scss";

import { Colors } from "../../utils/constants";

function ActionIcon({ onclick, tooltip, icon, foreColor }) {
  return (
    <div
      className={[
        generalStyles.icon,
        foreColor === Colors.SUCCEEDED_COLOR ? generalStyles.fc_green : "",
        foreColor === Colors.FAILED_COLOR ? generalStyles.fc_red : "",
        foreColor === Colors.SECONDARY_COLOR ? generalStyles.fc_secondary : "",
        foreColor === Colors.YELLOW_COLOR ? generalStyles.fc_yellow : "",
      ].join(" ")}
      onClick={onclick}
    >
      {icon()}
      {tooltip && <div className={generalStyles.tooltip}>{tooltip}</div>}
    </div>
  );
}

export default ActionIcon;
