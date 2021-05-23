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
import { AiFillPhone, AiFillEnvironment } from "react-icons/ai";

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
      return <FaUserAlt className={styles.icon} />;
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
  });

  // reset all state to default
  const handleSigninClick = () => {
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
    });
    setError({
      name: "",
      username: "",
      password: "",
      passwordConfirm: "",
      email: "",
    });
    history.push("/signin");
  };

  // handle change values in all fields
  const handleInputChange = (e) => {
    setError({
      ...error,
      [e.target.id]: "",
    });
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    });
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
        <p className={styles.button} onClick={handleSigninClick}>
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
