import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import LogOutIcon from '@material-ui/icons/ExitToApp';
import Drawer from "./Drawer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
  }),
);

interface IProps {
  label: string;
  handleLogout: (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}

function LogOut({ handleLogout }: { handleLogout: IProps["handleLogout"] }) {
  return (<IconButton color="inherit" onClick={handleLogout}>
    <LogOutIcon />
  </IconButton>);
}

export default function PrimarySearchAppBar(props: IProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { label, handleLogout } = props;

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true)
  }


  return (
    <div className={classes.grow}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          {label === "user" ?
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            :
            null
          }
          <Drawer open={open} toggleDrawer={toggleDrawer} />
          <Typography className={classes.title} variant="h6" noWrap>
            Find MyBike
          </Typography>
          <div className={classes.grow} />
          <LogOut handleLogout={handleLogout} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
