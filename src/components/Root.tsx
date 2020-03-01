import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import OfficerMenu from "./officer/Menu";
import UserMenu from "./user/Menu";
import NoMatch from "./NoMatch";

const Root = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path="/user-menu" component={UserMenu} />
        <Route path="/officer-menu" component={OfficerMenu} />
        <Route path='*' component={NoMatch} />
      </Switch>
    </Router>
  )
}

export default Root;