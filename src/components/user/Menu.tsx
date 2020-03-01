import React from "react";
import { useHistory } from "react-router-dom";
import AppBar from "../../common/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import './styles.css';
import Grid from "@material-ui/core/Grid";



const UserMenu = () => {
  const history = useHistory();
  const handleLogout = () => {
    history.push('/')
  }
  return (
    <div>
      <CssBaseline />
      <AppBar label="user" handleLogout={handleLogout} />
      <Grid container alignItems="center" justify="center" style={{ height: "50vh" }}>
        <div className="typewriter">
          <h1>Welcome to user homepage</h1>
        </div>
      </Grid>
    </div>
  )
}
export default UserMenu;