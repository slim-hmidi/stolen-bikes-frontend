import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

const theme = createMuiTheme({
  palette: {
    background: {
      paper: "#000000"
    },
    primary: {
      dark: "#111010",
      main: "#111010",
    },
    secondary: {
      main: "#ffea00",
    },
    type: "dark",
  },
});

ReactDOM.render(<ThemeProvider theme={theme}><App /></ThemeProvider>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
