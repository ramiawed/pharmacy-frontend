import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// constants
import { CitiesName } from "../../utils/constants";

// components
import SignupStagesActions from "../signup-stages-actions/signup-stages-actions.component";
import ChooserContainer from "../chooser-container/chooser-container.component";
import StageContainer from "../stage-container/stage-container.component";
import ChooseValue from "../choose-value/choose-value.component";
import Input from "../input/input.component";

// styles
import styles from "./create-account-stage-three.module.scss";

const CreateAccountStageThree = ({
  next,
  setStage,
  setPrevStage,
  obj,
  setObj,
}) => {
  const { t } = useTranslation();

  const citiesOptions = [
    { value: CitiesName.ALEPPO, label: t("aleppo") },
    { value: CitiesName.DAMASCUS, label: t("damascus") },
    { value: CitiesName.DARAA, label: t("daraa") },
    { value: CitiesName.DEIR_EZ_ZOR, label: t("deir_ez_zor") },
    { value: CitiesName.HAMA, label: t("hama") },
    { value: CitiesName.AL_HASAKAH, label: t("al_hasakah") },
    { value: CitiesName.HOMS, label: t("homs") },
    { value: CitiesName.IDLIB, label: t("idlib") },
    { value: CitiesName.LATAKIA, label: t("latakia") },
    { value: CitiesName.QUNEITRA, label: t("guneitra") },
    { value: CitiesName.RAQQA, label: t("raqqa") },
    { value: CitiesName.AL_SUWAYDA, label: t("al_suwayda") },
    { value: CitiesName.TARTUS, label: t("tartus") },
    {
      value: CitiesName.DAMASCUS_COUNTRYSIDE,
      label: t("damascus_countryside"),
    },
  ];

  const [showChooseCityModal, setShowChooseCityModal] = useState(false);

  const [error, setError] = useState({
    mobile: "",
    city: "",
    addressDetails: "",
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

  const nextStageHandler = () => {
    let hasError = false;
    let errorObj = {
      mobile: "",
      city: "",
      addressDetails: "",
    };

    if (obj.mobile.trim().length === 0) {
      hasError = true;
      errorObj = {
        ...errorObj,
        mobile: "enter-mobile",
      };
    }

    if (obj.addressDetails.trim().length === 0) {
      hasError = true;
      errorObj = {
        ...errorObj,
        addressDetails: "enter-address-details",
      };
    }

    if (obj.city === CitiesName.NONE) {
      hasError = true;
      errorObj = {
        ...errorObj,
        city: "enter-city",
      };
    }

    if (hasError) {
      setError(errorObj);
      return;
    }

    setPrevStage(3);
    setStage(4);
  };

  const prevStageHandler = () => {
    setPrevStage(3);
    setStage(2);
  };

  return (
    <>
      <StageContainer next={next}>
        <div className={styles.container}>
          <ChooserContainer
            onclick={() => setShowChooseCityModal(true)}
            selectedValue={obj.city}
            label="city-name"
            error={error.city}
          />

          <Input
            type="email"
            label="user-email"
            id="email"
            value={obj.email}
            onchange={(e) => inputChangeHandler("email", e.target.value)}
            placeholder="optional-placeholder"
            onEnterPress={nextStageHandler}
          />

          <Input
            type="text"
            label="user-phone"
            id="phone"
            value={obj.phone}
            onchange={(e) => inputChangeHandler("phone", e.target.value)}
            placeholder="optional-placeholder"
            onEnterPress={nextStageHandler}
          />

          <Input
            type="text"
            label="user-mobile"
            id="mobile"
            value={obj.mobile}
            onchange={(e) => inputChangeHandler("mobile", e.target.value)}
            error={error.mobile?.length > 0}
            errorMsg={t(error.mobile)}
            placeholder="mandatory-placeholder"
            onEnterPress={nextStageHandler}
          />

          <Input
            type="text"
            label="user-address-details"
            id="addressDetails"
            value={obj.addressDetails}
            onchange={(e) =>
              inputChangeHandler("addressDetails", e.target.value)
            }
            error={error.addressDetails.length > 0}
            errorMsg={t(error.addressDetails)}
            placeholder="mandatory-placeholder"
            onEnterPress={nextStageHandler}
          />

          <SignupStagesActions
            stage={3}
            prevHandler={prevStageHandler}
            nextHandler={nextStageHandler}
          />
        </div>
      </StageContainer>
      {showChooseCityModal && (
        <ChooseValue
          headerTitle="city-name"
          close={() => {
            setShowChooseCityModal(false);
          }}
          values={citiesOptions}
          defaultValue={obj.city}
          chooseHandler={(value) => {
            setObj({
              ...obj,
              city: value,
            });
            setError({
              ...error,
              city: "",
            });
          }}
        />
      )}
    </>
  );
};

export default CreateAccountStageThree;
