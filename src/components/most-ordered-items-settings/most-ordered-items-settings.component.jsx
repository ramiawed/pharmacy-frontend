import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import CardInfo from "../card-info/card-info.component";
import Button from "../button/button.component";
import Toast from "../toast/toast.component";

// redux stuff
import { useSelector, useDispatch } from "react-redux";
import {
  addToMostOrderedItems,
  removeFromMostOrderedItems,
  resetAddMostOrderedItemsStatus,
  resetRemoveMostOrderedItemsStatus,
  selectMostOrderedItems,
} from "../../redux/advertisements/mostOrderedItemsSlice";
import {
  selectSettings,
  updateSettings,
} from "../../redux/settings/settingsSlice";
import { selectToken } from "../../redux/auth/authSlice.js";

// styles
import generalStyles from "../../style.module.scss";

// constants
import { BASEURL, Colors } from "../../utils/constants";
import Loader from "../loader/loader.component";
import { default as ActionLoader } from "../action-loader/action-loader.component";
import ChooseItemModal from "../choose-item-modal/choose-item-modal.component";
import SettingRow from "../setting-row/setting-row.component";

function MostOrderedItemsSettings() {
  const { t } = useTranslation();
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const {
    mostOrderedItems,
    mostOrderedItemsStatus,
    addMostOrderedItemsStatus,
    removeMostOrderedItemsStatus,
    addMostOrderedItemsError,
    removeMostOrderedItemsError,
  } = useSelector(selectMostOrderedItems);

  const { settings, status } = useSelector(selectSettings);

  const [showChooseModal, setShowChooseModal] = useState(false);

  const removeItemFromMostOrderedItems = (id) => {
    dispatch(removeFromMostOrderedItems({ id: id, token }));
  };

  const changeCheckHandler = (e) => {
    dispatch(
      updateSettings({
        obj: {
          showMostOrderedItems: !settings.showMostOrderedItems,
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
          value={settings.showMostOrderedItems}
          onChange={changeCheckHandler}
          checked={settings.showMostOrderedItems}
        />
        <label style={{ padding: "0 10px" }}>
          {t("show-most-ordered-items-in-home-page")}
        </label>
      </div>

      <CardInfo headerTitle={t("most-ordered-items")}>
        {mostOrderedItemsStatus === "loading" ? (
          <Loader />
        ) : (
          <>
            <div>
              {mostOrderedItems.map((item) => (
                <SettingRow
                  data={item}
                  key={item._id}
                  tooltip="remove-item-from-most-ordered-advertisement"
                  action={removeItemFromMostOrderedItems}
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
          chooseAction={addToMostOrderedItems}
          url={`${BASEURL}/items?limit=9&isActive=true&isMostOrdered=false`}
        />
      )}

      {status === "loading" && <ActionLoader />}

      {addMostOrderedItemsStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t("item-added-to-most-ordered")}
          actionAfterTimeout={() => dispatch(resetAddMostOrderedItemsStatus())}
        />
      )}

      {addMostOrderedItemsStatus === "failed" && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          toastText={t(addMostOrderedItemsError)}
          actionAfterTimeout={() => dispatch(resetAddMostOrderedItemsStatus())}
        />
      )}

      {removeMostOrderedItemsStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t("item-removed-from-most-ordered")}
          actionAfterTimeout={() =>
            dispatch(resetRemoveMostOrderedItemsStatus())
          }
        />
      )}

      {removeMostOrderedItemsStatus === "failed" && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          toastText={t(removeMostOrderedItemsError)}
          actionAfterTimeout={() =>
            dispatch(resetRemoveMostOrderedItemsStatus())
          }
        />
      )}
    </>
  );
}

export default MostOrderedItemsSettings;
