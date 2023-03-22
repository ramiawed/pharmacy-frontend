import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import Icon from "../icon/icon.component";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { selectToken } from "../../redux/auth/authSlice";

// icons
import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

// styles
import styles from "./setting-section-header.module.scss";

// constants and utils
import {
  Colors,
  onKeyPressForNumberInput,
  toEnglishNumber,
} from "../../utils/constants";

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
      <div
        className={["flex_center_container"]}
        style={{ justifyContent: "flex-start" }}
      >
        <h3 style={{ color: Colors.FAILED_COLOR, paddingInlineEnd: "12px" }}>
          {header}
        </h3>
        {edit ? (
          <>
            <Icon
              icon={() => <IoCheckmarkDoneCircle size={24} />}
              foreColor={Colors.SUCCEEDED_COLOR}
              onclick={editHandler}
            />
            <Icon
              icon={() => <AiFillCloseCircle size={24} />}
              foreColor={Colors.FAILED_COLOR}
              onclick={closeHandler}
            />
          </>
        ) : (
          <Icon
            icon={() => <AiFillEdit size={24} />}
            foreColor={Colors.MAIN_COLOR}
            onclick={() => {
              setEdit(true);
            }}
            tooltip={t("update-label")}
          />
        )}
      </div>

      <div
        className={["flex_center_container", "fc_light"].join(" ")}
        style={{
          justifyContent: "flex-start",
          padding: "4px 0",
        }}
      >
        <label className={styles.label}>{t("section-title")}</label>
        {edit ? (
          <input
            className={[styles.input, titleError ? styles.error : ""].join(" ")}
            value={titleState}
            onChange={(e) => setTitleState(e.target.value)}
            placeholder={t("section-title-placeholder")}
          />
        ) : (
          <label className={styles.value}>{titleState}</label>
        )}
      </div>

      <div
        className={["flex_center_container", "fc_light"].join(" ")}
        style={{
          justifyContent: "flex-start",
          padding: "4px 0",
        }}
      >
        <label className={styles.label}>{t("section-description")}</label>
        {edit ? (
          <input
            className={[styles.input].join(" ")}
            value={descriptionState}
            onChange={(e) => setDescriptionState(e.target.value)}
            placeholder={t("section-description-placeholder")}
          />
        ) : (
          <label className={styles.value}>{descriptionState}</label>
        )}
      </div>

      <div
        className={["flex_center_container", "fc_light"].join(" ")}
        style={{
          justifyContent: "flex-start",
          padding: "4px 0",
        }}
      >
        <label className={styles.label}>{t("section-order")}</label>
        {edit ? (
          <>
            <input
              value={orderState}
              onKeyPress={onKeyPressForNumberInput}
              onChange={quantityChange}
              className={[styles.input, orderError ? styles.error : ""].join(
                " "
              )}
              placeholder={t("section-order-placeholder")}
            />
          </>
        ) : (
          <label className={styles.value}>{orderState}</label>
        )}
      </div>

      <div
        className={["flex_center_container", "fc_light"].join(" ")}
        style={{
          justifyContent: "flex-start",
        }}
      >
        <input
          type="checkbox"
          value={showState}
          checked={showState}
          disabled={!edit}
          onChange={() => setShowState(!showState)}
        />
        <label className={styles.checkbox_label}>{t(checkboxLabel)}</label>
      </div>
    </>
  );
}

export default SettingSectionHeader;
