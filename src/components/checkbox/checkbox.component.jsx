import { HiCheck } from "react-icons/hi";

function Checkbox({ check, clickHandler, label, classname, labelClassname }) {
  return (
    <div
      className="flex flex-row items-center gap-1 group"
      onClick={clickHandler}
    >
      <div
        className={`w-4 h-4 bold flex flex-row items-center justify-center rounded-sm 
        group-hover:cursor-pointer ${classname}`}
      >
        {check && <HiCheck />}
      </div>
      <label className={`group-hover:cursor-pointer ${labelClassname}`}>
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
