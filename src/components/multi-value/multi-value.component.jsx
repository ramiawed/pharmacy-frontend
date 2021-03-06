import React from "react";
import { useTranslation } from "react-i18next";

// react-icons
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdAddCircle } from "react-icons/md";

// styles
import generalStyles from "../../style.module.scss";
import styles from "./multi-value.module.scss";

// constants
import { onKeyPressForNumberInput } from "../../utils/constants";

function MultiValue({
  addHandler,
  deleteHandler,
  values,
  changeHandler,
  placeholder,
  quantityLabel,
  bonusLabel,
  afterQuantityLabel,
  afterBonusLabel,
  allowEdit,
}) {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.header}>
        {allowEdit && (
          <div
            className={[
              generalStyles.icon,
              generalStyles.fc_green,
              generalStyles.margin_h_auto,
            ].join(" ")}
          >
            <MdAddCircle
              size={36}
              onClick={(e) => {
                addHandler();
                e.stopPropagation();
              }}
            />
            <div className={generalStyles.tooltip}>
              {t("add-offer-tooltip")}
            </div>
          </div>
        )}
      </div>
      <div className={styles.container}>
        {values.map((value) => (
          <div className={styles.row} key={value.key}>
            {/* quantity value */}
            <div className={styles.input_div}>
              {quantityLabel && <label>{quantityLabel}</label>}
              <input
                id={value.key}
                title="qty"
                value={value.value.qty}
                onChange={(e) => changeHandler(e)}
                placeholder={placeholder}
                onKeyPress={onKeyPressForNumberInput}
                disabled={!allowEdit}
              />
              {afterQuantityLabel && <label>{afterQuantityLabel}</label>}
            </div>

            {/* bonus value */}
            <div className={styles.input_div} key={value.key}>
              {bonusLabel && <label>{bonusLabel}</label>}

              <input
                id={value.key}
                title="bonus"
                value={value.value.bonus}
                onChange={(e) => changeHandler(e)}
                placeholder={placeholder}
                disabled={!allowEdit}
              />

              {afterBonusLabel && <label>{afterBonusLabel}</label>}
            </div>

            {allowEdit && (
              <div
                className={[generalStyles.icon, generalStyles.fc_red].join(" ")}
              >
                <RiDeleteBin5Fill
                  size={24}
                  onClick={() => deleteHandler(value.key)}
                />
                <div className={generalStyles.tooltip}>
                  {t("remove-offer-tooltip")}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default MultiValue;
