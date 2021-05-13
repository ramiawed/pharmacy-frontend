import logo from "./logo.svg";
import "./App.css";
import { useTranslation } from "react-i18next";

function App() {
  const { t, i18n } = useTranslation();

  document.body.dir = i18n.dir();

  return (
    <div>
      <p>Pharmacy</p>
    </div>
  );
}

export default App;
