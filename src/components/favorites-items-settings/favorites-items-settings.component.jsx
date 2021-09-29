import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import ChooseCompanyModal from "../choose-company-modal/choose-company-modal.component";
import CardInfo from "../card-info/card-info.component";
import Button from "../button/button.component";
import AdvertisementFavoriteRow from "../setting-row/setting-row.component";
import Toast from "../toast/toast.component";

// redux stuff
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavoritesItems,
  removeFromFavoritesItems,
  resetAddFavoritesItemsStatus,
  resetRemoveFavoritesItemsStatus,
  selectFavoritesItems,
} from "../../redux/advertisements/favoritesItemsSlice";
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

function FavoritesItemsSettings() {
  const { t } = useTranslation();
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const {
    favoritesItems,
    favoritesItemsStatus,
    addFavoritesItemsStatus,
    removeFavoritesItemsStatus,
    addFavoritesItemsError,
    removeFavoritesItemsError,
  } = useSelector(selectFavoritesItems);

  const { settings, status } = useSelector(selectSettings);

  const [showChooseModal, setShowChooseModal] = useState(false);

  const removeItemFromFavoritesItems = (id) => {
    dispatch(removeFromFavoritesItems({ id: id, token }));
  };

  const changeCheckHandler = (e) => {
    dispatch(
      updateSettings({
        obj: {
          showFavoritesItems: !settings.showFavoritesItems,
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
          value={settings.showFavoritesItems}
          onChange={changeCheckHandler}
          checked={settings.showFavoritesItems}
        />
        <label style={{ padding: "0 10px" }}>
          {t("show-favorites-items-in-home-page")}
        </label>
      </div>

      <CardInfo headerTitle={t("favorites-items")}>
        {favoritesItemsStatus === "loading" ? (
          <Loader />
        ) : (
          <>
            <div>
              {favoritesItems.map((item) => (
                <SettingRow
                  data={item}
                  key={item._id}
                  tooltip="remove-item-from-favorites-advertisement"
                  action={removeItemFromFavoritesItems}
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
          chooseAction={addToFavoritesItems}
          url={`${BASEURL}/items?limit=9&isActive=true&isFavorite=false`}
        />
      )}

      {status === "loading" && <ActionLoader />}

      {addFavoritesItemsStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t("item-added-to-favorite")}
          actionAfterTimeout={() => dispatch(resetAddFavoritesItemsStatus())}
        />
      )}

      {addFavoritesItemsStatus === "failed" && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          toastText={t(addFavoritesItemsError)}
          actionAfterTimeout={() => dispatch(resetAddFavoritesItemsStatus())}
        />
      )}

      {removeFavoritesItemsStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t("item-removed-from-favorite")}
          actionAfterTimeout={() => dispatch(resetRemoveFavoritesItemsStatus())}
        />
      )}

      {removeFavoritesItemsStatus === "failed" && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          toastText={t(removeFavoritesItemsError)}
          actionAfterTimeout={() => dispatch(resetRemoveFavoritesItemsStatus())}
        />
      )}
    </>
  );
}

export default FavoritesItemsSettings;
