import React from "react";

import generalStyles from "../../style.module.scss";

import { Colors } from "../../utils/constants";

function Button({ action, text, bgColor }) {
  return (
    <button
      className={[
        generalStyles.button,
        bgColor === Colors.SECONDARY_COLOR ? generalStyles.bg_secondary : "",
        bgColor === Colors.FAILED_COLOR ? generalStyles.bg_red : "",
        bgColor === Colors.SUCCEEDED_COLOR ? generalStyles.bg_green : "",
        generalStyles.fc_white,
        generalStyles.block,
        generalStyles.margin_h_auto,
        generalStyles.padding_v_6,
        generalStyles.padding_h_12,
      ].join(" ")}
      onClick={action}
    >
      {text}
    </button>
  );
}

export default Button;
