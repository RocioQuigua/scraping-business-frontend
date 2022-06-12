import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";

import App from "./scenes/App";
import reportWebVitals from "./reportWebVitals";
import { initStore } from "./store/Store";
import "./sass/main.scss";

export const history = createBrowserHistory();
export const store = initStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
