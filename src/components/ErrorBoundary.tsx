import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";


class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{
            height: "50vh"
          }}>
          <CssBaseline />
          <Typography
            variant="h1"
            color="secondary">
            Something went wrong.
          </Typography>
        </Grid>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;