import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from "@material-ui/core/Typography";


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
        <div>
          <CssBaseline />
          <Typography
            variant="h1"
            align="center"
            color="secondary">
            Something went wrong.
          </Typography>
        </div>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;