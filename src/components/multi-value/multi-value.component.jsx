import React from "react";
import { useTranslation } from "react-i18next";

// components
import Icon from "../icon/icon.component";

// react-icons
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdAddCircle } from "react-icons/md";

// styles
import styles from "./multi-value.module.scss";

// constants
import { Colors, onKeyPressForNumberInput } from "../../utils/constants";

function MultiValue({
  addHandler,
  deleteHandler,
  values,
  changeHandler,
  placeholder,
  quantityLabel,
  bonusLabel,
  afterBonusLabel,
  allowEdit,
}) {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.header}>
        {allowEdit && (
          <div
            style={{
              margin: "0 auto",
            }}
          >
            <Icon
              icon={() => (
                <MdAddCircle size={24} color={Colors.SUCCEEDED_COLOR} />
              )}
              onclick={addHandler}
              tooltip={t("add")}
            />
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
                onChange={(e) =>
                  changeHandler("qty", e.target.value, e.target.id)
                }
                placeholder={placeholder}
                onKeyPress={onKeyPressForNumberInput}
                disabled={!allowEdit}
                type="number"
              />
              {bonusLabel && <label>{bonusLabel}</label>}
            </div>

            {/* bonus value */}
            <div className={styles.input_div} key={value.key}>
              <input
                id={value.key}
                title="bonus"
                value={value.value.bonus}
                onChange={(e) =>
                  changeHandler("bonus", e.target.value, e.target.id)
                }
                placeholder={placeholder}
                disabled={!allowEdit}
                type="number"
              />
              {afterBonusLabel && <label>{afterBonusLabel}</label>}
            </div>

            {allowEdit && (
              <Icon
                icon={() => (
                  <RiDeleteBin5Fill size={24} color={Colors.FAILED_COLOR} />
                )}
                onclick={() => deleteHandler(value.key)}
                tooltip={t("remove")}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default MultiValue;
