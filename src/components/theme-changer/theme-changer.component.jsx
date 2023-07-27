import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "../../contexts/themeContext";

function ThemeChanger() {
  const { theme, setTheme } = useTheme();

  function changeThemeHandler(_theme) {
    setTheme(_theme);
    localStorage.setItem("smart-app-current-theme", _theme);
  }

  return (
    <div
      className={`flex w-20 h-10  rounded-full items-stretch justify-stretch relative ${
        theme === "light" ? "bg-white border" : "bg-neutral-700"
      }`}
    >
      <div
        onClick={() => changeThemeHandler("light")}
        className={`flex-1 flex items-center justify-center rounded-full `}
      >
        <MdLightMode size={24} className="text-white" />
      </div>
      <div
        onClick={() => changeThemeHandler("dark")}
        className={`flex-1 flex items-center justify-center rounded-full `}
      >
        <MdDarkMode size={24} className="text-dark" />
      </div>
      <div
        className={`absolute w-10 h-10  rounded-full transition-all flex items-center justify-center ${
          theme === "light"
            ? "start-0 bg-green text-white"
            : "start-1/2 bg-color-primary-300 text-color-surface-200"
        }`}
      >
        {theme === "light" ? (
          <MdLightMode size={24} />
        ) : (
          <MdDarkMode size={24} />
        )}
      </div>
    </div>
  );
}

export default ThemeChanger;
