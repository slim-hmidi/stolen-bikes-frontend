import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Root from "./Root";
import ErrorBoundary from "./ErrorBoundary";

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
      main: "#ffea00",
    },
    type: "dark",
  },
});

const Main = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <Root />
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default Main;