import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";

// redux stuff
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

// files
import store from "./store";
import App from "./App";
import "./i18n/i18n";
import "./index.css";

let persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
