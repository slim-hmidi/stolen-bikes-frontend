import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Root from "./Root";
import ErrorBoundary from "../components/ErrorBoundary";

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#000000"
    },
    primary: {
      dark: "#111010",
      main: "#111010",
    },
    secondary: {
      main: "#ffd600",
    },
    type: "dark",
  },
});

const Main = () => {
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <Root />
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default Main;