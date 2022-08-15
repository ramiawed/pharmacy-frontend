import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import ChooseCompanyModal from "../choose-company-modal/choose-company-modal.component";
import CardInfo from "../card-info/card-info.component";
import Button from "../button/button.component";
import Toast from "../toast/toast.component";
import SettingRow from "../setting-row/setting-row.component";
import SettingSectionHeader from "../setting-section-header/setting-section-header.component";
import Loader from "../loader/loader.component";

// redux stuff
import { useSelector, useDispatch } from "react-redux";
import {
  selectSettings,
  updateSettings,
} from "../../redux/settings/settingsSlice";
import {
  addCompanyToSectionOne,
  resetAddCompanyToSectionOneStatus,
  resetRemoveCompanyFromSectionOneStatus,
  selectCompaniesSectionOne,
  removeCompanyFromSectionOne,
} from "../../redux/advertisements/companiesSectionOneSlice";
import { selectToken } from "../../redux/auth/authSlice.js";

// styles
import generalStyles from "../../style.module.scss";

// constants
import { BASEURL, Colors } from "../../utils/constants";

function CompaniesSectionOneSettings() {
  const { t } = useTranslation();
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const {
    companiesSectionOne,
    companiesSectionOneStatus,
    addCompanyToSectionOneStatus,
    removeCompanyFromSectionOneStatus,
    addCompanyToSectionOneError,
    removeCompanyFromSectionOneError,
  } = useSelector(selectCompaniesSectionOne);

  const {
    settings: {
      companiesSectionOne: { show, title, description, order, titleRight },
    },
  } = useSelector(selectSettings);

  const [showChooseModal, setShowChooseModal] = useState(false);

  const removeFromSectionOne = (id) => {
    dispatch(removeCompanyFromSectionOne({ id: id, token }));
  };

  return (
    <>
      <SettingSectionHeader
        show={show}
        title={title}
        description={description}
        order={order}
        titleRight={titleRight}
        header="القسم الاول / شركات /"
        checkboxLabel="show-section-one-companies-in-home-page"
        updateAction={updateSettings}
        field="companiesSectionOne"
      />

      <CardInfo headerTitle={t("section-one-companies")}>
        {companiesSectionOneStatus === "loading" ? (
          <Loader />
        ) : (
          <>
            <div>
              {companiesSectionOne.map((company) => (
                <SettingRow
                  data={company}
                  key={company._id}
                  action={removeFromSectionOne}
                />
              ))}

              <div
                className={[
                  generalStyles.padding_v_6,
                  generalStyles.flex_container,
                ].join(" ")}
              >
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
          chooseAction={addCompanyToSectionOne}
          url={`${BASEURL}/users?limit=15&isActive=true&type=company&inSectionOne=false`}
        />
      )}

      {addCompanyToSectionOneStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t("company-added")}
          actionAfterTimeout={() =>
            dispatch(resetAddCompanyToSectionOneStatus())
          }
        />
      )}

      {addCompanyToSectionOneStatus === "failed" && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          toastText={t(addCompanyToSectionOneError)}
          actionAfterTimeout={() =>
            dispatch(resetAddCompanyToSectionOneStatus())
          }
        />
      )}

      {removeCompanyFromSectionOneStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t("company-removed")}
          actionAfterTimeout={() =>
            dispatch(resetRemoveCompanyFromSectionOneStatus())
          }
        />
      )}

      {removeCompanyFromSectionOneStatus === "failed" && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          toastText={t(removeCompanyFromSectionOneError)}
          actionAfterTimeout={() =>
            dispatch(resetRemoveCompanyFromSectionOneStatus())
          }
        />
      )}
    </>
  );
}

export default CompaniesSectionOneSettings;
