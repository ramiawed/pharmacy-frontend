import { HiCheck } from "react-icons/hi";

function Checkbox({
  check,
  clickHandler,
  label,
  classname,
  labelClassname,
  isDisable,
}) {
  return (
    <div
      className={`flex flex-row items-center gap-1 group ${
        isDisable ? "cursor-not-allowed" : ""
      }`}
      onClick={() => {
        if (!isDisable) clickHandler();
      }}
    >
      <div
        className={`w-4 h-4 bold flex flex-row items-center justify-center rounded-sm 
        group-hover:cursor-pointer ${classname} ${
          isDisable
            ? "group-hover:cursor-not-allowed"
            : "group-hover:cursor-pointer"
        }`}
      >
        {check && <HiCheck />}
      </div>
      <label
        className={`${
          isDisable
            ? "group-hover:cursor-not-allowed"
            : "group-hover:cursor-pointer"
        } ${labelClassname}`}
      >
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
