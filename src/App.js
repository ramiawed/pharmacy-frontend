import { useTranslation } from "react-i18next";
import { Route, Switch } from "react-router-dom";
import MainPage from "./pages/main-page/main-page.component";
import SignPage from "./pages/sign-page/sign-page.component";
import styles from "./app.module.scss";

function App() {
  const { t, i18n } = useTranslation();

  document.body.dir = i18n.dir();

  return (
    <div className={styles.main_div}>
      <Switch>
        <Route path="/" exact component={SignPage} />
      </Switch>
    </div>
  );
}

export default App;
