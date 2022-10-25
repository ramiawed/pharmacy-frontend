import React from "react";
import { useTranslation } from "react-i18next";
import {
  CitiesName,
  Colors,
  GuestJob,
  ShowWarehouseItems,
  UserActiveState,
  UserApprovedState,
  UserTypeConstants,
} from "../../utils/constants";

// components
import Modal from "../modal/modal.component";
import Input from "../../components/input/input.component";
import RowWith2Children from "../../components/row-with-two-children/row-with-two-children.component";
import SelectCustom from "../../components/select/select.component";

// redux stuff
import {
  selectUsers,
  setSearchCertificateName,
  setSearchCity,
  setSearchCompanyName,
  setSearchEmployeeName,
  setSearchJob,
  setSearchJobTitle,
  setSearchName,
  setSearchAddressDetails,
  setShowItems,
  setUserActive,
  setUserApproved,
  setUserType,
  setSearchMobile,
} from "../../redux/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";

import styles from "./admin-search-modal.module.scss";

const Separator = () => {
  return <div className={styles.separator}></div>;
};

function AdminUsersSearchModal({ close, search, enterPress }) {
  const { t } = useTranslation();

  const { pageState } = useSelector(selectUsers);

  const dispatch = useDispatch();

  const guestJobOptions = [
    { value: GuestJob.NONE, label: t("user-job") },
    { value: GuestJob.STUDENT, label: t("student") },
    { value: GuestJob.PHARMACIST, label: t("pharmacist") },
    { value: GuestJob.EMPLOYEE, label: t("employee") },
  ];

  // change guest job option handler
  const handleGuestJobChange = (val) => {
    dispatch(setSearchJob(val));
    if (val !== GuestJob.EMPLOYEE) {
      dispatch(setSearchCompanyName(""));
      dispatch(setSearchJobTitle(""));
    }
  };

  // options for SelectCustom components (user type)
  const userTypeOptions = [
    { value: UserTypeConstants.COMPANY, label: t("company") },
    { value: UserTypeConstants.WAREHOUSE, label: t("warehouse") },
    { value: UserTypeConstants.PHARMACY, label: t("pharmacy") },
    { value: UserTypeConstants.GUEST, label: t("normal") },
    { value: UserTypeConstants.ADMIN, label: t("admin") },
    { value: UserTypeConstants.ALL, label: t("all") },
  ];

  // handle the change of the User type state
  const handleSearchTypeChange = (val) => {
    dispatch(setUserType(val));
    dispatch(setShowItems(ShowWarehouseItems.ALL));
    if (
      val === UserTypeConstants.ALL ||
      val === UserTypeConstants.ADMIN ||
      val === UserTypeConstants.COMPANY
    ) {
      dispatch(setSearchEmployeeName(""));
      dispatch(setSearchCertificateName(""));
      dispatch(setSearchJob(GuestJob.NONE));
      dispatch(setSearchCompanyName(""));
      dispatch(setSearchJobTitle(""));
    }

    if (
      val === UserTypeConstants.PHARMACY ||
      val === UserTypeConstants.WAREHOUSE
    ) {
      dispatch(setSearchJob(GuestJob.NONE));
      dispatch(setSearchCompanyName(""));
      dispatch(setSearchJobTitle(""));
    }

    if (val === UserTypeConstants.GUEST) {
      dispatch(setSearchEmployeeName(""));
      dispatch(setSearchCertificateName(""));
    }
  };

  // options for the SelectCustom (Approved state)
  const approvedState = [
    { value: UserApprovedState.APPROVED, label: t("approved-account") },
    { value: UserApprovedState.NOT_APPROVED, label: t("not-approved-account") },
    { value: UserApprovedState.ALL, label: t("all") },
  ];

  const handleApproveChange = (val) => {
    dispatch(setUserApproved(val));
  };

  const showWarehouseItems = [
    { value: ShowWarehouseItems.SHOW, label: t("show-items") },
    { value: ShowWarehouseItems.DONT_SHOW, label: t("dont-show-items") },
    { value: ShowWarehouseItems.ALL, label: t("all") },
  ];

  const handleShowItems = (val) => {
    dispatch(setShowItems(val));
  };

  // guest options and its change handler
  const citiesOptions = [
    { value: CitiesName.ALL, label: t("all-cities") },
    { value: CitiesName.ALEPPO, label: t("aleppo") },
    { value: CitiesName.DAMASCUS, label: t("damascus") },
    { value: CitiesName.DARAA, label: t("daraa") },
    { value: CitiesName.DEIR_EZ_ZOR, label: t("deir_ez_zor") },
    { value: CitiesName.HAMA, label: t("hama") },
    { value: CitiesName.AL_HASAKAH, label: t("al_hasakah") },
    { value: CitiesName.HOMS, label: t("homs") },
    { value: CitiesName.IDLIB, label: t("idlib") },
    { value: CitiesName.LATAKIA, label: t("latakia") },
    { value: CitiesName.QUNEITRA, label: t("quneitra") },
    { value: CitiesName.RAQQA, label: t("raqqa") },
    { value: CitiesName.AL_SUWAYDA, label: t("al_suwayda") },
    { value: CitiesName.TARTUS, label: t("tartus") },
    {
      value: CitiesName.DAMASCUS_COUNTRYSIDE,
      label: t("damascus_countryside"),
    },
  ];
  // Guest types are (Student, Pharmacist, Employee)
  // uses with the SelectCustom
  const citiesNameChangeHandler = (val) => {
    // if the user type is Normal and the job is Student or Pharmacist
    // so the user doesn't contains info about company name and job title
    dispatch(setSearchCity(val));
  };

  // options for the SelectCustom (Delete state)
  const deletedState = [
    { value: UserActiveState.INACTIVE, label: t("deleted-account") },
    { value: UserActiveState.ACTIVE, label: t("not-deleted-account") },
    { value: UserActiveState.ALL, label: t("all") },
  ];

  const handleActiveChange = (val) => {
    dispatch(setUserActive(val));
  };

  return (
    <Modal
      header="search-engines"
      cancelLabel="close-label"
      okLabel="search"
      closeModal={close}
      small={true}
      okModal={search}
    >
      <RowWith2Children>
        <div>
          <Input
            label="user-name"
            id="search-name"
            type="text"
            value={pageState.searchName}
            onchange={(e) => {
              dispatch(setSearchName(e.target.value));
            }}
            bordered={true}
            placeholder="search-by-name"
            onEnterPress={enterPress}
            resetField={() => dispatch(setSearchName(""))}
            smallFont={true}
          />
        </div>
        <div className={styles.selectDiv}>
          <label>{t("user-city")}</label>
          <SelectCustom
            bgColor={Colors.SECONDARY_COLOR}
            foreColor="#fff"
            options={citiesOptions}
            onchange={citiesNameChangeHandler}
            defaultOption={{
              value: pageState.searchCity,
              label: t(pageState.searchCity.toLowerCase()),
            }}
            // caption="user-city"
          />
        </div>
      </RowWith2Children>

      <Separator />
      <RowWith2Children>
        <div className={styles.selectDiv}>
          <label>{t("user-type")}</label>
          <SelectCustom
            bgColor={Colors.SECONDARY_COLOR}
            foreColor="#fff"
            options={userTypeOptions}
            onchange={handleSearchTypeChange}
            defaultOption={{
              value: pageState.userType,
              label: t(pageState.userType.toLowerCase()),
            }}
            // caption="user-type"
          />
        </div>

        {pageState.userType === UserTypeConstants.GUEST ? (
          <div className={styles.selectDiv}>
            <label>{t("user-job")}</label>
            <SelectCustom
              bgColor={Colors.SECONDARY_COLOR}
              foreColor="#fff"
              options={guestJobOptions}
              onchange={handleGuestJobChange}
              defaultOption={{
                value: pageState.searchJob,
                label: t(pageState.searchJob.toLowerCase()),
              }}
              // caption="user-job"
            />
          </div>
        ) : (
          <div></div>
        )}
      </RowWith2Children>

      <Separator />
      <RowWith2Children>
        <div className={styles.selectDiv}>
          <Input
            label="user-mobile"
            id="search-mobile"
            type="text"
            value={pageState.searchMobile}
            onchange={(e) => {
              dispatch(setSearchMobile(e.target.value));
            }}
            bordered={true}
            placeholder="search-by-mobile"
            onEnterPress={enterPress}
            resetField={() => dispatch(setSearchMobile(""))}
            smallFont={true}
          />
        </div>

        <div></div>
      </RowWith2Children>

      <Separator />

      {pageState.userType === UserTypeConstants.WAREHOUSE && (
        <>
          <RowWith2Children>
            <div className={styles.selectDiv}>
              <label>{t("show-warehouse-items")}</label>
              <SelectCustom
                bgColor={Colors.SECONDARY_COLOR}
                foreColor="#fff"
                options={showWarehouseItems}
                onchange={handleShowItems}
                defaultOption={{
                  value: pageState.showItems,
                  label: t(pageState.showItems.toLowerCase()),
                }}
                // caption="show-warehouse-items"
              />
            </div>

            <div></div>
          </RowWith2Children>
          <Separator />
        </>
      )}

      <RowWith2Children>
        <div className={styles.selectDiv}>
          <label>{t("approved-state")}</label>
          <SelectCustom
            bgColor={Colors.SECONDARY_COLOR}
            foreColor="#fff"
            options={approvedState}
            onchange={handleApproveChange}
            defaultOption={{
              value: pageState.approved,
              label: t(pageState.approved.toLowerCase()),
            }}
            // caption="approved-state"
          />
        </div>
        <div className={styles.selectDiv}>
          <label>{t("approved-state")}</label>
          <SelectCustom
            bgColor={Colors.SECONDARY_COLOR}
            foreColor="#fff"
            options={deletedState}
            onchange={handleActiveChange}
            defaultOption={{
              value: pageState.active,
              label: t(pageState.active.toLowerCase()),
            }}
            // caption="approved-state"
          />
        </div>
      </RowWith2Children>

      <Separator />

      {(pageState.userType === UserTypeConstants.WAREHOUSE ||
        pageState.userType === UserTypeConstants.PHARMACY) && (
        <RowWith2Children>
          <div>
            <Input
              label="user-employee-name"
              id="search-employee-name"
              type="text"
              value={pageState.searchEmployeeName}
              onchange={(e) => {
                dispatch(setSearchEmployeeName(e.target.value));
              }}
              bordered={true}
              placeholder="search-by-employee-name"
              onEnterPress={enterPress}
              resetField={() => dispatch(setSearchEmployeeName(""))}
              smallFont={true}
            />
          </div>
          <div>
            <Input
              label="user-certificate-name"
              id="search-certificate-name"
              type="text"
              value={pageState.searchCertificateName}
              onchange={(e) => {
                dispatch(setSearchCertificateName(e.target.value));
              }}
              bordered={true}
              placeholder="search-by-certificate"
              onEnterPress={enterPress}
              resetField={() => dispatch(setSearchCertificateName(""))}
              smallFont={true}
            />
          </div>
        </RowWith2Children>
      )}

      {pageState.searchJob === GuestJob.EMPLOYEE && (
        <>
          <RowWith2Children>
            <div>
              <Input
                label="user-company-name"
                id="search-company-name"
                type="text"
                value={pageState.searchCompanyName}
                onchange={(e) => {
                  dispatch(setSearchCompanyName(e.target.value));
                }}
                bordered={true}
                placeholder="search-by-company-name"
                onEnterPress={enterPress}
                resetField={() => dispatch(setSearchCompanyName(""))}
                smallFont={true}
              />
            </div>
            <div>
              <Input
                label="user-job-title"
                id="search-job-title"
                type="text"
                value={pageState.searchJobTitle}
                onchange={(e) => {
                  dispatch(setSearchJobTitle(e.target.value));
                }}
                bordered={true}
                placeholder="search-by-job-title"
                onEnterPress={enterPress}
                resetField={() => dispatch(setSearchJobTitle(""))}
                smallFont={true}
              />
            </div>
          </RowWith2Children>
          <Separator />
        </>
      )}

      <>
        <div>
          <Input
            label="user-address-details"
            id="search-address-details"
            type="text"
            value={pageState.searchAddressDetails}
            onchange={(e) => {
              dispatch(setSearchAddressDetails(e.target.value));
            }}
            bordered={true}
            placeholder="search-by-address-details"
            onEnterPress={enterPress}
            resetField={(e) => {
              dispatch(setSearchAddressDetails(""));
            }}
            smallFont={true}
          />
        </div>
      </>
    </Modal>
  );
}

export default AdminUsersSearchModal;
