import { useTheme } from "../../contexts/themeContext";

// components
import HeaderWithSlogn from "../header-with-slogn/header-with-slogn.component";
import LanguageChanger from "../language-changer/langauge-changer.component";
import ThemeChanger from "../theme-changer/theme-changer.component";

function SignContainer({ children }) {
  const { theme } = useTheme();
  return (
    <div
      className={`flex flex-col min-h-screen ${
        theme === "dark" ? "bg-color-surface-mixed-100" : "bg-white"
      }`}
    >
      <div className="flex flex-row gap-4 p-2">
        <ThemeChanger />
        <LanguageChanger />
      </div>
      <div
        className={`relative w-full min-w-[400px] min-h-screen p-5 flex items-center justify-around  flex-col sm:flex-row ${
          theme === "dark" ? "bg-color-surface-mixed-100" : "bg-white"
        }`}
      >
        {children}
        <HeaderWithSlogn />
      </div>
    </div>
  );
}

export default SignContainer;
