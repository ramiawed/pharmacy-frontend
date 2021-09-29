import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import CardInfo from "../card-info/card-info.component";
import Button from "../button/button.component";
import Toast from "../toast/toast.component";
import ChooseItemModal from "../choose-item-modal/choose-item-modal.component";
import SettingRow from "../setting-row/setting-row.component";
import Loader from "../loader/loader.component";
import { default as ActionLoader } from "../action-loader/action-loader.component";

// redux stuff
import { useSelector, useDispatch } from "react-redux";
import {
  addToNewestItems,
  removeFromNewestItems,
  resetAddNewestItemsStatus,
  resetRemoveNewestItemsStatus,
  selectNewestItems,
} from "../../redux/advertisements/newestItemsSlice";
import {
  selectSettings,
  updateSettings,
} from "../../redux/settings/settingsSlice";
import { selectToken } from "../../redux/auth/authSlice.js";

// styles
import generalStyles from "../../style.module.scss";

// constants
import { BASEURL, Colors } from "../../utils/constants";

function NewestItemsSettings() {
  const { t } = useTranslation();
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const {
    newestItems,
    newestItemsStatus,
    addNewestItemsStatus,
    removeNewestItemsStatus,
    addNewestItemsError,
    removeNewestItemsError,
  } = useSelector(selectNewestItems);

  const { settings, status } = useSelector(selectSettings);

  const [showChooseModal, setShowChooseModal] = useState(false);

  const removeItemFromNewestItems = (id) => {
    dispatch(removeFromNewestItems({ id: id, token }));
  };

  const changeCheckHandler = (e) => {
    dispatch(
      updateSettings({
        obj: {
          showNewestItems: !settings.showNewestItems,
        },
        token,
      })
    );
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: Colors.SECONDARY_COLOR,
        }}
      >
        <input
          type="checkbox"
          value={settings.showNewestItems}
          onChange={changeCheckHandler}
          checked={settings.showNewestItems}
        />
        <label style={{ padding: "0 10px" }}>
          {t("show-newest-items-in-home-page")}
        </label>
      </div>

      <CardInfo headerTitle={t("newest-items")}>
        {newestItemsStatus === "loading" ? (
          <Loader />
        ) : (
          <>
            <div>
              {newestItems.map((item) => (
                <SettingRow
                  data={item}
                  key={item._id}
                  tooltip="remove-item-from-newest-advertisement"
                  action={removeItemFromNewestItems}
                  type="item"
                />
              ))}

              <div className={generalStyles.padding_v_6}>
                <Button
                  text="add-label"
                  action={() => {
                    setShowChooseModal(true);
                  }}
                  bgColor={Colors.SUCCEEDED_COLOR}
                />
              </div>
            </div>
          </>
        )}
      </CardInfo>

      {showChooseModal && (
        <ChooseItemModal
          close={() => setShowChooseModal(false)}
          chooseAction={addToNewestItems}
          url={`${BASEURL}/items?limit=9&isActive=true&isNewest=false`}
        />
      )}

      {status === "loading" && <ActionLoader />}

      {addNewestItemsStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t("item-added-to-newest")}
          actionAfterTimeout={() => dispatch(resetAddNewestItemsStatus())}
        />
      )}

      {addNewestItemsStatus === "failed" && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          toastText={t(addNewestItemsError)}
          actionAfterTimeout={() => dispatch(resetAddNewestItemsStatus())}
        />
      )}

      {removeNewestItemsStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t("item-removed-from-newest")}
          actionAfterTimeout={() => dispatch(resetRemoveNewestItemsStatus())}
        />
      )}

      {removeNewestItemsStatus === "failed" && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          toastText={t(removeNewestItemsError)}
          actionAfterTimeout={() => dispatch(resetRemoveNewestItemsStatus())}
        />
      )}
    </>
  );
}

export default NewestItemsSettings;
