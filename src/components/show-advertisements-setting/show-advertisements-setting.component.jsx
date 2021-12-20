import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../redux/auth/authSlice";
import {
  selectSettings,
  updateSettings,
} from "../../redux/settings/settingsSlice";

import generalStyles from "../../style.module.scss";

function ShowAdvertisementsSettings() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const token = useSelector(selectToken);
  const {
    settings: { showAdvertisements },
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
        value={showAdvertisements}
        checked={showAdvertisements}
        onChange={() =>
          dispatch(
            updateSettings({
              token,
              obj: {
                showAdvertisements: !showAdvertisements,
              },
            })
          )
        }
      />
      <label style={{ padding: "0 10px" }}>
        {t("show-advertisement-on-home-page")}
      </label>
    </div>
  );
}

export default ShowAdvertisementsSettings;
