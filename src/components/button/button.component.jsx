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

function Button({ action, text, tooltip, loading, icon, classStyle }) {
  const { t } = useTranslation();

  return (
    <button
      className={["button", `${classStyle}`, "fc_white", "block"].join(" ")}
      style={{
        padding: "6px 12px",
      }}
      onClick={action}
    >
      {icon && icon()}
      {text ? t(text) : null}
      {tooltip && <div>{t(tooltip)}</div>}

      {loading && <VscLoading className="loading" />}
    </button>
  );
}

export default Button;
