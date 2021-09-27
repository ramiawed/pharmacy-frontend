import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import ChooseCompanyModal from "../choose-company-modal/choose-company-modal.component";
import CardInfo from "../card-info/card-info.component";
import Button from "../button/button.component";
import AdvertisementFavoriteRow from "../advertisement-favorite-row/advertisement-favorite-row.component";
import Toast from "../toast/toast.component";

// redux stuff
import { useSelector, useDispatch } from "react-redux";

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
import {
  addToNewestCompanies,
  removeFromNewestCompanies,
  resetAddNewestCompaniesStatus,
  resetRemoveNewestCompaniesStatus,
  selectNewestCompanies,
} from "../../redux/advertisements/newestCompaniesSlice";

function NewestCompaniesSettings() {
  const { t } = useTranslation();
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const {
    newestCompanies,
    newestCompaniesStatus,
    addNewestCompaniesStatus,
    removeNewestCompaniesStatus,
    addNewestCompaniesError,
    removeNewestCompaniesError,
  } = useSelector(selectNewestCompanies);

  const { settings, status } = useSelector(selectSettings);

  const [showChooseModal, setShowChooseModal] = useState(false);

  const removeCompanyFromFavoritesCompanies = (id) => {
    dispatch(removeFromNewestCompanies({ id: id, token }));
  };

  const changeCheckHandler = (e) => {
    dispatch(
      updateSettings({
        obj: {
          showNewestCompanies: !settings.showNewestCompanies,
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
          value={settings.showNewestCompanies}
          onChange={changeCheckHandler}
          checked={settings.showNewestCompanies}
        />
        <label style={{ padding: "0 10px" }}>
          {t("show-newest-companies-in-home-page")}
        </label>
      </div>

      <CardInfo headerTitle={t("newest-companies")}>
        {newestCompaniesStatus === "loading" ? (
          <Loader />
        ) : (
          <>
            <div>
              {newestCompanies.map((company) => (
                <AdvertisementFavoriteRow
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
          chooseAction={addToNewestCompanies}
          url={`${BASEURL}/users?limit=40&page=1&isActive=true&type=company&isNewest=false`}
        />
      )}

      {status === "loading" && <ActionLoader />}

      {addNewestCompaniesStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t("company-added-to-newest")}
          actionAfterTimeout={() => dispatch(resetAddNewestCompaniesStatus())}
        />
      )}

      {addNewestCompaniesStatus === "failed" && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          toastText={t(addNewestCompaniesError)}
          actionAfterTimeout={() => dispatch(resetAddNewestCompaniesStatus())}
        />
      )}

      {removeNewestCompaniesStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t("company-removed-to-newest")}
          actionAfterTimeout={() =>
            dispatch(resetRemoveNewestCompaniesStatus())
          }
        />
      )}

      {removeNewestCompaniesStatus === "failed" && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          toastText={t(removeNewestCompaniesError)}
          actionAfterTimeout={() =>
            dispatch(resetRemoveNewestCompaniesStatus())
          }
        />
      )}
    </>
  );
}

export default NewestCompaniesSettings;
