import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListAltIcon from '@material-ui/icons/ListAlt';

const useStyles = makeStyles({
  list: {
    width: 250
  }
});

interface Props {
  open: boolean,
  toggleDrawer: (event: React.KeyboardEvent | React.MouseEvent) => void
}

const DrawerContainer = (props: Props) => {
  const classes = useStyles();
  const { open, toggleDrawer } = props;

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        <ListItem button>
          <ListItemIcon>
            <ListAltIcon />
          </ListItemIcon>
          <ListItemText primary="Reported Cases" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer}>
        {sideList()}
      </Drawer>
    </div>
  );
}

export default DrawerContainer;