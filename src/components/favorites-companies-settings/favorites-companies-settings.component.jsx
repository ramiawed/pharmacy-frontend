import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import ChooseCompanyModal from "../choose-company-modal/choose-company-modal.component";
import CardInfo from "../card-info/card-info.component";
import Button from "../button/button.component";
import Toast from "../toast/toast.component";
import SettingRow from "../setting-row/setting-row.component";

// redux stuff
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavoritesCompanies,
  removeFromFavoritesCompanies,
  resetAddFavoritesCompaniesStatus,
  resetRemoveFavoritesCompaniesStatus,
  selectFavoritesCompanies,
} from "../../redux/advertisements/favoritesCompaniesSlice";
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

function FavoritesCompaniesSettings() {
  const { t } = useTranslation();
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const {
    favoritesCompanies,
    favoritesCompaniesStatus,
    addFavoritesCompaniesStatus,
    removeFavoritesCompaniesStatus,
    addFavoritesCompaniesError,
    removeFavoritesCompaniesError,
  } = useSelector(selectFavoritesCompanies);

  const { settings, status } = useSelector(selectSettings);

  const [showChooseModal, setShowChooseModal] = useState(false);

  const removeCompanyFromFavoritesCompanies = (id) => {
    dispatch(removeFromFavoritesCompanies({ id: id, token }));
  };

  const changeCheckHandler = (e) => {
    dispatch(
      updateSettings({
        obj: {
          showFavoritesCompanies: !settings.showFavoritesCompanies,
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
          value={settings.showFavoritesCompanies}
          onChange={changeCheckHandler}
          checked={settings.showFavoritesCompanies}
        />
        <label style={{ padding: "0 10px" }}>
          {t("show-favorites-companies-in-home-page")}
        </label>
      </div>

      <CardInfo headerTitle={t("favorites-companies")}>
        {favoritesCompaniesStatus === "loading" ? (
          <Loader />
        ) : (
          <>
            <div>
              {favoritesCompanies.map((company) => (
                <SettingRow
                  data={company}
                  key={company._id}
                  tooltip="remove-company-from-favorites-advertisement"
                  action={removeCompanyFromFavoritesCompanies}
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
        <ChooseCompanyModal
          close={() => setShowChooseModal(false)}
          chooseAction={addToFavoritesCompanies}
          url={`${BASEURL}/users?limit=9&isActive=true&type=company&isFavorite=false`}
        />
      )}

      {status === "loading" && <ActionLoader />}

      {addFavoritesCompaniesStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t("company-added-to-favorite")}
          actionAfterTimeout={() =>
            dispatch(resetAddFavoritesCompaniesStatus())
          }
        />
      )}

      {addFavoritesCompaniesStatus === "failed" && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          toastText={t(addFavoritesCompaniesError)}
          actionAfterTimeout={() =>
            dispatch(resetAddFavoritesCompaniesStatus())
          }
        />
      )}

      {removeFavoritesCompaniesStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t("company-removed-from-favorite")}
          actionAfterTimeout={() =>
            dispatch(resetRemoveFavoritesCompaniesStatus())
          }
        />
      )}

      {removeFavoritesCompaniesStatus === "failed" && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          toastText={t(removeFavoritesCompaniesError)}
          actionAfterTimeout={() =>
            dispatch(resetRemoveFavoritesCompaniesStatus())
          }
        />
      )}
    </>
  );
}

export default FavoritesCompaniesSettings;
