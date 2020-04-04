import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';
import HomeIcon from '@material-ui/icons/Home';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import React from 'react';
import { useHistory } from "react-router-dom";
import { CssBaseline } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      transform: "translateZ(0px)",
      flexGrow: 1,
    },
    icon: {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.main
    },
  }),
);

const IconSpeedDial = () => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleHome = () => {
    history.push('/user-menu');
  };

  const handleCase = () => {
    history.push('/report-case');
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <SpeedDial
        ariaLabel="Speed dial Icon"
        classes={{
          fab: classes.icon
        }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        FabProps={{
          color: 'secondary'
        }}
      >
        <SpeedDialAction
          icon={<HomeIcon />}
          tooltipTitle="Home Page"
          className={classes.icon}
          onClick={handleHome}
        />
        <SpeedDialAction
          icon={<CreateIcon />}
          tooltipTitle="New Case"
          className={classes.icon}
          onClick={handleCase}
        />
      </SpeedDial>
    </div>
  );
}

export default IconSpeedDial;
