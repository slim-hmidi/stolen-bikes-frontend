import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import LogOutIcon from '@material-ui/icons/ExitToApp';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItem from '@material-ui/core/ListItem';
import CloseIcon from '@material-ui/icons/Close';
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
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    notificationsMenu: {
      height: '40%',
      backgroundColor: theme.palette.primary.main
    },
    typograpghy: {
      margin: '0 auto'
    }
  }),
);

interface IProps {
  label: string;
  handleLogout: (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}

interface Notification {
  caseId: string;
  message: string;
}
function LogOut({ handleLogout }: { handleLogout: IProps["handleLogout"] }) {
  return (<IconButton color="inherit" onClick={handleLogout}>
    <LogOutIcon />
  </IconButton>);
}

export default function PrimarySearchAppBar(props: IProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [count, setCount] = useState<number>(0);
  const { label, handleLogout } = props;
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isNotificationsMenuOpen = Boolean(notificationsAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleNotificationsMenuClose = () => {
    setNotificationsAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleNotificationsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setCount(0);
    setNotificationsAnchorEl(event.currentTarget);
  };
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

  const deleteNotification = (id: string) => {
    const filtredNotifications = notifications.filter(n => n.caseId !== id);
    setNotifications(filtredNotifications);
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:9090");
    ws.onmessage = (event: MessageEvent) => {
      setNotifications(n => n.concat(JSON.parse(event.data)))
      setCount((n: number) => n + 1);
    };
  }, [])



  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton color="inherit">
          <Badge badgeContent={notifications.length} color="primary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
    </Menu>
  );

  const notificationsMenuId = 'notifications';
  const renderNotificationsMenu = (
    <Menu
      anchorEl={notificationsAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={notificationsMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isNotificationsMenuOpen}
      onClose={handleNotificationsMenuClose}
      classes={{
        paper: classes.notificationsMenu
      }}
    >
      {notifications.length ? notifications.map((n: Notification, i: number) =>
        (<List>
          <ListItem key={i}>
            <ListItemText primary={n.message} />
            <ListItemSecondaryAction>
              <IconButton onClick={() => deleteNotification(n.caseId)}>
                <CloseIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        ))
        :
        <Typography
          align="center"
          color="secondary">No Notifcations</Typography>
      }

    </Menu>
  );

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
          <div className={classes.sectionDesktop}>
            {label === "user" ?
              <IconButton
                aria-controls={notificationsMenuId}
                onClick={handleNotificationsMenuOpen}
                color="inherit">
                <Badge badgeContent={count} color="primary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              :
              null}
            {renderNotificationsMenu}

            <LogOut handleLogout={handleLogout} />
          </div>
          <div className={classes.sectionMobile}>
            {label === "user" ?
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
              :
              <LogOut handleLogout={handleLogout} />}
          </div>
        </Toolbar>
      </AppBar>
      {label === 'user' ? renderMobileMenu : null}
    </div>
  );
}
