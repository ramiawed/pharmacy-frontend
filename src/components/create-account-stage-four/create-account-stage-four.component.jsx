import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

// constants
import { GuestJob, UserTypeConstants } from "../../utils/constants";

// components
import SignupStagesActions from "../signup-stages-actions/signup-stages-actions.component";
import ChooserContainer from "../chooser-container/chooser-container.component";
import StageContainer from "../stage-container/stage-container.component";
import ChooseValue from "../choose-value/choose-value.component";
import Input from "../input/input.component";

// styles
import styles from "./create-account-stage-four.module.scss";

const CreateAccountStageFour = ({
  next,
  userType,
  setStage,
  setPrevStage,
  obj,
  setObj,
}) => {
  const { t } = useTranslation();

  const inputFileRef = useRef(null);

  const userPaperUrlLabel =
    userType === UserTypeConstants.GUEST
      ? "choose-paper-url-guest"
      : "choose-paper-url-pharmacy";

  // guest options and its change handler
  const guestJobOptions = [
    { value: GuestJob.STUDENT, label: t("student") },
    { value: GuestJob.PHARMACIST, label: t("pharmacist") },
    { value: GuestJob.EMPLOYEE, label: t("employee") },
  ];

  const [showChooseGuestJobModal, setShowChooseGuestJobModal] = useState(false);
  const [error, setError] = useState({
    employeeName: "",
    certificateName: "",
    paperUrl: null,
    guestDetails: {
      job: "",
      companyName: "",
      jobTitle: "",
    },
  });

  const inputChangeHandler = (key, value) => {
    setObj({
      ...obj,
      [key]: value,
    });
    setError({
      ...error,
      [key]: "",
    });
  };

  const guestDetailsInputChangeHandler = (key, value) => {
    setObj({
      ...obj,
      guestDetails: {
        ...obj.guestDetails,
        [key]: value,
      },
    });

    setError({
      ...error,
      guestDetails: {
        ...error.guestDetails,
        [key]: "",
      },
    });
  };

  const nextStageHandler = () => {
    let hasError = false;
    let errorObj = {
      companyName: "",
      employeeName: "",
      certificateName: "",
      guestDetails: {
        job: "",
        companyName: "",
        jobTitle: "",
      },
    };

    if (
      userType === UserTypeConstants.PHARMACY ||
      userType === UserTypeConstants.WAREHOUSE
    ) {
      if (obj.employeeName.trim().length === 0) {
        hasError = true;
        errorObj = {
          ...errorObj,
          employeeName: "enter employee name",
        };
      }

      if (obj.certificateName.trim().length === 0) {
        hasError = true;
        errorObj = {
          ...errorObj,
          certificateName: "enter certificate name",
        };
      }
    }

    if (userType === UserTypeConstants.GUEST) {
      if (obj.guestDetails.job === GuestJob.EMPLOYEE) {
        if (obj.guestDetails.jobTitle.trim().length === 0) {
          hasError = true;
          errorObj = {
            ...errorObj,
            guestDetails: {
              ...errorObj.guestDetails,
              jobTitle: "enter job title",
            },
          };
        }

        if (obj.guestDetails.companyName.trim().length === 0) {
          hasError = true;
          errorObj = {
            ...errorObj,
            guestDetails: {
              ...errorObj.guestDetails,
              companyName: "enter company name",
            },
          };
        }
      }

      // job is required
      if (obj.guestDetails.job === "") {
        hasError = true;
        errorObj = {
          ...errorObj,
          guestDetails: {
            ...errorObj.guestDetails,
            job: "choose job",
          },
        };
      }
    }

    if (
      userType === UserTypeConstants.PHARMACY ||
      userType === UserTypeConstants.GUEST
    ) {
      if (
        obj.paperUrl === null ||
        obj.paperUrl?.length === 0 ||
        !obj.paperUrl
      ) {
        hasError = true;
        errorObj = {
          ...errorObj,
          paperUrl: "enter-paper-url",
        };
      }

      // if (user.paperUrl !== null && user.paperUrl.size > 5242880) {
      //   errorObj["paperUrl"] = "paper-url-size-error";
      // }
    }

    if (hasError) {
      setError(errorObj);
      return;
    }

    setPrevStage(4);
    setStage(5);
  };

  const prevStageHandler = () => {
    setPrevStage(4);
    setStage(3);
  };

  const addPaperUrlHanlder = () => {
    inputFileRef.current.click();
  };

  const inputFileChangeHandler = (e) => {
    if (e.target.files[0]) {
      setObj({
        ...obj,
        paperUrl: e.target.files[0],
      });
      setError({
        ...error,
        paperUrl: "",
      });
    } else {
      setObj({
        ...obj,
        paperUrl: null,
      });
      setError({
        ...error,
        paperUrl: "",
      });
    }
  };

  return (
    <>
      <StageContainer next={next}>
        <div className={styles.container}>
          {userType === UserTypeConstants.PHARMACY ||
          userType === UserTypeConstants.WAREHOUSE ? (
            <>
              <Input
                type="text"
                label="user employee name"
                id="employeeName"
                value={obj.employeeName}
                onchange={(e) =>
                  inputChangeHandler("employeeName", e.target.value)
                }
                error={error.employeeName?.length > 0}
                errorMsg={t(error.employeeName)}
                placeholder="mandatory-placeholder"
                onEnterPress={nextStageHandler}
              />
              <Input
                type="text"
                label="user certificate name"
                id="certificateName"
                value={obj.certificateName}
                onchange={(e) =>
                  inputChangeHandler("certificateName", e.target.value)
                }
                error={error.certificateName?.length > 0}
                errorMsg={t(error.certificateName)}
                placeholder="mandatory-placeholder"
                onEnterPress={nextStageHandler}
              />
            </>
          ) : (
            <></>
          )}

          {userType === UserTypeConstants.GUEST ? (
            <>
              <ChooserContainer
                onclick={() => setShowChooseGuestJobModal(true)}
                selectedValue={obj.guestDetails.job}
                label="user job"
                error={error.guestDetails.job}
              />

              {obj.guestDetails.job === GuestJob.EMPLOYEE ? (
                <>
                  <div className={styles.input_div}>
                    <Input
                      type="text"
                      label="user-company-name"
                      id="companyName"
                      value={obj.guestDetails.companyName}
                      onchange={(e) =>
                        guestDetailsInputChangeHandler(
                          "companyName",
                          e.target.value
                        )
                      }
                      error={error.guestDetails.companyName?.length > 0}
                      errorMsg={t(error.guestDetails.companyName)}
                      placeholder="mandatory-placeholder"
                      onEnterPress={nextStageHandler}
                    />
                  </div>

                  <div className={styles.input_div}>
                    <Input
                      type="text"
                      label="user job title"
                      id="jobTitle"
                      value={obj.guestDetails.jobTitle}
                      onchange={(e) =>
                        guestDetailsInputChangeHandler(
                          "jobTitle",
                          e.target.value
                        )
                      }
                      error={error.guestDetails.jobTitle?.length > 0}
                      errorMsg={t(error.guestDetails.jobTitle)}
                      placeholder="mandatory-placeholder"
                      onEnterPress={nextStageHandler}
                    />
                  </div>
                </>
              ) : null}
            </>
          ) : (
            <></>
          )}

          {(userType === UserTypeConstants.PHARMACY ||
            userType === UserTypeConstants.GUEST) && (
            <div
              className={[
                styles.choose_file_div,
                error.paperUrl ? styles.error : "",
              ].join(" ")}
              onClick={addPaperUrlHanlder}
            >
              <form encType="multipart/form-data">
                <>
                  <label htmlFor="paperUrl" style={{ textAlign: "center" }}>
                    {t(userPaperUrlLabel)}
                  </label>
                  <input
                    type="file"
                    name="file"
                    ref={inputFileRef}
                    accept="image/png, image/gif, image/jpeg, image/jpg"
                    style={{ display: "none" }}
                    onChange={inputFileChangeHandler}
                  />
                </>
              </form>
              <label>اضغط هنا</label>
              <label>{obj.paperUrl?.name}</label>
              {error.paperUrl && (
                <label className={styles.error_label}>
                  {t(error.paperUrl)}
                </label>
              )}
            </div>
          )}
          <SignupStagesActions
            stage={4}
            prevHandler={prevStageHandler}
            nextHandler={nextStageHandler}
          />
        </div>
      </StageContainer>

      {showChooseGuestJobModal && (
        <ChooseValue
          headerTitle="user job"
          close={() => {
            setShowChooseGuestJobModal(false);
          }}
          values={guestJobOptions}
          defaultValue={obj.guestDetails.job}
          chooseHandler={(value) => {
            setObj({
              ...obj,
              guestDetails: {
                ...obj.guestDetails,
                job: value,
              },
            });
            setError({
              ...error,
              guestDetails: {
                ...obj.guestDetails,
                job: "",
              },
            });
          }}
        />
      )}
    </>
  );
};

export default CreateAccountStageFour;
