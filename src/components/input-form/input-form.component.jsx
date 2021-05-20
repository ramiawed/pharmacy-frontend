// styles
import styles from "./input-form.module.scss";

const InputForm = ({ handleChange, label, error, width, ...otherProps }) => {
  return (
    <div className={styles.input_container}>
      <input
        className={`${
          error?.length > 0 ? styles.input_error : styles.input_normal
        }`}
        onChange={handleChange}
        {...otherProps}
      />
      {label ? (
        <label
          className={`${otherProps.value.length ? styles.shrink : ""} ${
            styles.input_label
          }`}
        >
          {label}
        </label>
      ) : null}

      {/* {error ? <p className={styles.input_form_error}>{error}</p> : null} */}
    </div>
  );
};

export default InputForm;
