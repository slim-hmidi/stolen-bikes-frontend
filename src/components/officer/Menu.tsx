import React from "react";
import { useHistory } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "../../common/AppBar";
import ResolvedCasesList from "../../containers/officer/ResolvedCases";
import AffectedCasesList from "../../containers/officer/AffectedCases";
import ExpansionPanel from "../../common/ExpansionPanel";






const UserMenu = () => {
  const history = useHistory();
  const handleLogout = () => {
    history.push('/')
  }
  return (
    <div>
      <CssBaseline />
      <AppBar label="officer" handleLogout={handleLogout} />
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