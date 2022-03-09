// component the show an icon with tooltip

// Props:
// onclick: action to execute when press on the icon
// tooltip: text show when hover over the icon
// foreColor: the color of the icon
// icon: the icon that show in this component

import React from "react";

// styles
import generalStyles from "../../style.module.scss";

// constants
import { Colors } from "../../utils/constants";

function Icon({ onclick, tooltip, icon, foreColor, withBackground }) {
  return (
    <div
      style={{
        background: withBackground ? "#e3e3e3" : "transparent",
        borderRadius: "3px",
        marginInline: withBackground ? "2px" : "0",
        padding: withBackground ? "2px" : "0",
      }}
      className={[
        generalStyles.icon,
        foreColor === Colors.SUCCEEDED_COLOR ? generalStyles.fc_green : "",
        foreColor === Colors.FAILED_COLOR ? generalStyles.fc_red : "",
        foreColor === Colors.SECONDARY_COLOR ? generalStyles.fc_secondary : "",
        foreColor === Colors.YELLOW_COLOR ? generalStyles.fc_yellow : "",
        foreColor === Colors.BACKUP_COLOR ? generalStyles.fc_backup : "",
        foreColor === Colors.MAIN_COLOR ? generalStyles.fc_main : "",
        foreColor === Colors.WHITE_COLOR ? generalStyles.fc_white : "",
        foreColor === Colors.GREY_COLOR ? generalStyles.fc_grey : "",
      ].join(" ")}
      onClick={(e) => {
        e.stopPropagation();
        if (onclick) onclick();
      }}
    >
      {icon && icon()}
      {tooltip && <div className={generalStyles.tooltip}>{tooltip}</div>}
    </div>
  );
}

export default Icon;
