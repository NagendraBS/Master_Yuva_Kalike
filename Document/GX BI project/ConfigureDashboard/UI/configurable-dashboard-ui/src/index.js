import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./container/App";
import reportWebVitals from "./reportWebVitals";
import configureStore from "./utils/configureStore";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundaries from "./components/ErrorBoundaries";
import { FontFamilyProvider } from "./components/FontFamilyContext";
const store = configureStore();

const root = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ErrorBoundaries>
        <FontFamilyProvider>
        <App />
        </FontFamilyProvider>
      </ErrorBoundaries>
    </BrowserRouter>
  </Provider>,
  root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
