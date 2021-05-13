import { useTranslation } from "react-i18next";

function App() {
  const { t, i18n } = useTranslation();

  document.body.dir = i18n.dir();

  return (
    <div>
      <p>{t("pharmacy")}</p>
    </div>
  );
}

export default App;
