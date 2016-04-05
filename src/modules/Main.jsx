import React from 'react';
import {Link} from 'react-router';

class Main extends React.Component {
  render() {
    return <div>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              RUM
            </a>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav nav-pills">
              <li><Link to="/users">Users</Link></li>
              <li><Link to="/performances">Performance</Link></li>
              <li><Link to="/info">Settings</Link></li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container-fluid">
        {this.props.children}
      </div>
    </div>
  }
}

export default Main;