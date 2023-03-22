import React from "react";

function SettingCheckbox({ value, action, label }) {
  return (
    <div
      className={["flex_center_container", "fc_light"].join(" ")}
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
