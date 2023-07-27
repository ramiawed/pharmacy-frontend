// libraries
import React, { useState } from "react";
import { Redirect, useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Logo from "../../assets/small_logo.png";

// components
import CreateAccountStageThree from "../create-account-stage-three/create-account-stage-three.component";
import CreateAccountStageFour from "../create-account-stage-four/create-account-stage-four.component";
import CreateAccountStageOne from "../create-account-stage-one/create-account-stage-one.component";
import CreateAccountStageTwo from "../create-account-stage-two/create-account-stage-two.component";
import SignupStagesNumber from "../signup-stages-number/signup-stages-number.component";
import Loader from "../action-loader/action-loader.component";
import Modal from "../../modals/modal/modal.component";
import License from "../license/license.component";
import Button from "../button/button.component";
import Toast from "../toast/toast.component";

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
  UserTypeConstants,
} from "../../utils/constants";

// styles
import styles from "./signup.module.scss";
import { useTheme } from "../../contexts/themeContext";
import CustomButton from "../custom-button/custom-button.component";

// Sign up component
function SignUp() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const history = useHistory();

  const dispatch = useDispatch();

  // selectors
  const isOnline = useSelector(selectOnlineStatus);
  // state from user state redux
  const { user: authUser } = useSelector(selectUserData);

  // own state
  const [stage, setStage] = useState(1);
  const [prevStage, setPrevStage] = useState(0);

  const [userType, setUserType] = useState(UserTypeConstants.GUEST);
  const [stageTwoInfo, setStageTwoInfo] = useState({
    name: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });
  const [stageThreeInfo, setStageThreeInfo] = useState({
    email: "",
    phone: "",
    mobile: "",
    city: CitiesName.NONE,
    addressDetails: "",
  });
  const [stageFourInfo, setStageFourInfo] = useState({
    employeeName: "",
    certificateName: "",
    paperUrl: null,
    guestDetails: {
      job: "",
      companyName: "",
      jobTitle: "",
    },
  });

  const [showLicenseModel, setShowLicenseModal] = useState(false);
  const [networkError, setNetworkError] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);
  // state to determine that the sign up process succeeded or not
  const [signupSucceeded, setSignupSucceeded] = useState(false);
  const [uploadPaperError, setUploadPaperError] = useState("");
  const [loadingSignUpMsg, setLoadingSignUpMsg] = useState("");
  const [loadingPaperUrlMsg, setLoadingPaperUrlMsg] = useState("");
  const [error, setError] = useState({});

  const resetStageFourInfo = () => {
    setStageFourInfo({
      employeeName: "",
      certificateName: "",
      paperUrl: null,
      guestDetails: {
        job: "",
        companyName: "",
        jobTitle: "",
      },
    });
  };

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

    history.push("/signin");
  };

  // handle click on the create an account button
  // check name, username, password, passwordConfirm to be not empty
  // check the password and passwordConfirm length (must be greater than or equals to 8)
  // check the equality of the password and passwordConfirm
  const createAccountHandler = () => {
    // if (!isOnline) {
    //   dispatch(changeOnlineMsg());
    //   return;
    // }

    setUser({
      type: userType,
      ...stageTwoInfo,
      ...stageThreeInfo,
      ...stageFourInfo,
    });

    setShowLicenseModal(true);
  };

  const newAccountHandler = async () => {
    setShowLicenseModal(false);
    setSignupLoading(true);
    setLoadingSignUpMsg("create user msg");

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
        setLoadingSignUpMsg("create user succeeded msg");
        setLoadingPaperUrlMsg("paper loading msg");
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
  };

  return authUser ? (
    <Redirect to="/" />
  ) : signupSucceeded ? (
    <Redirect to="/approve" />
  ) : (
    <div
      className={[
        styles.outer_container,
        "flex flex-col gap-4 items-center relative min-w-[350px]",
      ].join(" ")}
    >
      {/* top left */}
      <div
        className={`w-full flex flex-col items-center p-5 rounded-xl 
          ${theme === "light" ? "bg-main " : "d-mixed300-primary300"}`}
      >
        <div className="w-full flex flex-row items-center mb-3">
          <div
            className={`${
              theme === "light" ? "text-white" : ""
            } flex-1 bold text-2xl`}
          >
            {t("sign up")}
          </div>
          <img
            src={Logo}
            alt="thumb"
            className={`w-[75px] h-auto rounded-full`}
          />
        </div>

        <SignupStagesNumber
          stage={stage}
          prevStage={prevStage}
          stagesArray={
            userType !== UserTypeConstants.COMPANY ? [1, 2, 3, 4] : [1, 2, 3]
          }
        />

        <div className={styles.stage_content_container}>
          {stage === 1 && (
            <CreateAccountStageOne
              next={prevStage < stage}
              type={userType}
              changeType={setUserType}
              setStage={setStage}
              setPrevStage={setPrevStage}
              resetStageFourInfo={resetStageFourInfo}
            />
          )}

          {stage === 2 && (
            <CreateAccountStageTwo
              next={prevStage < stage}
              obj={stageTwoInfo}
              type={userType}
              setObj={setStageTwoInfo}
              setStage={setStage}
              setPrevStage={setPrevStage}
            />
          )}

          {stage === 3 && (
            <CreateAccountStageThree
              next={prevStage < stage}
              setStage={setStage}
              setPrevStage={setPrevStage}
              obj={stageThreeInfo}
              setObj={setStageThreeInfo}
            />
          )}

          {stage === 4 && userType !== UserTypeConstants.COMPANY && (
            <CreateAccountStageFour
              next={prevStage < stage}
              userType={userType}
              setStage={setStage}
              setPrevStage={setPrevStage}
              obj={stageFourInfo}
              setObj={setStageFourInfo}
            />
          )}

          {((stage === 4 && userType === UserTypeConstants.COMPANY) ||
            stage === 5) && (
            <div className="flex flex-col gap-4 justify-center items-center w-full">
              <button
                onClick={createAccountHandler}
                className={`w-4/5 hover:w-5/6 transition-all rounded-xl h-20 ${
                  theme === "light"
                    ? "bg-offer text-dark"
                    : "bg-color-surface-200 text-color-primary-200"
                }`}
              >
                {t("sign up press")}
              </button>

              <CustomButton
                onClickHandler={() => {
                  setPrevStage(stage);
                  setStage(stage - 1);
                }}
                text={t("previous")}
                classname={`${
                  theme === "light"
                    ? "bg-green text-white"
                    : "d-primary500-mixed300"
                }`}
              />
            </div>
          )}
        </div>
      </div>

      <div
        className={`w-full flex flex-col items-center group p-5 rounded-xl cursor-pointer
        ${
          theme === "light"
            ? "bg-[#606ba0] hover:shadow-[0_0px_5px_3px_rgba(86,96,146,0.6)]"
            : "d-mixed300-primary300 hover:shadow-[0_0px_5px_3px_rgba(255,255,255,0.2)]"
        }`}
        onClick={signInHandler}
      >
        <label className="cursor-pointer text-sm text-white">
          {t("sign up sentence")}
        </label>
        {/* <br /> */}
        <label
          className={`${
            theme === "light" ? "text-red" : ""
          } inline-block bold cursor-pointer`}
        >
          {t("sign in")}
        </label>
      </div>

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
          closeHandler={() => {
            setShowLicenseModal(false);
          }}
          headerText={t("license header")}
          cancelText={t("close")}
          okText={t("i agree liscene")}
          okHandler={newAccountHandler}
          showFooter={true}
        >
          <License />
        </Modal>
      )}
    </div>
  );
}

export default SignUp;
