import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import SelectPartnerModal from "../../modals/select-partner-modal/select-partner-modal.component";
import SettingSectionHeader from "../setting-section-header/setting-section-header.component";
import CenterContainer from "../center-container/center-container.component";
import SettingRow from "../setting-row/setting-row.component";
import CardInfo from "../card-info/card-info.component";
import Loader from "../loader/loader.component";
import Button from "../button/button.component";
import Toast from "../toast/toast.component";

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
import { selectCompanies } from "../../redux/company/companySlice";

// constants
import { Colors } from "../../utils/constants";
import CustomButton from "../custom-button/custom-button.component";
import { useTheme } from "../../contexts/themeContext";

function CompaniesSectionOneSettings() {
  const { theme } = useTheme();
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
  const { companies } = useSelector(selectCompanies);

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
        header={t("section one companies")}
        checkboxLabel="show section in home page"
        updateAction={updateSettings}
        field="companiesSectionOne"
      />

      <CardInfo headerTitle={t("section one companies")}>
        {companiesSectionOneStatus === "loading" ? (
          <Loader />
        ) : (
          <div className="p-2">
            <CenterContainer>
              {companiesSectionOne.map((company) => (
                <SettingRow
                  data={company}
                  key={company._id}
                  action={removeFromSectionOne}
                />
              ))}
            </CenterContainer>

            <div className="max-w-fit mx-auto">
              <CustomButton
                text={t("add")}
                onClickHandler={() => {
                  setShowChooseModal(true);
                }}
                classname={`${
                  theme === "light"
                    ? "bg-green text-white"
                    : "d-primary500-mixed300"
                }`}
              />
            </div>
          </div>
        )}
      </CardInfo>

      {showChooseModal && (
        <SelectPartnerModal
          close={() => setShowChooseModal(false)}
          chooseAction={(data) => {
            dispatch(addCompanyToSectionOne({ token, id: data._id }));
          }}
          placeholder={`${"enter company name"}`}
          data={companies}
        />
      )}

      {addCompanyToSectionOneStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t("company added")}
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
          toastText={t("company removed")}
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
