// libraries
import React, { useState, useRef } from "react";
import { Redirect, useHistory } from "react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Logo from "../../logo.png";

// components
import SelectCustom from "../select/select.component";
import Input from "../input/input.component";
import Toast from "../toast/toast.component";
import Button from "../button/button.component";
import Loader from "../action-loader/action-loader.component";
import CitiesDropDown from "../cities-dropdown/cities-dropdown.component";
import Modal from "../modal/modal.component";
import License from "../license/license.component";

// redux
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";

// Constants && utils
import {
  BASEURL,
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
  const history = useHistory();

  const dispatch = useDispatch();

  const inputFileRef = useRef(null);

  // selectors
  const isOnline = useSelector(selectOnlineStatus);
  // state from user state redux
  const { user: authUser } = useSelector(selectUserData);

  // own state
  const [showLicenseModel, setShowLicenseModal] = useState(false);
  const [networkError, setNetworkError] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);
  // state to determine that the sign up process succeeded or not
  const [signupSucceeded, setSignupSucceeded] = useState(false);
  const [userNamePlaceHolder, setUserNamePlaceHolder] =
    useState("enter-guest-name");
  const [userPaperUrlLabel, setUserPaperUrlLabel] = useState(
    "choose-paper-url-guest"
  );
  const [uploadPaperError, setUploadPaperError] = useState("");
  const [loadingSignUpMsg, setLoadingSignUpMsg] = useState("");
  const [loadingPaperUrlMsg, setLoadingPaperUrlMsg] = useState("");

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
    addressDetails: "",
    type: UserTypeConstants.GUEST,
    employeeName: "",
    certificateName: "",
    paperUrl: null,
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
    addressDetails: "",
    city: "",
    paperUrl: "",
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
      addressDetails: "",
      type: UserTypeConstants.GUEST,
      employeeName: "",
      certificateName: "",
      paperUrl: null,
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
      addressDetails: "",
      city: "",
      paperUrl: "",
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

  //
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
        paperUrl: "",
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
      if (e.target.value === UserTypeConstants.WAREHOUSE) {
        setUserNamePlaceHolder("enter-warehouse-name");
        setUserPaperUrlLabel("");
      }
      if (e.target.value === UserTypeConstants.COMPANY) {
        setUserNamePlaceHolder("enter-company-name");
        setUserPaperUrlLabel("");
      }
      if (e.target.value === UserTypeConstants.PHARMACY) {
        setUserNamePlaceHolder("enter-pharmacy-name");
        setUserPaperUrlLabel("choose-paper-url-pharmacy");
      }
      if (e.target.value === UserTypeConstants.GUEST) {
        setUserNamePlaceHolder("enter-guest-name");
        setUserPaperUrlLabel("choose-paper-url-guest");
      }
      setUser({
        ...user,
        [e.target.id]: e.target.value,
        employeeName: "",
        certificateName: "",
        paperUrl:
          e.target.value === UserTypeConstants.WAREHOUSE ||
          e.target.value === UserTypeConstants.COMPANY
            ? null
            : user.paperUrl,
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

    if (user.addressDetails.length === 0) {
      errorObj["addressDetails"] = "enter-address-details";
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
    if (user.type === UserTypeConstants.GUEST) {
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

    if (
      user.type === UserTypeConstants.PHARMACY ||
      user.type === UserTypeConstants.GUEST
    ) {
      if (
        user.paperUrl === null ||
        user.paperUrl?.length === 0 ||
        !user.paperUrl
      ) {
        errorObj["paperUrl"] = "enter-paper-url";
      }

      // if (user.paperUrl !== null && user.paperUrl.size > 5242880) {
      //   errorObj["paperUrl"] = "paper-url-size-error";
      // }
    }

    // send post request to server to create a new user
    if (Object.entries(errorObj).length === 0) {
      if (!isOnline) {
        dispatch(changeOnlineMsg());
        return;
      }

      setShowLicenseModal(true);
    } else {
      setError(errorObj);
    }
  };

  const newAccountHandler = async () => {
    setShowLicenseModal(false);
    setSignupLoading(true);
    setLoadingSignUpMsg("create-user-msg");

    try {
      const userResponse = await axios.post(
        `${BASEURL}/users/signup`,
        user,
        {}
      );

      if (
        user.type === UserTypeConstants.PHARMACY ||
        user.type === UserTypeConstants.GUEST
      ) {
        setLoadingSignUpMsg("create-user-succeeded-msg");
        setLoadingPaperUrlMsg("paper-loading-msg");
        const data = new FormData();
        data.append("file", user.paperUrl);
        data.append("id", userResponse.data.data.id);

        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };

        try {
          await axios.post(`${BASEURL}/users/upload-license`, data, config);
          setLoadingSignUpMsg("");
          setLoadingPaperUrlMsg("");
          setSignupLoading(false);
          setSignupSucceeded(true);
        } catch (err) {
          setLoadingSignUpMsg("");
          setLoadingPaperUrlMsg("");
          setSignupLoading(false);
          setSignupSucceeded(true);
        }
      } else {
        setLoadingSignUpMsg("");
        setSignupLoading(false);
        setSignupSucceeded(true);
      }
    } catch (err) {
      if (err.code === "ECONNABORTED" && err.message.startsWith("timeout")) {
        setNetworkError("timeout");
      } else if (!err.response) {
        setNetworkError("network failed");
      } else {
        setError({
          [err.response.data.field[0]]: err.response.data.message,
        });
      }

      setSignupLoading(false);
    }

    // if (
    //   user.type === UserTypeConstants.PHARMACY ||
    //   user.type === UserTypeConstants.GUEST
    // ) {
    //   const data = new FormData();
    //   data.append("file", user.paperUrl);

    //   const config = {
    //     headers: {
    //       "content-type": "multipart/form-data",
    //     },
    //   };

    //   try {
    //     const uploadResponse = await axios.post(
    //       `${BASEURL}/users/upload-license`,
    //       data,
    //       config
    //     );
    //     if (uploadResponse && uploadResponse.data.data.name !== "") {
    //       try {
    //         await axios.post(
    //           `${BASEURL}/users/signup`,
    //           { ...user, paper_url: uploadResponse.data.data.name },
    //           {}
    //         );
    //         setSignupLoading(false);
    //         setSignupSucceeded(true);
    //       } catch (err) {
    //         if (
    //           err.code === "ECONNABORTED" &&
    //           err.message.startsWith("timeout")
    //         ) {
    //           setNetworkError("timeout");
    //         } else if (!err.response) {
    //           setNetworkError("network failed");
    //         } else {
    //           setError({
    //             [err.response.data.field[0]]: err.response.data.message,
    //           });
    //         }

    //         setSignupLoading(false);
    //       }
    //     } else {
    //       setUploadPaperError(t("upload-paper-error"));
    //     }
    //   } catch (err) {
    //     setUploadPaperError("upload-paper-error");
    //     setSignupLoading(false);
    //   }
    // } else {
    //   try {
    //     await axios.post(`${BASEURL}/users/signup`, user, {});
    //     setSignupLoading(false);
    //     setSignupSucceeded(true);
    //   } catch (err) {
    //     if (err.code === "ECONNABORTED" && err.message.startsWith("timeout")) {
    //       setNetworkError("timeout");
    //     } else if (!err.response) {
    //       setNetworkError("network failed");
    //     } else {
    //       setError({
    //         [err.response.data.field[0]]: err.response.data.message,
    //       });
    //     }

    //     setSignupLoading(false);
    //   }
    // }
  };

  const inputFileChangeHandler = (e) => {
    if (e.target.files[0]) {
      setUser({
        ...user,
        paperUrl: e.target.files[0],
      });
      setError({
        ...error,
        paperUrl: "",
      });
    } else {
      setUser({
        ...user,
        paperUrl: null,
      });
      setError({
        ...error,
        paperUrl: "",
      });
    }
  };

  return authUser ? (
    <Redirect to="/" />
  ) : signupSucceeded ? (
    <Redirect to="/approve" />
  ) : (
    <motion.div
      className={[styles.container].join(" ")}
      variants={containerVariant}
      initial="hidden"
      animate="visible"
    >
      {/* top left */}
      <div className={styles.signin}>
        <label>{t("sign-in-sentence")}</label>
        <label className={styles.signin_button} onClick={signInHandler}>
          {t("sign-in")}
        </label>
      </div>
      <img src={Logo} alt="thumb" />

      <h3>{t("sign-up")}</h3>

      <div className={styles.info_div}>
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
              value={UserTypeConstants.GUEST}
              checked={user.type === UserTypeConstants.GUEST}
              onChange={inputChangeHandler}
            />
            <label>{t("normal")}</label>
          </div>
        </div>
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
            placeholder={userNamePlaceHolder}
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
            placeholder="mandatory-placeholder"
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
            placeholder="mandatory-placeholder"
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
            placeholder="mandatory-placeholder"
          />
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
                placeholder="mandatory-placeholder"
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
                placeholder="mandatory-placeholder"
              />
            </div>
          </>
        ) : (
          <></>
        )}

        {user.type === UserTypeConstants.GUEST ? (
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
                    placeholder="mandatory-placeholder"
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
                    placeholder="mandatory-placeholder"
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
            placeholder="optional-placeholder"
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
            placeholder="optional-placeholder"
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
            placeholder="mandatory-placeholder"
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
          <CitiesDropDown
            onSelectionChange={citiesNameChangeHandler}
            defaultValue={{
              value: "NONE",
              label: t("city-name"),
            }}
            caption=""
          />
        </div>

        {/* address details */}
        <div className={styles.input_div} style={{ width: "98%" }}>
          <Input
            icon={getIcon("district")}
            type="text"
            label="user-address-details"
            id="addressDetails"
            value={user.addressDetails}
            onchange={inputChangeHandler}
            error={error.addressDetails?.length > 0}
            placeholder="mandatory-placeholder"
          />
        </div>

        {(user.type === UserTypeConstants.PHARMACY ||
          user.type === UserTypeConstants.GUEST) && (
          <div div className={styles.input_div} style={{ width: "98%" }}>
            <form encType="multipart/form-data">
              <>
                <label
                  htmlFor="paperUrl"
                  style={{
                    color: Colors.WHITE_COLOR,
                    marginInlineEnd: "6px",
                  }}
                >
                  {t(userPaperUrlLabel)}
                </label>
                <input
                  type="file"
                  name="file"
                  ref={inputFileRef}
                  accept="image/png, image/gif, image/jpeg, image/jpg"
                  stye={{ display: "none" }}
                  onChange={inputFileChangeHandler}
                />
              </>
            </form>
          </div>
        )}
      </div>

      {Object.entries(error).length > 0 && (
        <ul className={styles.error_ul}>
          {Object.keys(error).map((key) => {
            if (error[key]?.length > 0) {
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

      {uploadPaperError && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          actionAfterTimeout={() => {
            setUploadPaperError("");
          }}
        >
          <p>{t(uploadPaperError)}</p>
        </Toast>
      )}

      {signupLoading && (
        <Loader
          allowCancel={false}
          msg1={loadingSignUpMsg}
          msg2={loadingPaperUrlMsg}
        />
      )}

      {showLicenseModel && (
        <Modal
          closeModal={() => {
            setShowLicenseModal(false);
          }}
          header={t("license-header")}
          cancelLabel={t("close-label")}
        >
          <License action={newAccountHandler} />
        </Modal>
      )}
    </motion.div>
  );
}

export default SignUp;
