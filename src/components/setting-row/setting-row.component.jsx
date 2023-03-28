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
import Icon from "../icon/icon.component";

// constants
import { Colors } from "../../utils/constants";

// styles
import rowStyles from "../row.module.scss";

function SettingRow({ data, tooltip, action, type }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const isOnline = useSelector(selectOnlineStatus);

  // this variable uses to reset the loading state
  // if the action does not complete
  let timer = useRef();

  // own state
  const [loading, setLoading] = useState(false);

  const removeFromAdvertisementSectionHandler = () => {
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    setLoading(true);
    timer = setTimeout(() => {
      setLoading(false);
    }, 15000);
    action(data._id);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div
        className={[rowStyles.container, rowStyles.without_box_shadow].join(
          " "
        )}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          {type === "item" ? (
            <>
              <LabelValueRow label="item name" value={data.name} />
              <LabelValueRow label="caliber" value={data.caliber} />
              <LabelValueRow label="packing" value={data.packing} />
            </>
          ) : (
            <label style={{ padding: "0 10px" }}>{data.name}</label>
          )}
        </div>

        <div className={rowStyles.padding_end}>
          {loading ? (
            <Icon
              icon={() => <VscLoading className="loading" size={24} />}
              onclick={() => {}}
              foreColor={Colors.FAILED_COLOR}
            />
          ) : (
            <Icon
              icon={() => <RiDeleteBin5Fill size={24} />}
              foreColor={Colors.FAILED_COLOR}
              onclick={removeFromAdvertisementSectionHandler}
              tooltip={t(tooltip)}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default SettingRow;
