import React from 'react';
import {render} from 'react-dom';
import {Router, Route, Link, hashHistory} from 'react-router';
import Main from './modules/Main';
import Users from './modules/Users';
import User from './modules/User';
import Performance from './modules/Performance';
import Performances from './modules/Performances';
import Info from './modules/Info';
import 'bootstrap/dist/css/bootstrap.css'

var element = document.createElement("div");

render((
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="users" component={Users}>
        <Route path=":id" component={User}></Route>
      </Route>
      <Route path="performances" component={Performances}>
        <Route path=":id" component={Performance}></Route>
      </Route>
      <Route path="info" component={Info}></Route>
    </Route>
  </Router>
), element);

document.body.appendChild(element);
