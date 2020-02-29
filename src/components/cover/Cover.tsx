import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import React from "react";
import CoverProfiles from "./CoverProfiles";

const styles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  item: {
    margin: theme.spacing(12),
  }
}))
const Cover = () => {
  const classes = styles();
  return (
    <div className={classes.root}>
      <Grid
        container
        alignContent="center"
        justify="center"
        direction="column"
        spacing={0}
        style={{ height: '80vh' }}
      >
        <Grid item className={classes.item}>
          <Typography align="center" variant="h3" color="secondary">Find My Bike</Typography>
        </Grid>
        <Grid item>
          <CoverProfiles />
        </Grid>
      </Grid>
    </div>
  );
};
export default Cover;
