/*eslint-disable import/default */

import "./styles/styles.css";
import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import { Router, browserHistory } from "react-router";
import { Provider } from "react-redux";
import routes from "./routes";
import configureStore from "./store/configureStore";
import {loadConfig} from "./actions/configActions";

const store = configureStore();
store.dispatch(loadConfig());

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById("app")
);
