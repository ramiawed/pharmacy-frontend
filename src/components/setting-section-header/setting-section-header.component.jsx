import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import Icon from "../action-icon/action-icon.component";

// icons
import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

// styles
import generalStyles from "../../style.module.scss";
import styles from "./setting-section-header.module.scss";

// constants and utils
import { Colors } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { selectToken } from "../../redux/auth/authSlice";

function SettingSectionHeader({
  show,
  title,
  description,
  order,
  header,
  titleRight,
  checkboxLabel,
  updateAction,
  field,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const [edit, setEdit] = useState(false);

  const [showState, setShowState] = useState(show);
  const [titleRightState, setTitleRightState] = useState(titleRight);
  const [titleState, setTitleState] = useState(title);
  const [titleError, setTitleError] = useState(false);
  const [descriptionState, setDescriptionState] = useState(description);
  const [orderState, setOrderState] = useState(order);
  const [orderError, setOrderError] = useState(false);

  const closeHandler = () => {
    setShowState(show);
    setTitleRightState(titleRight);
    setTitleState(title);
    setDescriptionState(description);
    setOrderState(order);

    setTitleError(false);
    // setDescriptionError(false);
    setOrderError(false);

    setEdit(false);
  };

  const editHandler = () => {
    let error = false;
    if (titleState.trim().length === 0) {
      setTitleError(true);
      error = true;
    }

    // if (descriptionState.trim().length === 0) {
    //   setDescriptionError(true);
    //   error = true;
    // }

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
            titleRight: titleRightState,
          },
        },
      })
    )
      .then(unwrapResult)
      .then(() => {
        setEdit(false);
      });

    // setEdit(false);
  };
  return (
    <>
      <div
        className={[generalStyles.flex_center_container]}
        style={{ justifyContent: "start" }}
      >
        <h3 style={{ color: Colors.FAILED_COLOR, paddingInlineEnd: "12px" }}>
          {header}
        </h3>
        {edit ? (
          <>
            <Icon
              icon={() => <IoCheckmarkDoneCircle size={20} />}
              foreColor={Colors.SUCCEEDED_COLOR}
              onclick={editHandler}
            />
            <Icon
              icon={() => <AiFillCloseCircle size={20} />}
              foreColor={Colors.FAILED_COLOR}
              onclick={closeHandler}
            />
          </>
        ) : (
          <Icon
            icon={() => <AiFillEdit size={20} />}
            foreColor={Colors.SECONDARY_COLOR}
            onclick={() => {
              setEdit(true);
            }}
            tooltip={t("update-label")}
          />
        )}
      </div>

      <div
        className={[
          generalStyles.flex_center_container,
          generalStyles.fc_secondary,
          generalStyles.padding_v_4,
        ].join(" ")}
        style={{
          justifyContent: "start",
        }}
      >
        <label style={{ minWidth: "100px" }}>عنوان القسم</label>
        {edit ? (
          <input
            className={[styles.input, titleError ? styles.error : ""].join(" ")}
            value={titleState}
            onChange={(e) => setTitleState(e.target.value)}
            placeholder="ادخل عنوان القسم"
          />
        ) : (
          <label>{titleState}</label>
        )}
      </div>

      <div
        className={[
          generalStyles.flex_center_container,
          generalStyles.fc_secondary,
          generalStyles.padding_v_4,
        ].join(" ")}
        style={{
          justifyContent: "start",
        }}
      >
        <label style={{ minWidth: "100px" }}>وصف القسم</label>
        {edit ? (
          <input
            className={[styles.input].join(" ")}
            value={descriptionState}
            onChange={(e) => setDescriptionState(e.target.value)}
            placeholder="ادخل وصف القسم"
          />
        ) : (
          <label>{descriptionState}</label>
        )}
      </div>

      <div
        className={[
          generalStyles.flex_center_container,
          generalStyles.fc_secondary,
          generalStyles.padding_v_4,
        ].join(" ")}
        style={{
          justifyContent: "start",
        }}
      >
        <label style={{ minWidth: "100px" }}>ترتيب القسم</label>
        {edit ? (
          <input
            type="number"
            value={orderState}
            className={[styles.input, orderError ? styles.error : ""].join(" ")}
            onChange={(e) => setOrderState(e.target.value * 1)}
            min="1"
            max="7"
            placeholder="ادخل ترتيب القسم بين ١ و ٧"
          />
        ) : (
          <label>{orderState}</label>
        )}
      </div>

      <div
        className={[
          generalStyles.flex_center_container,
          generalStyles.fc_secondary,
        ].join(" ")}
        style={{
          justifyContent: "start",
        }}
      >
        <input
          type="checkbox"
          value={showState}
          checked={showState}
          disabled={!edit}
          onChange={() => setShowState(!showState)}
        />
        <label style={{ padding: "0 10px" }}>{t(checkboxLabel)}</label>
      </div>

      <div
        className={[
          generalStyles.flex_center_container,
          generalStyles.fc_secondary,
        ].join(" ")}
        style={{
          justifyContent: "start",
        }}
      >
        <input
          type="checkbox"
          value={titleRightState}
          checked={titleRightState}
          disabled={!edit}
          onChange={() => setTitleRightState(!titleRightState)}
        />
        <label style={{ padding: "0 10px" }}>
          قسم العناوين موجود محاذاة طرف اليمين
        </label>
      </div>
    </>
  );
}

export default SettingSectionHeader;
