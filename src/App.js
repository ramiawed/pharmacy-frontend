import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Route, Switch } from "react-router-dom";

// components
import ApprovePage from "./pages/approve-page/approve-page.component";
import SignInPage from "./pages/sign-in-page/sign-in-page.component";
import SignUpPage from "./pages/sign-up-page/sign-up-page.component";
import MainPage from "./pages/main-page/main-page.component";
import Toast from "./components/toast/toast.component";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import {
  changeOnlineStatus,
  resetOnlineMsg,
  selectOnlineMsg,
} from "./redux/online/onlineSlice";

// constants
import { Colors } from "./utils/constants";

// context
import { ThemeProvider } from "./contexts/themeContext";

function App() {
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();

  document.body.dir = i18n.dir();

  const onlineMsg = useSelector(selectOnlineMsg);

  useEffect(() => {
    const updateOnlineStatus = () => {
      dispatch(changeOnlineStatus(window.navigator.onLine));
    };

    updateOnlineStatus();

    window.addEventListener("offline", updateOnlineStatus);
    window.addEventListener("online", updateOnlineStatus);

    return () => {
      window.removeEventListener("offline", updateOnlineStatus);
      window.removeEventListener("online", updateOnlineStatus);
    };
  }, [dispatch]);

  return (
    <ThemeProvider>
      <div>
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
    </ThemeProvider>
  );
}

export default App;
