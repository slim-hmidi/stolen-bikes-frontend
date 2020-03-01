import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import React from "react";
import SimpleCard from "../../common/card/Card";
import { ReactComponent as OfficerIcon } from "../../icons/officer.svg";
import { ReactComponent as UserIcon } from "../../icons/user.svg";
import ToolTip from "@material-ui/core/Tooltip";
import { useHistory } from "react-router-dom";

const styles = makeStyles((theme) => ({
  item: {
    display: "block",
    margin: "0 auto",
  },
  cardItem: {
    flexBasis: 'min-content',
    padding: '8px'
  },
  wrapper: {
    borderWidth: '2px',
    borderStyle: 'solid',
    borderRadius: '5px 20px 5px',
    borderColor: theme.palette.secondary.main,
  }
}));
const CoverProfiles = () => {
  const history = useHistory();
  const classes = styles();

  const handleClick = (name: string) => {
    if (name === "user") {
      return history.push('/user-menu');
    }
    return history.push('/officer-menu')
  }
  return (
    <Grid container direction="row" justify="center" alignItems="center" className={classes.wrapper}>
      <CssBaseline />
      <Grid item className={classes.cardItem}>
        <SimpleCard handleClick={() => handleClick("user")}>
          <ToolTip title="User Profile" placement="left-end">
            <UserIcon />
          </ToolTip>
        </SimpleCard>
      </Grid>
      <Grid item className={classes.cardItem}>
        <SimpleCard handleClick={() => handleClick("officer")}>
          <ToolTip title="Officer Profile" placement="right-end">
            <OfficerIcon />
          </ToolTip>
        </SimpleCard>
      </Grid>
    </Grid>
  );
};
export default CoverProfiles;
