import { Link, useHistory } from "react-router-dom";
import { useTheme } from "../../contexts/themeContext";

function CustomLink({ to, text, onClickHandler, icon }) {
  const history = useHistory();
  const { theme } = useTheme();
  return (
    <Link
      className={`menu-link  ${
        history.location.pathname === to
          ? theme === "light"
            ? "!text-white bg-main"
            : "d-primary500-mixed300"
          : theme === "light"
          ? "border-light_grey border-[1px] hover:bg-main hover:text-white"
          : "bg-color-surface-200 text-color-primary-600 hover:bg-color-primary-500 hover:text-color-surface-mixed-300 "
      }`}
      to={to}
      onClick={onClickHandler}
    >
      {icon && icon()}
      <label className="cursor-pointer">{text}</label>
    </Link>
  );
}

export default CustomLink;
// d-mixed300-primary300
