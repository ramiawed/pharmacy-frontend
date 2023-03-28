import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import SelectPartnerModal from "../../modals/select-partner-modal/select-partner-modal.component";
import SettingSectionHeader from "../setting-section-header/setting-section-header.component";
import CenterContainer from "../center-container/center-container.component";
import SettingRow from "../setting-row/setting-row.component";
import CardInfo from "../card-info/card-info.component";
import Button from "../button/button.component";
import Loader from "../loader/loader.component";
import Toast from "../toast/toast.component";

// redux stuff
import { useSelector, useDispatch } from "react-redux";
import {
  selectSettings,
  updateSettings,
} from "../../redux/settings/settingsSlice";
import {
  addCompanyToSectionTwo,
  resetAddCompanyToSectionTwoStatus,
  resetRemoveCompanyFromSectionTwoStatus,
  selectCompaniesSectionTwo,
  removeCompanyFromSectionTwo,
} from "../../redux/advertisements/companiesSectionTwoSlice";
import { selectToken } from "../../redux/auth/authSlice";
import { selectCompanies } from "../../redux/company/companySlice";

// constants
import { Colors } from "../../utils/constants";

function CompaniesSectionTwoSettings() {
  const { t } = useTranslation();
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const {
    companiesSectionTwo,
    companiesSectionTwoStatus,
    addCompanyToSectionTwoStatus,
    removeCompanyFromSectionTwoStatus,
    addCompanyToSectionTwoError,
    removeCompanyFromSectionTwoError,
  } = useSelector(selectCompaniesSectionTwo);

  const {
    settings: {
      companiesSectionTwo: { show, title, description, order },
    },
  } = useSelector(selectSettings);
  const { companies } = useSelector(selectCompanies);

  const [showChooseModal, setShowChooseModal] = useState(false);

  const removeFromSectionTwo = (id) => {
    dispatch(removeCompanyFromSectionTwo({ id: id, token }));
  };

  return (
    <>
      <SettingSectionHeader
        show={show}
        title={title}
        description={description}
        order={order}
        header={t("section two companies")}
        checkboxLabel="show section in home page"
        updateAction={updateSettings}
        field="companiesSectionTwo"
      />

      <CardInfo headerTitle={t("section two companies")}>
        {companiesSectionTwoStatus === "loading" ? (
          <Loader />
        ) : (
          <>
            <div>
              {companiesSectionTwo.map((company) => (
                <SettingRow
                  data={company}
                  key={company._id}
                  action={removeFromSectionTwo}
                />
              ))}

              <CenterContainer>
                <Button
                  text="add"
                  action={() => {
                    setShowChooseModal(true);
                  }}
                  classStyle="bg_green"
                />
              </CenterContainer>
            </div>
          </>
        )}
      </CardInfo>

      {showChooseModal && (
        <SelectPartnerModal
          header={`${"choose company"}`}
          close={() => setShowChooseModal(false)}
          chooseAction={(data) => {
            dispatch(addCompanyToSectionTwo({ token, id: data._id }));
          }}
          placeholder={`${"enter company name"}`}
          data={companies}
        />
      )}

      {addCompanyToSectionTwoStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t("company added")}
          actionAfterTimeout={() =>
            dispatch(resetAddCompanyToSectionTwoStatus())
          }
        />
      )}

      {addCompanyToSectionTwoStatus === "failed" && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          toastText={t(addCompanyToSectionTwoError)}
          actionAfterTimeout={() =>
            dispatch(resetAddCompanyToSectionTwoStatus())
          }
        />
      )}

      {removeCompanyFromSectionTwoStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t("company removed")}
          actionAfterTimeout={() =>
            dispatch(resetRemoveCompanyFromSectionTwoStatus())
          }
        />
      )}

      {removeCompanyFromSectionTwoStatus === "failed" && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          toastText={t(removeCompanyFromSectionTwoError)}
          actionAfterTimeout={() =>
            dispatch(resetRemoveCompanyFromSectionTwoStatus())
          }
        />
      )}
    </>
  );
}

export default CompaniesSectionTwoSettings;
