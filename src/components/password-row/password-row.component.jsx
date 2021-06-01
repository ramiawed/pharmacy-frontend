import React from "react";

// styles
import styles from "./password-row.module.scss";

function PasswordRow({ labelText, value, onInputChange, field, error }) {
  return (
    <>
      <div className={styles.info_row}>
        <label className={styles.label}>{labelText}</label>
        <div className={styles.value}>
          <input
            type="password"
            value={value}
            onChange={(e) => onInputChange(field, e.target.value)}
          />
        </div>
      </div>
      {error ? <p className={styles.error}>{error}</p> : null}
    </>
  );
}

export default PasswordRow;
