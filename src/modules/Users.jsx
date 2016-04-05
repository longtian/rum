import React from 'react';
import Wilddog from 'wilddog/lib/wilddog-web';
import {Link} from 'react-router';
class Users extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    let ref = this.ref = new Wilddog(`${WILDDOG_APP}/users`);
    ref.limitToLast(20).on('value', snapshot=> {
      let users = [];
      snapshot.forEach(i=> {
        users.push(i.key())
      });
      this.setState({
        users
      });
    });
  }

  remove() {
    this.ref.remove();
  }

  reload() {
    this.sendCommand('window.location.reload();')
  }

  sendCommand(cmd) {
    this.ref.root().child('cmd').set({
      cmd,
      timestamp: Wilddog.ServerValue.TIMESTAMP
    });
  }

  handleSend() {
    this.sendCommand(this.refs.command.value)
  }

  render() {
    return <div className="row">
      <div className="col-lg-3">
        <div className="panel panel-default">
          <div className="panel-heading">
            <i className="glyphicon glyphicon-cog"></i> Control
          </div>
          <div className="panel-body">

            <div>
              <textarea style={{width:"100%"}} ref="command" className="form-control"></textarea>
              <div className="btn-group">
                <button className="btn btn-primary" onClick={this.handleSend.bind(this)}>
                  <i className="glyphicon glyphicon-play"></i>Send
                </button>
                <button className="btn btn-default" onClick={this.reload.bind(this)}>
                  <i className="glyphicon glyphicon-refresh"></i> 刷新
                </button>
              </div>
            </div>
            <br/>
            <div className="btn-group">
              <button className="btn btn-danger" onClick={this.remove.bind(this)}>
                <i className="glyphicon glyphicon-trash"></i> Clear
              </button>
            </div>
          </div>
        </div>


        <div className="panel panel-default">
          <div className="panel-heading">
            <i className="glyphicon glyphicon-cog"></i> Users
          </div>
          <div className="list-group">
            {this.state.users.map(uid=> {
              return <Link activeClassName="active" className="list-group-item" key={uid}
                           to={`/users/${uid}`}>{uid}</Link>
            })}
          </div>
        </div>


      </div>
      <div className="col-lg-9">
        {this.props.children}
      </div>
    </div>
  }
}

export default Users;