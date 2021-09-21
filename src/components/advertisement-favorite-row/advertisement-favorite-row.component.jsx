import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdDelete } from "react-icons/md";
import { VscLoading } from "react-icons/vsc";

// styles
import { Colors } from "../../utils/constants";
import Icon from "../action-icon/action-icon.component";

import generalStyles from "../../style.module.scss";
import rowStyles from "../row.module.scss";

function AdvertisementFavoriteRow({ data, tooltip, action }) {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  return (
    <>
      <div
        className={[rowStyles.container, rowStyles.without_box_shadow].join(
          " "
        )}
      >
        <label className={rowStyles.padding_start}>{data.name}</label>
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
              icon={() => <MdDelete size={24} />}
              foreColor={Colors.FAILED_COLOR}
              onclick={() => {
                setLoading(true);
                action(data._id);
              }}
              tooltip={t(tooltip)}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default AdvertisementFavoriteRow;
