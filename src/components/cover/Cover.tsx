import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import React from "react";
import CoverProfiles from "./CoverProfiles";

const styles = makeStyles((theme: Theme) => createStyles({
  item: {
    margin: theme.spacing(10),
  }
}))
const Cover = () => {
  const classes = styles();
  return (
    <Grid
      container
      alignContent="center"
      justify="center"
      direction="column"
      spacing={0}
    >
      <Grid item className={classes.item}>
        <Typography align="center" variant="h3" color="secondary">Find My Bike</Typography>
      </Grid>
      <Grid item className={classes.item}>
        <CoverProfiles />
      </Grid>
    </Grid>
  );
};
export default Cover;
