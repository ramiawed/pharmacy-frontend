// component to show an icon with tooltip

// Props:
// onclick: action to execute when press on the icon
// tooltip: text show when hover over the icon
// foreColor: the color of the icon
// icon: the icon that show in this component
// withBackground: to determine if the background is transparent or light-grey

import React from "react";

// styles
import styles from "./icon.module.scss";

// constants
import { Colors } from "../../utils/constants";

function Icon({
  onclick,
  tooltip,
  icon,
  foreColor,
  withBackground,
  text,
  withAlertIcon,
  closeToIcon,
}) {
  return (
    <div
      style={{
        background: withBackground ? Colors.LIGHT_GREY_COLOR : "transparent",
        borderRadius: "3px",
        marginLeft: withBackground ? "2px" : "0",
        marginRight: withBackground ? "2px" : "0",
        padding: withBackground ? "2px" : "0",
      }}
      className={[
        styles.icon,
        foreColor === Colors.SUCCEEDED_COLOR ? "fc_green" : "",
        foreColor === Colors.FAILED_COLOR ? "fc_red" : "",
        foreColor === Colors.LIGHT_COLOR ? "fc_light" : "",
        foreColor === Colors.YELLOW_COLOR ? "fc_yellow" : "",
        foreColor === Colors.BACKUP_COLOR ? "fc_backup" : "",
        foreColor === Colors.MAIN_COLOR ? "fc_main" : "",
        foreColor === Colors.WHITE_COLOR ? "fc_white" : "",
        foreColor === Colors.DARK_COLOR ? "fc_dark" : "",
      ].join(" ")}
      onClick={(e) => {
        // if (withAlertIcon) return;
        // e.stopPropagation();
        if (onclick) onclick();
      }}
    >
      {icon && icon()}
      {text && <label>{text}</label>}
      {tooltip && <div className={styles.tooltip}>{tooltip}</div>}
      {withAlertIcon && (
        <div
          className={[
            styles.red_circle,
            closeToIcon ? styles.close_to_icon : "",
          ].join(" ")}
        ></div>
      )}
    </div>
  );
}

export default Icon;
