import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

const render = () => {
  const Main = require("./app/Main").default;
  ReactDOM.render(
    <Provider store={store}>
      <Main />
    </Provider>,
    document.getElementById("root"));
}

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./app/Main', render);
}



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
