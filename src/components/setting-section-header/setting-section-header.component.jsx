import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import CustomButton from "../custom-button/custom-button.component";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { selectToken } from "../../redux/auth/authSlice";

// icons
import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

// constants and utils
import {
  onKeyPressForNumberInput,
  toEnglishNumber,
} from "../../utils/constants";

// context
import { useTheme } from "../../contexts/themeContext";
import Checkbox from "../checkbox/checkbox.component";

function SettingSectionHeader({
  show,
  title,
  description,
  order,
  header,
  checkboxLabel,
  updateAction,
  field,
}) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  // own states
  const [edit, setEdit] = useState(false);
  const [showState, setShowState] = useState(show);
  const [titleState, setTitleState] = useState(title);
  const [titleError, setTitleError] = useState(false);
  const [descriptionState, setDescriptionState] = useState(description);
  const [orderState, setOrderState] = useState(order);
  const [orderError, setOrderError] = useState(false);

  const closeHandler = () => {
    setShowState(show);
    setTitleState(title);
    setDescriptionState(description);
    setOrderState(order);

    setTitleError(false);
    setOrderError(false);

    setEdit(false);
  };

  const editHandler = () => {
    let error = false;
    if (titleState.trim().length === 0) {
      setTitleError(true);
      error = true;
    }

    if (orderState < 1 || orderState > 7) {
      setOrderError(true);
      error = true;
    }

    if (error) {
      return;
    }

    dispatch(
      updateAction({
        token,
        obj: {
          [`${field}`]: {
            title: titleState,
            description: descriptionState,
            order: orderState,
            show: showState,
          },
        },
      })
    )
      .then(unwrapResult)
      .then(() => {
        setEdit(false);
      });
  };

  const quantityChange = (e) => {
    const value = Number.parseInt(toEnglishNumber(e.target.value));
    setOrderState(isNaN(value) ? "" : value);
  };

  return (
    <>
      <div className="flex flex-row items-center gap-1 m-2 mt-4">
        <div className="flex flex-row items-center justify-center gap-2 mx-auto my-2">
          <p
            className={`${
              theme === "light" ? "text-dark" : "text-color-primary-600"
            } text-lg bold`}
          >
            {header}
          </p>
          {edit ? (
            <>
              <CustomButton
                icon={() => <IoCheckmarkDoneCircle />}
                onClickHandler={editHandler}
                classname={`${
                  theme === "light"
                    ? "bg-green text-white"
                    : "d-primary500-mixed300"
                }`}
              />

              <CustomButton
                icon={() => <AiFillCloseCircle />}
                onClickHandler={closeHandler}
                classname={`${
                  theme === "light"
                    ? "bg-red text-white"
                    : "d-primary500-mixed300"
                }`}
              />
            </>
          ) : (
            <CustomButton
              icon={() => <AiFillEdit />}
              onClickHandler={() => setEdit(true)}
              classname={`${
                theme === "light"
                  ? "bg-dark text-white"
                  : "d-primary500-mixed300"
              }`}
              tooltip={t("update")}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div
          className={`w-[95%] mx-auto flex items-center justify-start rounded-lg overflow-hidden border ${
            theme === "light"
              ? "border-light_grey"
              : "border-color-surface-mixed-300"
          } ${titleError ? "!border-red" : ""}`}
        >
          <label
            className={`w-[100px] p-1 text-sm ps-2 ${
              theme === "light" ? "bg-dark text-white" : "d-mixed300-primary300"
            }`}
          >
            {t("title")}
          </label>
          {edit ? (
            <input
              className={`${
                theme === "light" ? "text-dark" : "text-color-primary-500"
              } ps-2 border-none outline-none flex-1 bg-transparent`}
              // className={[styles.input, titleError ? styles.error : ""].join(
              //   " "
              // )}
              value={titleState}
              onChange={(e) => setTitleState(e.target.value)}
              placeholder={t("title")}
            />
          ) : (
            <label
              className={`ps-1 ${
                theme === "light" ? "text-dark" : "text-color-primary-500"
              }`}
            >
              {titleState}
            </label>
          )}
        </div>

        <div
          className={`w-[95%] mx-auto flex items-center justify-start rounded-lg overflow-hidden border ${
            theme === "light"
              ? "border-light_grey"
              : "border-color-surface-mixed-300"
          } `}
        >
          <label
            className={`w-[100px] p-1 text-sm ps-2 ${
              theme === "light" ? "bg-dark text-white" : "d-mixed300-primary300"
            }`}
          >
            {t("section description")}
          </label>
          {edit ? (
            <input
              className={`${
                theme === "light" ? "text-dark" : "text-color-primary-500"
              } ps-2 border-none outline-none flex-1 bg-transparent`}
              value={descriptionState}
              onChange={(e) => setDescriptionState(e.target.value)}
              placeholder={t("section description")}
            />
          ) : (
            <label
              className={`ps-1 ${
                theme === "light" ? "text-dark" : "text-color-primary-500"
              }`}
            >
              {descriptionState}
            </label>
          )}
        </div>

        <div
          className={`w-[95%] mx-auto flex items-center justify-start rounded-lg overflow-hidden border ${
            theme === "light"
              ? "border-light_grey"
              : "border-color-surface-mixed-300"
          } ${orderError ? "!border-red" : ""}`}
        >
          <label
            className={`w-[100px] p-1 text-sm ps-2 ${
              theme === "light" ? "bg-dark text-white" : "d-mixed300-primary300"
            }`}
          >
            {t("section order")}
          </label>
          {edit ? (
            <>
              <input
                value={orderState}
                onKeyPress={onKeyPressForNumberInput}
                onChange={quantityChange}
                className={`${
                  theme === "light" ? "text-dark" : "text-color-primary-500"
                } ps-2 border-none outline-none flex-1 bg-transparent`}
                placeholder={t("section order")}
              />
            </>
          ) : (
            <label
              className={`ps-1 ${
                theme === "light" ? "text-dark" : "text-color-primary-500"
              }`}
            >
              {orderState}
            </label>
          )}
        </div>

        <div className={`w-[95%] mx-auto flex items-center justify-start`}>
          <Checkbox
            isDisable={!edit}
            check={showState}
            clickHandler={() => setShowState(!showState)}
            label={t(checkboxLabel)}
            classname={`${
              theme === "light" ? "bg-dark text-white" : "d-mixed300-primary300"
            }`}
            labelClassname={`${
              theme === "light" ? "text-dark" : "text-color-primary-300"
            }`}
          />
        </div>
      </div>
    </>
  );
}

export default SettingSectionHeader;
