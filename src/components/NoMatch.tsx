import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from "@material-ui/core/Typography";
import { useLocation } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

const styles = makeStyles({
  root: {
    height: "100vh",
  },
  item: {
    maxHeight: '20%'
  }
})

const NoMatch = () => {
  const classes = styles();
  const location = useLocation();

  return (
    <Grid container
      direction="column"
      alignItems="center"
      justify="center"
      className={classes.root}>
      <CssBaseline />
      <Grid item xs={3} className={classes.item}>
        <Typography variant="h3" color="secondary" >
          Sorry!!
      </Typography>
      </Grid>
      <Grid item xs={3} md={6}>
        <Typography variant="h3" color="secondary" >
          No match for <code>{location.pathname}</code>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default NoMatch;