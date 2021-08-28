import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Route, Switch } from "react-router-dom";

import MainPage from "./pages/main-page/main-page.component";
import styles from "./app.module.scss";
import ApprovePage from "./pages/approve-page/approve-page.component";
import SignInPage from "./pages/sign-in-page/sign-in-page.component";
import SignUpPage from "./pages/sign-up-page/sign-up-page.component";
import { useDispatch, useSelector } from "react-redux";
import {
  changeOnlineStatus,
  resetOnlineMsg,
  selectOnlineMsg,
  selectOnlineStatus,
} from "./redux/online/onlineSlice";
import Toast from "./components/toast/toast.component";
import { Colors } from "./utils/constants";

function App() {
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();

  document.body.dir = i18n.dir();

  const onlineMsg = useSelector(selectOnlineMsg);

  const updateOnlineStatus = () => {
    dispatch(changeOnlineStatus(window.navigator.onLine));
  };

  useEffect(() => {
    updateOnlineStatus();

    window.addEventListener("offline", updateOnlineStatus);
    window.addEventListener("online", updateOnlineStatus);

    return () => {
      window.removeEventListener("offline", updateOnlineStatus);
      window.removeEventListener("online", updateOnlineStatus);
    };
  }, []);

  return (
    <div className={styles.main_div}>
      <Switch>
        <Route path="/signin" exact component={SignInPage} />
        <Route path="/signup" exact component={SignUpPage} />
        <Route path="/approve" exact component={ApprovePage} />
        <Route path="/" component={MainPage} />
      </Switch>

      {onlineMsg && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          actionAfterTimeout={() => {
            dispatch(resetOnlineMsg());
          }}
        >
          <p>{t(onlineMsg)}</p>
        </Toast>
      )}
    </div>
  );
}

export default App;
