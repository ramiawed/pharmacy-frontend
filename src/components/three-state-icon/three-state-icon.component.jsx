import React from "react";
import { useTranslation } from "react-i18next";
import { VscLoading } from "react-icons/vsc";
import { Colors } from "../../utils/constants";
import Icon from "../action-icon/action-icon.component";

const ThreeStateIcon = ({
  loading,
  id,
  array,
  removeHandler,
  addHandler,
  removeTooltip,
  addTooltip,
  removeIcon,
  addIcon,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {loading ? (
        <Icon
          text={t("")}
          onclick={() => {}}
          foreColor={Colors.MAIN_COLOR}
          icon={() => <VscLoading />}
        />
      ) : array.includes(id) ? (
        <Icon
          text={t(removeTooltip)}
          onclick={removeHandler}
          //   foreColor={Colors.FAILED_COLOR}
          icon={removeIcon}
        />
      ) : (
        <Icon
          text={t(addTooltip)}
          onclick={addHandler}
          //   foreColor={Colors.SUCCEEDED_COLOR}
          icon={addIcon}
        />
      )}
    </>
  );
};

export default ThreeStateIcon;
