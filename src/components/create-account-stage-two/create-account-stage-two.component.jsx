import axios from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ReactLoading from "react-loading";

// constants
import { BASEURL, Colors, UserTypeConstants } from "../../utils/constants";

// components
import Input from "../input/input.component";
import SignupStagesActions from "../signup-stages-actions/signup-stages-actions.component";
import StageContainer from "../stage-container/stage-container.component";
import CenterContainer from "../center-container/center-container.component";

// styles
import styles from "./create-account-stage-two.module.scss";

const CreateAccountStageTwo = ({
  next,
  type,
  obj,
  setObj,
  setStage,
  setPrevStage,
}) => {
  const { t } = useTranslation();
  const placeholder =
    type === UserTypeConstants.COMPANY
      ? "enter company name"
      : type === UserTypeConstants.WAREHOUSE
      ? "enter warehouse name"
      : type === UserTypeConstants.PHARMACY
      ? "enter pharmacy name"
      : "enter guest name";

  const [checking, setChecking] = useState(false);

  const [error, setError] = useState({
    name: "",
    username: "",
    password: "",
    passwordConfirm: "",
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

  const nextStageHandler = async () => {
    setChecking(true);

    let hasError = false;
    let errorObj = {
      name: "",
      username: "",
      password: "",
      passwordConfirm: "",
    };
    if (obj.name.trim().length === 0) {
      hasError = true;
      errorObj = {
        ...errorObj,
        name: "enter name",
      };
    }

    if (obj.username.trim().length === 0) {
      hasError = true;

      errorObj = {
        ...errorObj,
        username: "enter username",
      };
    }

    if (obj.password.length === 0) {
      hasError = true;

      errorObj = {
        ...errorObj,
        password: "enter password",
      };
    } else if (obj.password.length < 5) {
      // password must be greater than or equals to 5 characters
      hasError = true;

      errorObj = {
        ...errorObj,
        password: "password length",
      };
    }

    if (obj.passwordConfirm.length === 0) {
      hasError = true;

      errorObj = {
        ...errorObj,
        passwordConfirm: "enter password confirm",
      };
    } else if (obj.passwordConfirm.length < 5) {
      // password confirm must be greater than or equals to 5 characters
      hasError = true;

      errorObj = {
        ...errorObj,
        passwordConfirm: "confirm password length",
      };
    }

    // password must be equals to password confirm
    if (
      obj.password.length >= 5 &&
      obj.passwordConfirm.length >= 5 &&
      obj.password !== obj.passwordConfirm
    ) {
      hasError = true;

      errorObj = {
        ...errorObj,
        password: "unequal passwords",
        passwordConfirm: "unequal passwords",
      };
    }

    if (obj.username.trim().length > 0) {
      const response = await axios.get(
        `${BASEURL}/users/check-username/${obj.username}`
      );

      if (!response.data.available) {
        hasError = true;
        errorObj = {
          ...errorObj,
          username: "provide unique name",
        };
      }
    }

    setChecking(false);

    if (hasError) {
      setError(errorObj);
      return;
    }
    setPrevStage(2);
    setStage(3);
  };

  const prevStageHandler = () => {
    setPrevStage(2);
    setStage(1);
  };

  return (
    <StageContainer next={next}>
      <div className={styles.container}>
        <Input
          type="text"
          label="user name"
          id="name"
          value={obj.name}
          onchange={(e) => inputChangeHandler("name", e.target.value)}
          error={error.name?.length > 0}
          errorMsg={t(error.name)}
          placeholder={placeholder}
          onEnterPress={nextStageHandler}
        />

        <Input
          type="text"
          label="user username"
          id="username"
          value={obj.username}
          onchange={(e) => inputChangeHandler("username", e.target.value)}
          error={error.username?.length > 0}
          errorMsg={t(error.username)}
          placeholder="mandatory-placeholder"
          onEnterPress={nextStageHandler}
        />

        <Input
          type="password"
          label="user password"
          id="password"
          value={obj.password}
          onchange={(e) => inputChangeHandler("password", e.target.value)}
          error={error.password?.length > 0}
          errorMsg={t(error.password)}
          placeholder="mandatory-placeholder"
          onEnterPress={nextStageHandler}
        />

        <Input
          type="password"
          label="user password confirm"
          id="passwordConfirm"
          value={obj.passwordConfirm}
          onchange={(e) =>
            inputChangeHandler("passwordConfirm", e.target.value)
          }
          error={error.passwordConfirm?.length > 0}
          errorMsg={t(error.passwordConfirm)}
          placeholder="mandatory-placeholder"
          onEnterPress={nextStageHandler}
        />

        {checking ? (
          <CenterContainer>
            <ReactLoading color={Colors.LIGHT_COLOR} type="cylon" />
          </CenterContainer>
        ) : (
          <SignupStagesActions
            stage={2}
            nextHandler={nextStageHandler}
            prevHandler={prevStageHandler}
          />
        )}
      </div>
    </StageContainer>
  );
};

export default CreateAccountStageTwo;
