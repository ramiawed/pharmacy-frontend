import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import ChooserContainer from "../../components/chooser-container/chooser-container.component";
import SearchInput from "../../components/search-input/search-input.component";
import ChooseValue from "../../components/choose-value/choose-value.component";
import Modal from "../modal/modal.component";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
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
  setUserType,
  setSearchMobile,
} from "../../redux/users/usersSlice";

import {
  CitiesName,
  GuestJob,
  ShowWarehouseItems,
  UserActiveState,
  UserTypeConstants,
} from "../../utils/constants";

function AdminUsersSearchModal({ close, search, enterPress }) {
  const { t } = useTranslation();

  const { pageState } = useSelector(selectUsers);

  const dispatch = useDispatch();
  const [chooseObj, setChooseObj] = useState({
    show: false,
    action: null,
    defaultValue: null,
    options: null,
    header: "",
  });

  const guestJobOptions = [
    { value: GuestJob.NONE, label: t("user job") },
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
      header="search engines"
      cancelLabel="close-label"
      okLabel="search"
      closeModal={close}
      small={true}
      okModal={search}
    >
      <SearchInput
        label="user name"
        id="user name"
        type="text"
        value={pageState.searchName}
        onchange={(e) => dispatch(setSearchName(e.target.value))}
        placeholder="search by name"
        onEnterPress={enterPress}
        resetField={() => dispatch(setSearchName(""))}
        withBorder={true}
      />

      <ChooserContainer
        onclick={() =>
          setChooseObj({
            show: true,
            defaultValue: pageState.searchCity,
            options: citiesOptions,
            action: citiesNameChangeHandler,
            header: "city-name",
          })
        }
        selectedValue={pageState.searchCity}
        label="city-name"
        styleForSearch={true}
      />

      <ChooserContainer
        onclick={() =>
          setChooseObj({
            show: true,
            defaultValue: pageState.userType,
            options: userTypeOptions,
            action: handleSearchTypeChange,
            header: "user type",
          })
        }
        selectedValue={pageState.userType}
        label="user type"
        styleForSearch={true}
      />

      <ChooserContainer
        onclick={() =>
          setChooseObj({
            show: true,
            defaultValue: pageState.active,
            options: deletedState,
            action: handleActiveChange,
            header: "approved-state",
          })
        }
        selectedValue={pageState.active}
        label="approved-state"
        styleForSearch={true}
      />

      {pageState.userType === UserTypeConstants.GUEST && (
        <ChooserContainer
          onclick={() =>
            setChooseObj({
              show: true,
              defaultValue: pageState.searchJob,
              options: guestJobOptions,
              action: handleGuestJobChange,
              header: "user job",
            })
          }
          selectedValue={pageState.searchJob}
          label="user job"
          styleForSearch={true}
        />
      )}

      <SearchInput
        label="user mobile"
        id="search-mobile"
        type="text"
        value={pageState.searchMobile}
        onchange={(e) => {
          dispatch(setSearchMobile(e.target.value));
        }}
        placeholder="search by mobile"
        onEnterPress={enterPress}
        resetField={() => dispatch(setSearchMobile(""))}
        withBorder={true}
        // onkeyup={keyUpHandler}
      />

      {pageState.userType === UserTypeConstants.WAREHOUSE && (
        <ChooserContainer
          onclick={() =>
            setChooseObj({
              show: true,
              defaultValue: pageState.showItems,
              options: showWarehouseItems,
              action: handleShowItems,
              header: "show-warehouse-items",
            })
          }
          selectedValue={pageState.showItems}
          label="show-warehouse-items"
          styleForSearch={true}
        />
      )}

      {(pageState.userType === UserTypeConstants.WAREHOUSE ||
        pageState.userType === UserTypeConstants.PHARMACY) && (
        <>
          <SearchInput
            label="user employee name"
            id="search-employee-name"
            type="text"
            value={pageState.searchEmployeeName}
            onchange={(e) => {
              dispatch(setSearchEmployeeName(e.target.value));
            }}
            withBorder={true}
            placeholder="search by employee name"
            resetField={() => dispatch(setSearchEmployeeName(""))}
          />
          <SearchInput
            label="user certificate name"
            id="search-certificate-name"
            type="text"
            value={pageState.searchCertificateName}
            onchange={(e) => {
              dispatch(setSearchCertificateName(e.target.value));
            }}
            withBorder={true}
            placeholder="search by certificate"
            resetField={() => dispatch(setSearchCertificateName(""))}
          />
        </>
      )}

      {pageState.searchJob === GuestJob.EMPLOYEE && (
        <>
          <SearchInput
            label="user-company-name"
            id="search-company-name"
            type="text"
            value={pageState.searchCompanyName}
            onchange={(e) => {
              dispatch(setSearchCompanyName(e.target.value));
            }}
            withBorder={true}
            placeholder="search by company name"
            resetField={() => dispatch(setSearchCompanyName(""))}
          />

          <SearchInput
            label="user job title"
            id="search-job-title"
            type="text"
            value={pageState.searchJobTitle}
            onchange={(e) => {
              dispatch(setSearchJobTitle(e.target.value));
            }}
            withBorder={true}
            placeholder="search by job title"
            resetField={() => dispatch(setSearchJobTitle(""))}
          />
        </>
      )}

      <SearchInput
        label="user address details"
        id="search-address-details"
        type="text"
        value={pageState.searchAddressDetails}
        onchange={(e) => {
          dispatch(setSearchAddressDetails(e.target.value));
        }}
        withBorder={true}
        placeholder="search by address details"
        resetField={(e) => {
          dispatch(setSearchAddressDetails(""));
        }}
      />

      {chooseObj.show && (
        <ChooseValue
          headerTitle={chooseObj.header}
          close={() => {
            setChooseObj({
              show: false,
              action: null,
              defaultValue: null,
              options: null,
            });
          }}
          values={chooseObj.options}
          defaultValue={chooseObj.defaultValue}
          chooseHandler={(value) => {
            chooseObj.action(value);
          }}
        />
      )}
    </Modal>
  );
}

export default AdminUsersSearchModal;
