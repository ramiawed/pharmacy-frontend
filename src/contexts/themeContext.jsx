const { createContext, useContext, useState } = require("react");

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const currentThemeFromLocalStorage = localStorage.getItem(
    "smart-app-current-theme"
  );

  const [theme, setTheme] = useState(
    currentThemeFromLocalStorage ? currentThemeFromLocalStorage : "light"
  );

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
