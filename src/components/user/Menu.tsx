import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AppBar from "../../common/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import './styles.css';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

const styles = makeStyles((theme: Theme) => createStyles({
  item: {
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down(600)]: {
      fontSize: '80%'
    },
    [theme.breakpoints.down(500)]: {
      fontSize: '60%'
    },
    [theme.breakpoints.down(400)]: {
      fontSize: '50%'
    }
  },
  button: {
    [theme.breakpoints.down(600)]: {
      fontSize: '100%'
    },
    [theme.breakpoints.down(500)]: {
      fontSize: '100%'
    },
    [theme.breakpoints.down(400)]: {
      fontSize: '100%'
    }
  }
}))

const UserMenu = () => {
  const history = useHistory();
  const [hiddenButton, setHiddenButton] = useState(true);
  const classes = styles();

  const handleLogout = () => {
    history.push('/')
  }
  const handleAnimationEnd = () => setHiddenButton(false);
  const handleReportCase = () => {
    history.push('/report-case');
  }
  return (
    <div>
      <CssBaseline />
      <AppBar label="user" handleLogout={handleLogout} />
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{
          flexWrap: 'nowrap',
          height: "50vh"
        }}>
        <Grid
          item
          className={classes.item}>
          <h1 className="welcome-msg" onAnimationEnd={handleAnimationEnd}>Welcome to user homepage</h1>
        </Grid>
        <Grid
          item
          className={classes.item}>
          {
            !!hiddenButton ? null
              :
              <Button
                variant="contained"
                color="secondary"
                onClick={handleReportCase}
                className={classes.button}
              >Report Case</Button>
          }
        </Grid>
      </Grid>
    </div>
  )
}
export default UserMenu;