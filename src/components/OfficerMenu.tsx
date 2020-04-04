import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useSelector, shallowEqual } from "react-redux";
import AppBar from "../common/AppBar";
import ResolvedCasesList from "../features/resolvedCases/ResolvedCases";
import AffectedCasesList from "../features/affectedCases/AffectedCases";
import ExpansionPanel from "../common/ExpansionPanel";
import { AppState } from "../app/rootReducer";
import SnackBar from "../common/SnackBar";






const UserMenu = () => {
  const history = useHistory();
  const { error } = useSelector((state: AppState) => state.affectedCases || state.resolvedCases, shallowEqual);
  const [open, setOpen] = useState(!!error);
  useEffect(() => {
    setOpen(!!error);

  }, [error]);

  const handleLogout = () => {
    history.push('/')
  }

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <CssBaseline />
      <AppBar label="officer" handleLogout={handleLogout} />
      <SnackBar
        open={open}
        handleClose={handleClose}
        severity="error"
        textMessage={error}
        anchorOrigin={
          {
            vertical: 'bottom',
            horizontal: 'left'
          }} />
      <ExpansionPanel title='Affected Cases'>
        <AffectedCasesList />
      </ExpansionPanel>
      <ExpansionPanel title='Resolved Cases'>
        <ResolvedCasesList />
      </ExpansionPanel>
    </div>
  )
}
export default UserMenu;