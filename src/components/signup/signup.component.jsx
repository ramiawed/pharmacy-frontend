// libraries
import React, { useState } from "react";
import { Redirect, useHistory } from "react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import axios from "../../api/pharmacy";

// components
import SelectCustom from "../select/select.component";
import Input from "../input/input.component";
import Toast from "../toast/toast.component";
import Button from "../button/button.component";
import Loader from "../action-loader/action-loader.component";

// redux
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { authSign, selectUserData } from "../../redux/auth/authSlice";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";
import { getAllSettings } from "../../redux/settings/settingsSlice";

// Constants && utils
import {
  CitiesName,
  Colors,
  GuestJob,
  UserTypeConstants,
} from "../../utils/constants";
import { getIcon } from "../../utils/icons.js";

// styles
import styles from "./signup.module.scss";

const containerVariant = {
  hidden: {
    opacity: 0,
    left: "100vw",
  },
  visible: {
    opacity: 1,
    left: "0",
    transition: {
      type: "spring",
    },
  },
};

// Sign up component
function SignUp() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  // selectors
  const isOnline = useSelector(selectOnlineStatus);
  // state from user state redux
  const { user: signinUser } = useSelector(selectUserData);

  // own state
  const [networkError, setNetworkError] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);
  // state to determine that the sign up process succeeded or not
  const [signupSucceeded, setSignupSucceeded] = useState(false);

  // states for each field
  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
    passwordConfirm: "",
    email: "",
    phone: "",
    mobile: "",
    city: CitiesName.NONE,
    district: "",
    street: "",
    type: UserTypeConstants.NORMAL,
    employeeName: "",
    certificateName: "",
    guestDetails: {
      job: "",
      companyName: "",
      jobTitle: "",
    },
  });

  // state to hold the error with the field that cause the error
  const [error, setError] = useState({
    name: "",
    username: "",
    password: "",
    passwordConfirm: "",
    email: "",
    mobile: "",
    job: "",
    employeeName: "",
    certificateName: "",
    companyName: "",
    jobTitle: "",
  });

  // reset all state to default
  const signInHandler = () => {
    // reset user
    setUser({
      name: "",
      username: "",
      password: "",
      passwordConfirm: "",
      email: "",
      phone: "",
      mobile: "",
      city: "",
      district: "",
      street: "",
      type: UserTypeConstants.NORMAL,
      employeeName: "",
      certificateName: "",
      guestDetails: {
        job: "",
        companyName: "",
        jobTitle: "",
      },
    });

    // reset error
    setError({
      name: "",
      username: "",
      password: "",
      passwordConfirm: "",
      email: "",
      mobile: "",
      employeeName: "",
      certificateName: "",
      job: "",
      companyName: "",
      jobTitle: "",
      city: "",
    });

    history.push("/signin");
  };

  // guest options and its change handler
  const guestJobOptions = [
    { value: GuestJob.NONE, label: t("user-job") },
    { value: GuestJob.STUDENT, label: t("student") },
    { value: GuestJob.PHARMACIST, label: t("pharmacist") },
    { value: GuestJob.EMPLOYEE, label: t("employee") },
  ];
  // Guest types are (Student, Pharmacist, Employee)
  // uses with the SelectCustom
  const guestTypeChangeHandler = (val) => {
    // if the user type is Normal and the job is Student or Pharmacist
    // so the user doesn't contains info about company name and job title
    if (val === GuestJob.STUDENT || val === GuestJob.PHARMACIST) {
      setUser({
        ...user,
        guestDetails: {
          ...user.guestDetails,
          job: val,
          // reset company name and job title
          companyName: "",
          jobTitle: "",
        },
      });
    } else {
      setUser({
        ...user,
        guestDetails: {
          ...user.guestDetails,
          job: val,
        },
      });
    }

    // reset the error
    setError({
      ...error,
      job: "",
      companyName: "",
      employeeName: "",
      certificateName: "",
      jobTitle: "",
    });
  };

  // guest options and its change handler
  const citiesOptions = [
    { value: CitiesName.NONE, label: t("city-name") },
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
  ];
  // Guest types are (Student, Pharmacist, Employee)
  // uses with the SelectCustom
  const citiesNameChangeHandler = (val) => {
    // if the user type is Normal and the job is Student or Pharmacist
    // so the user doesn't contains info about company name and job title
    setUser({
      ...user,
      city: val,
    });

    // reset the error
    setError({
      ...error,
      city: "",
    });
  };

  // handle change values in all fields
  const inputChangeHandler = (e) => {
    if (e.target.id === "type") {
      setError({
        ...error,
        [e.target.id]: "",
        job: "",
        companyName: "",
        employeeName: "",
        certificateName: "",
        jobTitle: "",
      });
    } else {
      setError({
        ...error,
        [e.target.id]: "",
      });
    }

    if (e.target.id === "companyName") {
      // the input field is the company name
      setUser({
        ...user,
        guestDetails: {
          ...user.guestDetails,
          companyName: e.target.value,
        },
      });
    } else if (e.target.id === "jobTitle") {
      // the input field is the job title
      setUser({
        ...user,
        guestDetails: {
          ...user.guestDetails,
          jobTitle: e.target.value,
        },
      });
    } else if (e.target.id === "type") {
      // change the type of the user
      // reset employee name and certificate name and guestDetails
      // (job, company name, job title)
      setUser({
        ...user,
        [e.target.id]: e.target.value,
        employeeName: "",
        certificateName: "",
        guestDetails: {
          ...user.guestDetails,
          job: "",
          companyName: "",
          jobTitle: "",
        },
      });
    } else {
      setUser({
        ...user,
        [e.target.id]: e.target.value,
      });
    }
  };

  // handle click on the create an account button
  // check name, username, password, passwordConfirm to be not empty
  // check the password and passwordConfirm length (must be greater than or equals to 8)
  // check the equality of the password and passwordConfirm
  const createAccountHandler = () => {
    const errorObj = {};
    if (user.name.trim().length === 0) {
      errorObj["name"] = "enter-name";
    }

    if (user.username.trim().length === 0) {
      errorObj["username"] = "enter-username";
    }

    if (user.password.length === 0) {
      errorObj["password"] = "enter-password";
    } else if (user.password.length < 5) {
      // password must be greater than or equals to 5 characters
      errorObj["password"] = "password-length";
    }

    if (user.passwordConfirm.length === 0) {
      errorObj["passwordConfirm"] = "enter-password-confirm";
    } else if (user.passwordConfirm.length < 5) {
      // password confirm must be greater than or equals to 5 characters
      errorObj["passwordConfirm"] = "confirm-password-length";
    }

    // password must be equals to password confirm
    if (
      user.password.length >= 5 &&
      user.passwordConfirm.length >= 5 &&
      user.password !== user.passwordConfirm
    ) {
      errorObj["password"] = "unequal-passwords";
      errorObj["passwordConfirm"] = "unequal-passwords";
    }

    if (user.mobile.length === 0) {
      errorObj["mobile"] = "enter-mobile";
    }

    if (user.city === CitiesName.NONE) {
      errorObj["city"] = "enter-city";
    }

    // if the user type is Pharmacy or Warehouse
    // employee name and certificate name are required
    if (
      user.type === UserTypeConstants.PHARMACY ||
      user.type === UserTypeConstants.WAREHOUSE
    ) {
      if (user.employeeName.trim().length === 0) {
        errorObj["employeeName"] = "enter-employee-name";
      }

      if (user.certificateName.trim().length === 0) {
        errorObj["certificateName"] = "enter-certificate-name";
      }
    }

    // if user type is normal
    // 1- the job required
    // 2- if the job is employee (job title, company name are required)
    if (user.type === UserTypeConstants.NORMAL) {
      if (user.guestDetails.job === GuestJob.EMPLOYEE) {
        if (user.guestDetails.jobTitle.trim().length === 0) {
          errorObj["jobTitle"] = "enter-job-title";
        }

        if (user.guestDetails.companyName.trim().length === 0) {
          errorObj["companyName"] = "enter-company-name";
        }
      }

      // job is required
      if (user.guestDetails.job === "") {
        errorObj["job"] = "choose-job";
      }
    }

    // send post request to server to create a new user
    if (Object.entries(errorObj).length === 0) {
      if (!isOnline) {
        dispatch(changeOnlineMsg());
        return;
      }

      setSignupLoading(true);
      axios
        .post("/users/signup", user, { timeout: 10000 })
        .then((response) => {
          // if create user succeeded

          // check if user type is normal
          if (user.type === UserTypeConstants.NORMAL) {
            dispatch(
              authSign({ username: user.username, password: user.password })
            )
              .then(unwrapResult)
              .then(({ token }) => {
                dispatch(getAllSettings({ token }));
              });
            setSignupLoading(false);
          } else {
            // user type is not normal
            // redirect to approve page
            setSignupLoading(false);
            setSignupSucceeded(true);
          }
        })
        .catch((err) => {
          if (
            err.code === "ECONNABORTED" &&
            err.message.startsWith("timeout")
          ) {
            setNetworkError("timeout");
          } else if (!err.response) {
            setNetworkError("network failed");
          } else {
            setError({
              [err.response.data.field[0]]: err.response.data.message,
            });
          }

          setSignupLoading(false);
        });
    } else {
      setError(errorObj);
    }
  };

  return signinUser ? (
    <Redirect to="/" />
  ) : signupSucceeded ? (
    <Redirect to="/approve" />
  ) : (
    <motion.div
      className={styles.container}
      variants={containerVariant}
      initial="hidden"
      animate="visible"
    >
      {/* top left */}
      <div className={styles.signup}>
        <p>{t("sign-in-sentence")}</p>
        <p className={styles.button} onClick={signInHandler}>
          {t("sign-in")}
        </p>
      </div>

      <h3>{t("sign-up")}</h3>

      <div className={styles.info_div}>
        {/* name */}
        <div className={styles.input_div}>
          <Input
            icon={getIcon("name")}
            type="text"
            label="user-name"
            id="name"
            value={user.name}
            onchange={inputChangeHandler}
            error={error.name?.length > 0}
          />
        </div>

        {/* username */}
        <div className={styles.input_div}>
          <Input
            icon={getIcon("username")}
            type="text"
            label="user-username"
            id="username"
            value={user.username}
            onchange={inputChangeHandler}
            error={error.username?.length > 0}
          />
        </div>

        {/* password */}
        <div className={styles.input_div}>
          <Input
            icon={getIcon("password")}
            type="password"
            label="user-password"
            id="password"
            value={user.password}
            onchange={inputChangeHandler}
            error={error.password?.length > 0}
          />
        </div>

        {/* password confirm */}
        <div className={styles.input_div}>
          <Input
            icon={getIcon("password")}
            type="password"
            label="user-password-confirm"
            id="passwordConfirm"
            value={user.passwordConfirm}
            onchange={inputChangeHandler}
            error={error.passwordConfirm?.length > 0}
          />
        </div>

        {/* user type with 100% width and top margin of 10 */}
        <div
          className={[
            styles.input_full_width,
            styles.radio_div,
            styles.margintop,
          ].join(" ")}
        >
          {/* Company */}
          <div className={styles.radio}>
            <input
              id="type"
              type="radio"
              value={UserTypeConstants.COMPANY}
              checked={user.type === UserTypeConstants.COMPANY}
              onChange={inputChangeHandler}
            />
            <label>{t("company")}</label>
          </div>

          {/* Warehouse */}
          <div className={styles.radio}>
            <input
              id="type"
              type="radio"
              value={UserTypeConstants.WAREHOUSE}
              checked={user.type === UserTypeConstants.WAREHOUSE}
              onChange={inputChangeHandler}
            />
            <label>{t("warehouse")}</label>
          </div>

          {/* Pharmacy */}
          <div className={styles.radio}>
            <input
              id="type"
              type="radio"
              value={UserTypeConstants.PHARMACY}
              checked={user.type === UserTypeConstants.PHARMACY}
              onChange={inputChangeHandler}
            />
            <label>{t("pharmacy")}</label>
          </div>

          {/* Normal */}
          <div className={styles.radio}>
            <input
              id="type"
              type="radio"
              value={UserTypeConstants.NORMAL}
              checked={user.type === UserTypeConstants.NORMAL}
              onChange={inputChangeHandler}
            />
            <label>{t("normal")}</label>
          </div>
        </div>

        {user.type === UserTypeConstants.PHARMACY ||
        user.type === UserTypeConstants.WAREHOUSE ? (
          <>
            <div className={styles.input_div}>
              <Input
                icon={getIcon("name")}
                type="text"
                label="user-employee-name"
                id="employeeName"
                value={user.employeeName}
                onchange={inputChangeHandler}
                error={error.employeeName?.length > 0}
              />
            </div>

            <div className={styles.input_div}>
              <Input
                icon={getIcon("certificateName")}
                type="text"
                label="user-certificate-name"
                id="certificateName"
                value={user.certificateName}
                onchange={inputChangeHandler}
                error={error.certificateName?.length > 0}
              />
            </div>
          </>
        ) : (
          <></>
        )}

        {user.type === UserTypeConstants.NORMAL ? (
          <>
            <div className={[styles.input_full_width].join(" ")}>
              <SelectCustom
                bgColor={Colors.SECONDARY_COLOR}
                foreColor="#fff"
                options={guestJobOptions}
                onchange={guestTypeChangeHandler}
                defaultOption={{
                  value: "Job",
                  label: t("user-job"),
                }}
              />
            </div>

            {user.guestDetails.job === GuestJob.EMPLOYEE ? (
              <>
                <div className={styles.input_div}>
                  <Input
                    icon={getIcon("name")}
                    type="text"
                    label="user-company-name"
                    id="companyName"
                    value={user.guestDetails.companyName}
                    onchange={inputChangeHandler}
                    error={error.companyName?.length > 0}
                  />
                </div>

                <div className={styles.input_div}>
                  <Input
                    icon={getIcon("name")}
                    type="text"
                    label="user-job-title"
                    id="jobTitle"
                    value={user.guestDetails.jobTitle}
                    onchange={inputChangeHandler}
                    error={error.jobTitle?.length > 0}
                  />
                </div>
              </>
            ) : null}
          </>
        ) : (
          <></>
        )}

        {/* email with 100% width and top margin of 10 */}
        <div
          className={[
            styles.input_div,
            styles.input_full_width,
            styles.margintop,
          ].join(" ")}
        >
          <Input
            icon={getIcon("email")}
            type="email"
            label="user-email"
            id="email"
            value={user.email}
            onchange={inputChangeHandler}
          />
        </div>

        {/* phone */}
        <div className={styles.input_div}>
          <Input
            icon={getIcon("phone")}
            type="text"
            label="user-phone"
            id="phone"
            value={user.phone}
            onchange={inputChangeHandler}
          />
        </div>

        {/* mobile */}
        <div className={styles.input_div}>
          <Input
            icon={getIcon("mobile")}
            type="text"
            label="user-mobile"
            id="mobile"
            value={user.mobile}
            onchange={inputChangeHandler}
            error={error.mobile?.length > 0}
          />
        </div>

        {/* city with 100% width and top margin of 10 */}
        <div
          className={[
            styles.input_div,
            styles.input_full_width,
            styles.margintop,
          ].join(" ")}
        >
          {/* <Input
            icon={getIcon("city")}
            type="text"
            label="user-city"
            id="city"
            value={user.city}
            onchange={inputChangeHandler}
          /> */}
          <SelectCustom
            bgColor={Colors.SECONDARY_COLOR}
            foreColor="#fff"
            options={citiesOptions}
            onchange={citiesNameChangeHandler}
            defaultOption={{
              value: "NONE",
              label: t("city-name"),
            }}
          />
        </div>

        {/* district */}
        <div className={styles.input_div}>
          <Input
            icon={getIcon("district")}
            type="text"
            label="user-district"
            id="district"
            value={user.district}
            onchange={inputChangeHandler}
          />
        </div>

        {/* street */}
        <div className={styles.input_div}>
          <Input
            icon={getIcon("street")}
            type="text"
            label="user-street"
            id="street"
            value={user.street}
            onchange={inputChangeHandler}
          />
        </div>
      </div>

      {Object.entries(error).length > 0 && (
        <ul className={styles.error_ul}>
          {Object.keys(error).map((key) => {
            if (error[key].length > 0) {
              return <li key={key}>{t(`${error[key]}`)}</li>;
            } else {
              return null;
            }
          })}
        </ul>
      )}

      <Button
        text={t("sign-up")}
        action={createAccountHandler}
        bgColor={Colors.FAILED_COLOR}
      />

      {networkError && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          actionAfterTimeout={() => {
            setNetworkError("");
          }}
        >
          <p>{t(networkError)}</p>
        </Toast>
      )}

      {signupLoading && <Loader allowCancel={false} />}
    </motion.div>
  );
}

export default SignUp;
