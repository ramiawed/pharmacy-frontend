import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../redux/auth/authSlice";
import {
  selectSettings,
  updateSettings,
} from "../../redux/settings/settingsSlice";

import generalStyles from "../../style.module.scss";

function SaveOrdersSettings() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const token = useSelector(selectToken);
  const {
    settings: { saveOrders },
  } = useSelector(selectSettings);

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
      <input
        type="checkbox"
        value={saveOrders}
        checked={saveOrders}
        onChange={() =>
          dispatch(
            updateSettings({
              token,
              obj: {
                saveOrders: !saveOrders,
              },
            })
          )
        }
      />
      <label style={{ padding: "0 10px" }}>
        {t("save-orders-in-database-permission")}
      </label>
    </div>
  );
}

export default SaveOrdersSettings;
