import React from "react";
import { useHistory } from "react-router-dom";
import AppBar from "../../common/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";


const UserMenu = () => {
  const history = useHistory();
  const handleLogout = () => {
    history.push('/')
  }
  return (
    <div>
      <CssBaseline />
      <AppBar label="officer" handleLogout={handleLogout} />
    </div>
  )
}
export default UserMenu;