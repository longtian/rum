import React from 'react';
import Wilddog from 'wilddog/lib/wilddog-web';
import {Link} from 'react-router';
import moment from 'moment';

class User extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    this.ref = new Wilddog(`https://rum.wilddogio.com/users/${this.props.params.id}`);
    this.ref.on('value', snapshot=> {
      this.setState({
        data: snapshot.val()
      })
    })
  }

  render() {

    let {
      data
    } = this.state;

    if (!data) {
      return <div>Loading</div>
    }

    return <div>
      <div className="well well-sm">{this.props.params.id}</div>

      <div className="panel panel-default">
        <div className="panel-heading">navigator</div>
        <div className="panel-body">
          <pre>{JSON.stringify(this.state.data.navigator, null, 2)}</pre>
        </div>
      </div>

      <div className="panel panel-default">
        <div className="panel-heading">commands</div>
        <div className="panel-body">
          <pre>{JSON.stringify(this.state.data.commands, null, 2)}</pre>
        </div>
      </div>

      <div className="panel panel-default">
        <div className="panel-heading">history</div>
        <ul className="list-group">
          {Object.keys(this.state.data.history).map(k=> {
            let history = this.state.data.history[k];
            return <li className="list-group-item" key={k}>
              <span className="badge"> {moment(history.timestamp).fromNow()}</span>
              <Link to={`/performances/${k}`}>{history.href}</Link>
            </li>
          })}
        </ul>
      </div>

      <div className="panel panel-default">
        <div className="panel-heading">screen</div>
        <div className="panel-body">
          <pre>{JSON.stringify(this.state.data.screen, null, 2)}</pre>
        </div>
      </div>

      <div className="panel panel-default">
        <div className="panel-heading">position</div>
        <div className="panel-body">
          <pre>{JSON.stringify(this.state.data.ipapi, null, 2)}</pre>
          <pre>{JSON.stringify(this.state.data.sohu, null, 2)}</pre>
        </div>
      </div>

      <div className="panel panel-default">
        <div className="panel-heading">location</div>
        <div className="panel-body">
          <pre>{JSON.stringify(this.state.data.location, null, 2)}</pre>
        </div>
      </div>

      <div className="panel panel-default">
        <div className="panel-heading"></div>
        <div className="panel-body"></div>
      </div>

      <div className="panel panel-default">
        <div className="panel-heading">原始数据</div>
        <div className="panel-body">
          <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
        </div>
      </div>
    </div>
  }
}

export default User;