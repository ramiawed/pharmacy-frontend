import React from "react";

// react-icons
import { MdAddCircle, MdDelete } from "react-icons/md";

// styles
import styles from "./multi-value.module.scss";

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
}) {
  return (
    <>
      <div className={styles.header}>
        <MdAddCircle
          className={styles.add_icon}
          size={36}
          onClick={addHandler}
        />
      </div>
      <div className={styles.container}>
        {values.map((value) => (
          <div className={styles.row} key={value.key}>
            {/* quantity value */}
            <div className={styles.input_div}>
              {quantityLabel && <label>{quantityLabel}</label>}
              <input
                type="number"
                id={value.key}
                title="qty"
                value={value.value.qty}
                onChange={(e) => changeHandler(e)}
                placeholder={placeholder}
                min={0}
              />
              {afterQuantityLabel && <label>{afterQuantityLabel}</label>}
            </div>

            {/* bonus value */}
            <div className={styles.input_div} key={value.key}>
              {bonusLabel && <label>{bonusLabel}</label>}

              <input
                type="number"
                id={value.key}
                title="bonus"
                value={value.value.bonus}
                onChange={(e) => changeHandler(e)}
                placeholder={placeholder}
                min={0}
              />

              {afterBonusLabel && <label>{afterBonusLabel}</label>}
            </div>
            <MdDelete
              size={20}
              className={styles.delete_icon}
              onClick={() => deleteHandler(value.key)}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default MultiValue;
