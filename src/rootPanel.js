import React from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import updates from "./updates.js";


import '../node_modules/bootstrap-css-only/css/bootstrap.css';


export default class App extends React.Component {
    render() {
      return (
        <BrowserRouter>
          <Switch>
            <Route path="/" component={updates} />
          
          </Switch>
        </BrowserRouter>
      );
    }
  }