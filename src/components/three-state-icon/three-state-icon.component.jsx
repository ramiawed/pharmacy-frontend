import React from "react";
import { useTranslation } from "react-i18next";

// components
import Icon from "../icon/icon.component";

// icons
import { VscLoading } from "react-icons/vsc";

// constants
import { Colors } from "../../utils/constants";

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
          tooltip={t("")}
          onclick={() => {}}
          foreColor={Colors.MAIN_COLOR}
          icon={() => <VscLoading />}
        />
      ) : array.includes(id) ? (
        <Icon
          tooltip={t(removeTooltip)}
          onclick={removeHandler}
          icon={removeIcon}
        />
      ) : (
        <Icon tooltip={t(addTooltip)} onclick={addHandler} icon={addIcon} />
      )}
    </>
  );
};

export default ThreeStateIcon;
