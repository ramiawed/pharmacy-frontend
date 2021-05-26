// libraries
import React, { useState } from "react";
import { Redirect, useHistory } from "react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../api/pharmacy";

// react-icons
import { FaUserAlt, FaMobile } from "react-icons/fa";
import { RiLockPasswordFill, RiUserReceived2Fill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import {
  AiFillPhone,
  AiFillEnvironment,
  AiFillSafetyCertificate,
} from "react-icons/ai";

import SelectCustom from "../select/select.component";

// redux
import {
  authSign,
  selectUserData,
  resetError,
} from "../../redux/auth/authSlice";

// loading
import ReactLoading from "react-loading";

import styles from "./signup.module.scss";
import Input from "../input/input.component";

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

// choose the icon based on the id of the input
const icon = (type) => {
  switch (type) {
    case "name":
    case "employeeName":
      return <FaUserAlt className={styles.icon} />;

    case "certificateName":
      return <AiFillSafetyCertificate className={styles.icon} />;
    case "username":
      return <RiUserReceived2Fill className={styles.icon} />;
    case "password":
    case "passwordConfirm":
      return <RiLockPasswordFill className={styles.icon} />;
    case "email":
      return <MdEmail className={styles.icon} />;
    case "phone":
      return <AiFillPhone className={styles.icon} />;
    case "mobile":
      return <FaMobile className={styles.icon} />;
    case "city":
    case "district":
    case "street":
      return <AiFillEnvironment className={styles.icon} />;
    default:
      return <RiLockPasswordFill className={styles.icon} />;
  }
};

// Sign up component
function SignUp() {
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const guestJobOptions = [
    { value: "", label: t("user-job") },
    { value: "Student", label: t("student") },
    { value: "Pharmacist", label: t("pharmacist") },
    { value: "Employee", label: t("employee") },
  ];

  // state from user state redux
  const {
    status,
    user: signinUser,
    error: signinError,
  } = useSelector(selectUserData);

  // state to determine that the sign up process succeeded
  const [signupSucceeded, setSignupSucceeded] = useState(false);

  // state to hold the error with the field that cause the error
  const [error, setError] = useState({
    name: "",
    username: "",
    password: "",
    passwordConfirm: "",
    email: "",
    job: "",
    employeeName: "",
    certificateName: "",
    companyName: "",
    jobTitle: "",
  });

  // states for each field
  const [user, setUser] = useState({
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
    type: "Normal",
    employeeName: "",
    certificateName: "",
    guestDetails: {
      job: "",
      companyName: "",
      jobTitle: "",
    },
  });

  // reset all state to default
  const resetUserAndError = () => {
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
      type: "Normal",
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
      employeeName: "",
      certificateName: "",
      job: "",
      companyName: "",
      jobTitle: "",
    });

    history.push("/signin");
  };

  // Guest types are (Student, Pharmacist, Employee)
  // uses with the SelectCustom
  const handleGuestType = (val) => {
    // if the user type is Normal and the job is Student or Pharmacist
    // so the user doesn't contains info about company name and job title
    if (val === "Student" || val === "Pharmacist") {
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

  // handle change values in all fields
  const handleInputChange = (e) => {
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
  const handleCreateAccount = () => {
    const errorObj = {};
    if (user.name.trim().length === 0) {
      errorObj["name"] = "enter-name";
    }

    if (user.username.trim().length === 0) {
      errorObj["username"] = "enter-username";
    }

    if (user.password.length === 0) {
      errorObj["password"] = "enter-password";
    } else if (user.password.length < 8) {
      // password must be greater than or equals to 8 characters
      errorObj["password"] = "password-length";
    }

    if (user.passwordConfirm.length === 0) {
      errorObj["passwordConfirm"] = "enter-password-confirm";
    } else if (user.passwordConfirm.length < 8) {
      // password confirm must be greater than or equals to 8 characters
      errorObj["passwordConfirm"] = "confirm-password-length";
    }

    // password must be equals to password confirm
    if (
      user.password.length >= 8 &&
      user.passwordConfirm.length >= 8 &&
      user.password !== user.passwordConfirm
    ) {
      errorObj["password"] = "unequal-passwords";
      errorObj["passwordConfirm"] = "unequal-passwords";
    }

    // if the user type is Pharmacy or Warehouse
    // employee name and certificate name are required
    if (user.type === "Pharmacy" || user.type === "Warehouse") {
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
    if (user.type === "Normal") {
      if (user.guestDetails.job === "Employee") {
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
      axios
        .post("/users/signup", user)
        .then((response) => {
          // if create user succeeded

          // check if user type is normal
          if (user.type === "Normal") {
            dispatch(
              authSign({ username: user.username, password: user.password })
            );
          } else {
            // user type is not normal
            // redirect to approve page
            setSignupSucceeded(true);
          }
        })
        .catch((err) => {
          setError({
            [err.response.data.field[0]]: err.response.data.message,
          });
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
        <p>{t("signin-sentence")}</p>
        <p className={styles.button} onClick={resetUserAndError}>
          {t("signin")}
        </p>
      </div>

      <h3>{t("signup")}</h3>

      <div className={styles.info_div}>
        {/* name */}
        <div className={styles.input_div}>
          <Input
            icon={icon}
            type="text"
            label="user-name"
            id="name"
            value={user.name}
            onchange={handleInputChange}
            error={error.name?.length > 0}
          />
        </div>

        {/* username */}
        <div className={styles.input_div}>
          <Input
            icon={icon}
            type="text"
            label="user-username"
            id="username"
            value={user.username}
            onchange={handleInputChange}
            error={error.username?.length > 0}
          />
        </div>

        {/* password */}
        <div className={styles.input_div}>
          <Input
            icon={icon}
            type="password"
            label="user-password"
            id="password"
            value={user.password}
            onchange={handleInputChange}
            error={error.password?.length > 0}
          />
        </div>

        {/* password confirm */}
        <div className={styles.input_div}>
          <Input
            icon={icon}
            type="password"
            label="user-password-confirm"
            id="passwordConfirm"
            value={user.passwordConfirm}
            onchange={handleInputChange}
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
              value="Company"
              checked={user.type === "Company"}
              onChange={handleInputChange}
            />
            <label>{t("company")}</label>
          </div>

          {/* Warehouse */}
          <div className={styles.radio}>
            <input
              id="type"
              type="radio"
              value="Warehouse"
              checked={user.type === "Warehouse"}
              onChange={handleInputChange}
            />
            <label>{t("warehouse")}</label>
          </div>

          {/* Pharmacy */}
          <div className={styles.radio}>
            <input
              id="type"
              type="radio"
              value="Pharmacy"
              checked={user.type === "Pharmacy"}
              onChange={handleInputChange}
            />
            <label>{t("pharmacy")}</label>
          </div>

          {/* Normal */}
          <div className={styles.radio}>
            <input
              id="type"
              type="radio"
              value="Normal"
              checked={user.type === "Normal"}
              onChange={handleInputChange}
            />
            <label>{t("normal")}</label>
          </div>
        </div>

        {user.type === "Pharmacy" || user.type === "Warehouse" ? (
          <>
            <div className={styles.input_div}>
              <Input
                icon={icon}
                type="text"
                label="user-employee-name"
                id="employeeName"
                value={user.employeeName}
                onchange={handleInputChange}
                error={error.employeeName?.length > 0}
              />
            </div>

            <div className={styles.input_div}>
              <Input
                icon={icon}
                type="text"
                label="user-certificate-name"
                id="certificateName"
                value={user.certificateName}
                onchange={handleInputChange}
                error={error.certificateName?.length > 0}
              />
            </div>
          </>
        ) : (
          <></>
        )}

        {user.type === "Normal" ? (
          <>
            <div className={[styles.input_full_width].join(" ")}>
              <SelectCustom
                bgColor="#6172ac"
                foreColor="#fff"
                orderOptions={guestJobOptions}
                onchange={handleGuestType}
                defaultOption={{
                  value: "Job",
                  label: t("user-job"),
                }}
                // caption="user-job"
              />
            </div>

            {user.guestDetails.job === "Employee" ? (
              <>
                <div className={styles.input_div}>
                  <Input
                    icon={icon}
                    type="text"
                    label="user-company-name"
                    id="companyName"
                    value={user.guestDetails.companyName}
                    onchange={handleInputChange}
                    error={error.companyName?.length > 0}
                  />
                </div>

                <div className={styles.input_div}>
                  <Input
                    icon={icon}
                    type="text"
                    label="user-job-title"
                    id="jobTitle"
                    value={user.guestDetails.jobTitle}
                    onchange={handleInputChange}
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
            icon={icon}
            type="email"
            label="user-email"
            id="email"
            value={user.email}
            onchange={handleInputChange}
          />
        </div>

        {/* phone */}
        <div className={styles.input_div}>
          <Input
            icon={icon}
            type="text"
            label="user-phone"
            id="phone"
            value={user.phone}
            onchange={handleInputChange}
          />
        </div>

        {/* mobile */}
        <div className={styles.input_div}>
          <Input
            icon={icon}
            type="text"
            label="user-mobile"
            id="mobile"
            value={user.mobile}
            onchange={handleInputChange}
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
          <Input
            icon={icon}
            type="text"
            label="user-city"
            id="city"
            value={user.city}
            onchange={handleInputChange}
          />
        </div>

        {/* district */}
        <div className={styles.input_div}>
          <Input
            icon={icon}
            type="text"
            label="user-district"
            id="district"
            value={user.district}
            onchange={handleInputChange}
          />
        </div>

        {/* street */}
        <div className={styles.input_div}>
          <Input
            icon={icon}
            type="text"
            label="user-street"
            id="street"
            value={user.street}
            onchange={handleInputChange}
          />
        </div>
      </div>

      <ul className={styles.error_ul}>
        {Object.keys(error).map((key) => {
          if (error[key].length > 0) {
            return <li key={key}>{t(`${error[key]}`)}</li>;
          } else {
            return null;
          }
        })}
      </ul>

      <motion.button
        whileHover={{
          scale: 1.1,
          textShadow: "0px 0px 8px rgb(255, 255, 255)",
          boxShadow: "0px 0px 8px rgb(255, 255, 255)",
        }}
        onClick={handleCreateAccount}
      >
        {t("signup")}
      </motion.button>
      {/* <Shapes /> */}
    </motion.div>
  );
}

export default SignUp;
