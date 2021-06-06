import React from "react";

// react-icons
import { MdAddCircle, MdDelete } from "react-icons/md";

// styles
import styles from "./multi-value.module.scss";

function MultiValue({
  header,
  addHandler,
  deleteHandler,
  values,
  changeHandler,
  placeholder,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {/* <p>{header}</p> */}

        <MdAddCircle
          className={styles.add_icon}
          size={24}
          onClick={addHandler}
        />
      </div>
      {values.map((value, index) => (
        <div className={styles.input_div} key={value.key}>
          <input
            id={value.key}
            value={value.value}
            onChange={(e) => changeHandler(e)}
            placeholder={placeholder}
          />

          <MdDelete
            size={20}
            className={styles.delete_icon}
            onClick={() => deleteHandler(value.key)}
          />
        </div>
      ))}
    </div>
  );
}

export default MultiValue;
