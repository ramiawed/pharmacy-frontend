import { useTranslation } from "react-i18next";
import { Route, Switch } from "react-router-dom";
import MainPage from "./pages/main-page/main-page.component";
import styles from "./app.module.scss";
import ApprovePage from "./pages/approve-page/approve-page.component";
import SignInPage from "./pages/sign-in-page/sign-in-page.component";
import SignUpPage from "./pages/sign-up-page/sign-up-page.component";

function App() {
  const { i18n } = useTranslation();

  document.body.dir = i18n.dir();

  return (
    <div className={styles.main_div}>
      <Switch>
        <Route path="/signin" exact component={SignInPage} />
        <Route path="/signup" exact component={SignUpPage} />
        <Route path="/approve" exact component={ApprovePage} />
        <Route path="/" component={MainPage} />
      </Switch>
    </div>
  );
}

export default App;
