import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

// icons
import { RiDeleteBin5Fill } from "react-icons/ri";
import { VscLoading } from "react-icons/vsc";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";

// components
import LabelValueRow from "../label-value-row/label-value-row.component";

// constants

// styles
import { useTheme } from "../../contexts/themeContext";
import CustomButton from "../custom-button/custom-button.component";

function SettingRow({ data, tooltip, action, type }) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const isOnline = useSelector(selectOnlineStatus);

  // this variable uses to reset the loading state
  // if the action does not complete
  let timer = useRef();

  // own state

  const removeHandler = () => {
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    action(data._id);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={`p-2 rounded-lg flex flex-row border ${
        theme === "light"
          ? "text-dark border-light_grey"
          : "d-mixed300-primary300 border-color-primary-100"
      }`}
    >
      <div className={`flex-1 flex flex-col items-start justify-start`}>
        {type === "item" ? (
          <>
            <label className="bold text-lg underline">{data.name}</label>
            <label className="text-sm">{data.caliber}</label>
            <label className="text-sm">{data.packing}</label>
          </>
        ) : (
          <label>{data.name}</label>
        )}
      </div>

      <div>
        <CustomButton
          icon={() => <RiDeleteBin5Fill />}
          onClickHandler={removeHandler}
          classname={`${
            theme === "light" ? "bg-red text-white" : "d-primary500-mixed300"
          }`}
        />
      </div>
    </div>
  );
}

export default SettingRow;
