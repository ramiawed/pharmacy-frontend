import React from "react";

import generalStyles from "../../style.module.scss";

function SettingCheckbox({ value, action, label }) {
  return (
    <div
      className={[
        generalStyles.flex_center_container,
        generalStyles.fc_secondary,
      ].join(" ")}
      style={{
        justifyContent: "start",
      }}
    >
      <input type="checkbox" value={value} checked={value} onChange={action} />
      <label style={{ padding: "0 10px" }}>{label}</label>
    </div>
  );
}

export default SettingCheckbox;
