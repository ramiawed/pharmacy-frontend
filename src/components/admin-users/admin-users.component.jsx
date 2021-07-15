import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";

// constants
import {
  UserTypeConstants,
  UserApprovedState,
  UserActiveState,
  GuestJob,
  Colors,
  OrderOptions,
} from "../../utils/constants";

// components
import Header from "../header/header.component";
import UserRow from "../user-row/user-row.component";
import SelectCustom from "../select/select.component";
import Toast from "../toast/toast.component";
import RowWith2Children from "../row-with-two-children/row-with-two-children.component";
import Input from "../input/input.component";
import Modal from "../modal/modal.component";
import IconWithNumber from "../icon-with-number/icon-with-number.component";
import Order from "../order/order.component";
import TableHeader from "../table-header/table-header.component";

// 3-party library (loading, paginate)
import ReactLoading from "react-loading";
import ReactPaginate from "react-paginate";

// react-icons
import { FaSearch } from "react-icons/fa";
import { BiSortAZ } from "react-icons/bi";
import { FiFileText } from "react-icons/fi";

// redux stuff
import {
  getUsers,
  resetUserChangePasswordStatus,
  selectUsers,
} from "../../redux/users/usersSlice";
import { selectUserData } from "../../redux/auth/authSlice";
import { resetActivationDeleteStatus } from "../../redux/users/usersSlice";

// styles
import generalStyles from "../../style.module.scss";
import styles from "./admin-users.module.scss";
import tableStyles from "../table.module.scss";
import paginationStyles from "../pagination.module.scss";

