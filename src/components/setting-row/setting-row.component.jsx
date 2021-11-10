import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { VscLoading } from "react-icons/vsc";

// styles
import { Colors } from "../../utils/constants";
import Icon from "../action-icon/action-icon.component";

import generalStyles from "../../style.module.scss";
import rowStyles from "../row.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";

function SettingRow({ data, tooltip, action, type }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isOnline = useSelector(selectOnlineStatus);
  let timer = useRef();

  const [loading, setLoading] = useState(false);

  const removeFromFavorites = () => {
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
        <label
          style={{ flex: 3, textAlign: "start" }}
          className={rowStyles.padding_start}
        >
          {data.name}
        </label>
        {type === "item" && (
          <>
            <label style={{ flex: 1 }}>{data.caliber}</label>
            <label style={{ flex: 1 }}>{data.packing}</label>
          </>
        )}
        <div className={rowStyles.padding_end}>
          {loading ? (
            <Icon
              icon={() => (
                <VscLoading className={generalStyles.loading} size={24} />
              )}
              onclick={() => {}}
              foreColor={Colors.FAILED_COLOR}
            />
          ) : (
            <Icon
              icon={() => <RiDeleteBin5Fill size={24} />}
              foreColor={Colors.FAILED_COLOR}
              onclick={removeFromFavorites}
              tooltip={t(tooltip)}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default SettingRow;
