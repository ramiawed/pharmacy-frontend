// button component

// Props
// action: handler to execute when click the button
// text: label of the button
// bgColor: button's background color
// tooltip: text to show when hover over the button
// loading: boolean to indicates if the loading icon show or not
// icon

import React from "react";
import { useTranslation } from "react-i18next";

// react icons
import { VscLoading } from "react-icons/vsc";

// styles
import generalStyles from "../../style.module.scss";

// constants
import { Colors } from "../../utils/constants";

function Button({ action, text, bgColor, tooltip, loading, icon }) {
  const { t } = useTranslation();

  return (
    <button
      className={[
        generalStyles.button,
        bgColor === Colors.SECONDARY_COLOR ? generalStyles.bg_secondary : "",
        bgColor === Colors.FAILED_COLOR ? generalStyles.bg_red : "",
        bgColor === Colors.SUCCEEDED_COLOR ? generalStyles.bg_green : "",
        bgColor === Colors.MAIN_COLOR ? generalStyles.bg_main : "",
        bgColor === Colors.OFFER_COLOR ? generalStyles.bg_offer : "",
        generalStyles.fc_white,
        generalStyles.block,
        generalStyles.padding_v_6,
        generalStyles.padding_h_12,
      ].join(" ")}
      onClick={action}
    >
      {icon && icon()}
      {text ? t(text) : null}
      {tooltip && <div>{t(tooltip)}</div>}

      {loading && <VscLoading className={generalStyles.loading} />}
    </button>
  );
}

export default Button;
