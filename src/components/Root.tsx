import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import NoMatch from "./NoMatch";

const Root = () => {
  return (
    <Router >
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='*' component={NoMatch} />
      </Switch>
    </Router>
  )
}

export default Root;