// AdminUsers component
function AdminUsers() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  // watch the activationDeleteStatus and activationDeleteMsg to display a Toast when change
  const {
    users,
    status,
    count,
    activationDeleteStatus,
    activationDeleteStatusMsg,
    resetUserPasswordStatus,
    resetUserPasswordError,
  } = useSelector(selectUsers);
  const { token, user } = useSelector(selectUserData);

  // modal state
  const [showModal, setShowModal] = useState(false);
  const [showOrderModal, setShowOrderModel] = useState(false);

  // own state
  const [userType, setUserType] = useState(UserTypeConstants.ALL);
  const [searchName, setSearchName] = useState("");
  const [searchEmployeeName, setSearchEmployeeName] = useState("");
  const [searchCertificateName, setSearchCertificateName] = useState("");
  const [searchJob, setSearchJob] = useState(GuestJob.NONE);
  const [searchCompanyName, setSearchCompanyName] = useState("");
  const [searchJobTitle, setSearchJobTitle] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [searchDistrict, setSearchDistrict] = useState("");
  const [searchStreet, setSearchStreet] = useState("");
  const [initialPage, setInitialPage] = useState(0);
  const [approved, setApproved] = useState(UserApprovedState.ALL);
  const [active, setActive] = useState(UserActiveState.ALL);
  const [orderBy, setOrderBy] = useState({});
  const [searchOptionCount, setSearchOptionCount] = useState(0);

  const orderOptions = [
    { value: OrderOptions.NAME, label: t("user-name") },
    { value: OrderOptions.DATE_CREATED, label: t("user-created-at") },
    { value: OrderOptions.DATE_UPDATED, label: t("user-updated-at") },
    { value: OrderOptions.ACTIVE, label: t("deleted-account") },
    { value: OrderOptions.APPROVED, label: t("approved-state") },
    { value: OrderOptions.CITY, label: t("user-city") },
    { value: OrderOptions.DISTRICT, label: t("user-district") },
    { value: OrderOptions.STREET, label: t("user-street") },
  ];

  const addOrRemoveField = (field) => {
    if (field in orderBy) {
      const obj = { ...orderBy };
      delete obj[field];
      setOrderBy(obj);
    } else {
      setOrderBy({
        ...orderBy,
        [field]: 1,
      });
    }
  };

  const changeFieldValue = (field, value) => {
    setOrderBy({
      ...orderBy,
      [field]: value,
    });
  };

  const guestJobOptions = [
    { value: GuestJob.NONE, label: t("user-job") },
    { value: GuestJob.STUDENT, label: t("student") },
    { value: GuestJob.PHARMACIST, label: t("pharmacist") },
    { value: GuestJob.EMPLOYEE, label: t("employee") },
  ];

  const handleGuestJobChange = (val) => {
    setSearchJob(val);
    if (val !== GuestJob.EMPLOYEE) {
      setSearchCompanyName("");
      setSearchJobTitle("");
    }
  };

  // options for SelectCustom components (user type)
  const userTypeOptions = [
    { value: UserTypeConstants.COMPANY, label: t("company") },
    { value: UserTypeConstants.WAREHOUSE, label: t("warehouse") },
    { value: UserTypeConstants.PHARMACY, label: t("pharmacy") },
    { value: UserTypeConstants.NORMAL, label: t("normal") },
    { value: UserTypeConstants.ADMIN, label: t("admin") },
    { value: UserTypeConstants.ALL, label: t("all") },
  ];

  // handle the change of the User type state
  const handleSearchTypeChange = (val) => {
    setUserType(val);
    if (
      val === UserTypeConstants.ALL ||
      val === UserTypeConstants.ADMIN ||
      val === UserTypeConstants.COMPANY
    ) {
      setSearchEmployeeName("");
      setSearchCertificateName("");
      setSearchJob(GuestJob.NONE);
      setSearchCompanyName("");
      setSearchJobTitle("");
    }

    if (
      val === UserTypeConstants.PHARMACY ||
      val === UserTypeConstants.WAREHOUSE
    ) {
      setSearchJob(GuestJob.NONE);
      setSearchCompanyName("");
      setSearchJobTitle("");
    }

    if (val === UserTypeConstants.NORMAL) {
      setSearchEmployeeName("");
      setSearchCertificateName("");
    }
  };

  // options for the SelectCustom (Approved state)
  const approvedState = [
    { value: UserApprovedState.APPROVED, label: t("approved-account") },
    { value: UserApprovedState.NOT_APPROVED, label: t("not-approved-account") },
    { value: UserApprovedState.ALL, label: t("all") },
  ];

  const handleApproveChange = (val) => {
    setApproved(val);
  };

  // options for the SelectCustom (Delete state)
  const deletedState = [
    { value: UserActiveState.INACTIVE, label: t("deleted-account") },
    { value: UserActiveState.ACTIVE, label: t("not-deleted-account") },
    { value: UserActiveState.ALL, label: t("all") },
  ];

  const handleActiveChange = (val) => {
    setActive(val);
  };

  // handle search
  const handleSearch = (page) => {
    // build the query string
    const queryString = {};

    queryString.page = page;

    if (userType !== UserTypeConstants.ALL) {
      queryString.type = userType;
    }

    if (searchName.trim().length !== 0) {
      queryString.name = searchName.trim();
    }

    if (approved === UserApprovedState.APPROVED) {
      queryString.approve = true;
    }

    if (approved === UserApprovedState.NOT_APPROVED) {
      queryString.approve = false;
    }

    if (active === UserActiveState.ACTIVE) {
      queryString.active = true;
    }

    if (active === UserActiveState.INACTIVE) {
      queryString.active = false;
    }

    if (searchCity.trim().length !== 0) {
      queryString.city = searchCity.trim();
    }

    if (searchDistrict.trim().length !== 0) {
      queryString.district = searchDistrict.trim();
    }

    if (searchStreet.trim().length !== 0) {
      queryString.street = searchStreet.trim();
    }

    if (searchEmployeeName.trim().length !== 0) {
      queryString.employeeName = searchEmployeeName.trim();
    }

    if (searchCertificateName.trim().length !== 0) {
      queryString.certificateName = searchCertificateName.trim();
    }

    if (searchCompanyName.trim().length !== 0) {
      queryString.companyName = searchCompanyName.trim();
    }

    if (searchJobTitle.trim().length !== 0) {
      queryString.jobTitle = searchJobTitle.trim();
    }

    if (searchJob !== GuestJob.NONE) {
      queryString.job = searchJob;
    }

    setSearchOptionCount(Object.entries(queryString).length - 1);

    // build sort string
    let sortArray = [];
    Object.keys(orderBy).forEach((key) => {
      if (orderBy[key] === 1) {
        sortArray.push(`${key}`);
      } else {
        sortArray.push(`-${key}`);
      }
    });

    if (sortArray.length > 0) {
      queryString.sort = sortArray.join(",");
    }

    dispatch(getUsers({ queryString, token }));

    setInitialPage(page - 1);
  };

  // handle for page change in the paginate component
  const handlePageClick = (e) => {
    const { selected } = e;
    handleSearch(selected + 1);
    setInitialPage(selected);
    window.scrollTo(0, 0);
  };

  // handle will pass to Input Component
  // fire when the enter key presses
  // start search
  const enterPress = () => {
    handleSearch(1);
    setShowModal(false);
    setInitialPage(0);
  };

  // dispatch a getUsers after component render for the first time
  useEffect(() => {
    handleSearch(1);
  }, []);

  return user && user.type === UserTypeConstants.ADMIN ? (
    <>
      <div>
        <Header>
          <h2>
            {t("partners")} <span>{count}</span>
          </h2>
          <div className={styles.actions_icons}>
            <div onClick={() => setShowModal(true)}>
              <IconWithNumber
                value={searchOptionCount}
                fillIcon={
                  <div className={generalStyles.icon}>
                    <FaSearch size={16} />
                  </div>
                }
                noFillIcon={
                  <div className={generalStyles.icon}>
                    <FaSearch size={16} />
                  </div>
                }
                small={true}
              />
            </div>

            <div onClick={() => setShowOrderModel(true)}>
              <IconWithNumber
                value={Object.entries(orderBy).length}
                fillIcon={
                  <div className={generalStyles.icon}>
                    <BiSortAZ size={16} />{" "}
                  </div>
                }
                noFillIcon={
                  <div className={generalStyles.icon}>
                    <BiSortAZ size={16} />
                  </div>
                }
                small={true}
                tooltip={t("sort-results")}
              />
            </div>
          </div>
        </Header>
        {/* </div> */}
      </div>
      <TableHeader>
        <label className={tableStyles.label_large}>{t("user-name")}</label>
        <label className={tableStyles.label_small}>{t("user-approve")}</label>
        <label className={tableStyles.label_small}>{t("user-delete")}</label>
        <label className={tableStyles.label_large}>{t("user-email")}</label>
        <label className={tableStyles.label_medium}>{t("user-phone")}</label>
        <label className={tableStyles.label_medium}>{t("user-mobile")}</label>
        <label className={tableStyles.label_xsmall}></label>
        <label className={tableStyles.label_xsmall}></label>
      </TableHeader>

      {/* loading components when retrieve the result from DB */}
      {status === "loading" && (
        <div className={styles.loading}>
          <ReactLoading color="#8a7d85" type="bubbles" height={50} width={50} />
        </div>
      )}

      {/* Results */}
      <div className={styles.rows}>
        {users?.map((user, index) => (
          <UserRow key={user._id} user={user} index={index} />
        ))}
      </div>

      {count > 0 ? (
        <ReactPaginate
          previousLabel={t("previous")}
          nextLabel={t("next")}
          pageCount={Math.ceil(count / 9)}
          forcePage={initialPage}
          onPageChange={handlePageClick}
          containerClassName={paginationStyles.pagination}
          previousLinkClassName={paginationStyles.pagination_link}
          nextLinkClassName={paginationStyles.pagination_link}
          disabledClassName={paginationStyles.pagination_link_disabled}
          activeClassName={paginationStyles.pagination_link_active}
        />
      ) : (
        <>
          <div
            className={[
              generalStyles.no_content_div,
              generalStyles.fc_white,
            ].join(" ")}
          >
            <FiFileText size={250} />
            <p className={generalStyles.fc_white}>
              {t("no-partners-found-message")}
            </p>
          </div>
        </>
      )}

      {activationDeleteStatus === "success" ? (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t(activationDeleteStatusMsg)}
          actionAfterTimeout={() => {
            dispatch(resetActivationDeleteStatus());
            // handleSearch(initialPage + 1);
          }}
        />
      ) : activationDeleteStatus === "failed" ? (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#000"
          toastText={t(activationDeleteStatusMsg)}
          actionAfterTimeout={() => dispatch(resetActivationDeleteStatus())}
        />
      ) : null}

      {resetUserPasswordStatus === "success" ? (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t("password-change-succeeded")}
          actionAfterTimeout={() => {
            dispatch(resetUserChangePasswordStatus());
          }}
        />
      ) : resetUserPasswordStatus === "failed" ? (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#000"
          toastText={t()}
          actionAfterTimeout={() => dispatch(resetUserChangePasswordStatus())}
        />
      ) : null}

      {showModal && (
        <Modal
          header="search-engines"
          cancelLabel="cancel-label"
          okLabel="search"
          okModal={() => {
            setShowModal(false);
            handleSearch(1);
          }}
          closeModal={() => setShowModal(false)}
          small={true}
        >
          <RowWith2Children>
            <div>
              <Input
                label="user-name"
                id="search-name"
                type="text"
                value={searchName}
                onchange={(e) => {
                  setSearchName(e.target.value);
                }}
                bordered={true}
                icon={<FaSearch />}
                placeholder="search"
                onEnterPress={enterPress}
                resetField={() => setSearchName("")}
              />
            </div>
            <div>
              <Input
                label="user-city"
                id="search-city"
                type="text"
                value={searchCity}
                onchange={(e) => {
                  setSearchCity(e.target.value);
                }}
                bordered={true}
                icon={<FaSearch />}
                placeholder="search"
                onEnterPress={enterPress}
                resetField={() => setSearchCity("")}
              />
            </div>
          </RowWith2Children>
          <div
            style={{
              height: "1px",
              background: "rgba(0, 0, 0, 0.3)",
              margin: "2px 0",
            }}
          ></div>
          <RowWith2Children>
            <div>
              <Input
                label="user-district"
                id="search-district"
                type="text"
                value={searchDistrict}
                onchange={(e) => {
                  setSearchDistrict(e.target.value);
                }}
                bordered={true}
                icon={<FaSearch />}
                placeholder="search"
                onEnterPress={enterPress}
                resetField={(e) => {
                  setSearchDistrict("");
                }}
              />
            </div>
            <div>
              <Input
                label="user-street"
                id="search-street"
                type="text"
                value={searchStreet}
                onchange={(e) => {
                  setSearchStreet(e.target.value);
                }}
                bordered={true}
                icon={<FaSearch />}
                placeholder="search"
                onEnterPress={enterPress}
                resetField={() => setSearchStreet("")}
              />
            </div>
          </RowWith2Children>
          <div
            style={{
              height: "1px",
              background: "rgba(0, 0, 0, 0.3)",
              margin: "4px 0",
            }}
          ></div>
          <RowWith2Children>
            <SelectCustom
              bgColor={Colors.SECONDARY_COLOR}
              foreColor="#fff"
              options={approvedState}
              onchange={handleApproveChange}
              defaultOption={{
                value: approved,
                label: t(approved.toLowerCase()),
              }}
              caption="approved-state"
            />
            <SelectCustom
              bgColor={Colors.SECONDARY_COLOR}
              foreColor="#fff"
              options={deletedState}
              onchange={handleActiveChange}
              defaultOption={{
                value: active,
                label: t(active.toLowerCase()),
              }}
              caption="approved-state"
            />
          </RowWith2Children>

          <div
            style={{
              height: "1px",
              background: "rgba(0, 0, 0, 0.3)",
              margin: "4px 0",
            }}
          ></div>
          <RowWith2Children>
            <SelectCustom
              bgColor={Colors.SECONDARY_COLOR}
              foreColor="#fff"
              options={userTypeOptions}
              onchange={handleSearchTypeChange}
              defaultOption={{
                value: userType,
                label: t(userType.toLowerCase()),
              }}
              caption="user-type"
            />
            {userType === UserTypeConstants.NORMAL ? (
              <>
                <SelectCustom
                  bgColor={Colors.SECONDARY_COLOR}
                  foreColor="#fff"
                  options={guestJobOptions}
                  onchange={handleGuestJobChange}
                  defaultOption={{
                    value: GuestJob.NONE,
                    label: t(searchJob.toLowerCase()),
                  }}
                  caption="user-job"
                />{" "}
              </>
            ) : (
              <div></div>
            )}
          </RowWith2Children>
          <div
            style={{
              height: "1px",
              background: "rgba(0, 0, 0, 0.3)",
              margin: "4px 0",
            }}
          ></div>
          {(userType === UserTypeConstants.WAREHOUSE ||
            userType === UserTypeConstants.PHARMACY) && (
            <RowWith2Children>
              <div>
                <Input
                  label="user-employee-name"
                  id="search-employee-name"
                  type="text"
                  value={searchEmployeeName}
                  onchange={(e) => {
                    setSearchEmployeeName(e.target.value);
                  }}
                  bordered={true}
                  icon={<FaSearch />}
                  placeholder="search"
                  onEnterPress={enterPress}
                  resetField={() => setSearchEmployeeName("")}
                />
              </div>
              <div>
                <Input
                  label="user-certificate-name"
                  id="search-certificate-name"
                  type="text"
                  value={searchCertificateName}
                  onchange={(e) => {
                    setSearchCertificateName(e.target.value);
                  }}
                  bordered={true}
                  icon={<FaSearch />}
                  placeholder="search"
                  onEnterPress={enterPress}
                  resetField={() => setSearchCertificateName("")}
                />
              </div>
            </RowWith2Children>
          )}

          {searchJob === GuestJob.EMPLOYEE && (
            <RowWith2Children>
              <div>
                <Input
                  label="user-company-name"
                  id="search-company-name"
                  type="text"
                  value={searchCompanyName}
                  onchange={(e) => {
                    setSearchCompanyName(e.target.value);
                  }}
                  bordered={true}
                  icon={<FaSearch />}
                  placeholder="search"
                  onEnterPress={enterPress}
                  resetField={() => setSearchCompanyName("")}
                />
              </div>
              <div>
                <Input
                  label="user-job-title"
                  id="search-job-title"
                  type="text"
                  value={searchJobTitle}
                  onchange={(e) => {
                    setSearchJobTitle(e.target.value);
                  }}
                  bordered={true}
                  icon={<FaSearch />}
                  placeholder="search"
                  onEnterPress={enterPress}
                  resetField={() => setSearchJobTitle("")}
                />
              </div>
            </RowWith2Children>
          )}
        </Modal>
      )}

      {showOrderModal && (
        <Modal
          header="order-results"
          cancelLabel="cancel-label"
          okLabel="ok-label"
          okModal={() => {
            setShowOrderModel(false);
            handleSearch(1);
          }}
          closeModal={() => setShowOrderModel(false)}
          small={true}
        >
          <Order
            arr={orderOptions}
            orderBy={orderBy}
            orderChange={(field) => addOrRemoveField(field)}
            valueChanged={(field, value) => changeFieldValue(field, value)}
          />
        </Modal>
      )}
    </>
  ) : (
    <Redirect to="/" />
  );
}

export default AdminUsers;
