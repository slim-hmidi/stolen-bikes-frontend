import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import App from "./App";
import OfficerMenu from "../components/OfficerMenu";
import UserMenu from "../components/UserMenu";
import ReportCase from "../features/reportedCases/ReportCase";
import ReportedCases from "../features/reportedCases/ReportedCases";
import NoMatch from "../components/NoMatch";
import history from "../history/history";

const Root = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path="/user-menu" component={UserMenu} />
        <Route path="/officer-menu" component={OfficerMenu} />
        <Route path="/report-case" component={ReportCase} />
        <Route path="/report-case-list" component={ReportedCases} />
        <Route path='*' component={NoMatch} />
      </Switch>
    </Router>
  )
}

export default Root;