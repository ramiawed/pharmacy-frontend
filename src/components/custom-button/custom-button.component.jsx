import { useTheme } from "../../contexts/themeContext";

function CustomButton({
  classname,
  text,
  disabled,
  icon,
  tooltip,
  onClickHandler,
  withAlertIcon,
}) {
  const { theme } = useTheme();
  return (
    <div
      className={`relative rounded-full flex flex-row items-center justify-center gap-2 px-4 py-2 ${
        !disabled ? "hover:px-5" : ""
      }  transition-all ${classname} ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      } group/tooltip`}
      onClick={(e) => {
        if (!disabled) {
          onClickHandler(e);
        }
      }}
    >
      {icon && icon()}
      {text && <p>{text}</p>}
      {tooltip && (
        <p
          className={`hidden min-w-max group-hover/tooltip:block absolute -bottom-7 text-[10px] rounded-full px-2 py-1 ${
            theme === "light" ? "bg-black text-white" : "d-primary500-mixed300"
          }  `}
        >
          {tooltip}
        </p>
      )}

      {withAlertIcon && (
        <div className="absolute top-0 end-0 w-2 h-2 rounded-full bg-red"></div>
      )}
    </div>
  );
}

export default CustomButton;
