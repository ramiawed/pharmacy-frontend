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
  addCompanyToSectionTwo,
  resetAddCompanyToSectionTwoStatus,
  resetRemoveCompanyFromSectionTwoStatus,
  selectCompaniesSectionTwo,
  removeCompanyFromSectionTwo,
} from "../../redux/advertisements/companiesSectionTwoSlice";
import { selectToken } from "../../redux/auth/authSlice";

// styles
import generalStyles from "../../style.module.scss";

// constants
import { BASEURL, Colors } from "../../utils/constants";

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
        header="القسم الثاني / شركات /"
        checkboxLabel="show-section-two-companies-in-home-page"
        updateAction={updateSettings}
        field="companiesSectionTwo"
      />

      <CardInfo headerTitle={t("section-two-companies")}>
        {companiesSectionTwoStatus === "loading" ? (
          <Loader />
        ) : (
          <>
            <div>
              {companiesSectionTwo.map((company) => (
                <SettingRow
                  data={company}
                  key={company._id}
                  // tooltip="remove-company"
                  action={removeFromSectionTwo}
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
          chooseAction={addCompanyToSectionTwo}
          url={`${BASEURL}/users?limit=9&isActive=true&type=company&inSectionTwo=false`}
        />
      )}

      {addCompanyToSectionTwoStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t("company-added")}
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
          toastText={t("company-removed")}
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
