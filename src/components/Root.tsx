import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import App from "./App";
import OfficerMenu from "./officer/Menu";
import UserMenu from "./user/Menu";
import ReportCase from "../containers/user/ReportCase";
import ReportCaseList from "../containers/user/ReportCaseList";
import NoMatch from "./NoMatch";
import history from "../history/history";

const Root = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path="/user-menu" component={UserMenu} />
        <Route path="/officer-menu" component={OfficerMenu} />
        <Route path="/report-case" component={ReportCase} />
        <Route path="/report-case-list" component={ReportCaseList} />
        <Route path='*' component={NoMatch} />
      </Switch>
    </Router>
  )
}

export default Root;