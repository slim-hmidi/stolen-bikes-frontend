import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import CoverProfiles from "./CoverProfiles";

const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));
const Cover = () => {
  const classes = styles();
  return (
    <div className={classes.root}>
      <Grid
        container
        alignItems="center"
        justify="center"
        direction="row"
        spacing={2}
        style={{ minHeight: "101vh", maxWidth: "100%" }}
      >
        <Grid item>
          <CoverProfiles />
        </Grid>
      </Grid>
    </div>
  );
};
export default Cover;
