import React from 'react';
import Wilddog from 'wilddog/lib/wilddog-web';
import {Link} from 'react-router';
import moment from 'moment';
import Map from './Map.jsx';

class User extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    this.handleValueChange = (snapshot)=> {
      this.setState({
        data: snapshot.val()
      })
    };
    this.fetch(this.props.params.id);
  }

  fetch(id) {
    this.ref = new Wilddog(`https://rum.wilddogio.com/users/${id}`);
    this.ref.on('value', this.handleValueChange);
  }

  componentWillReceiveProps({ params }) {
    let {
      id
    } = params;
    this.ref.off('value', this.handleValueChange);
    this.fetch(id);
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
        <div className="panel-heading">position</div>
        <Map ipapi={this.state.data.ipapi}/>
        <div className="panel-body">
          <div className="row">
            <div className="col-lg-6">
              <pre>{JSON.stringify(this.state.data.ipapi, null, 2)}</pre>
            </div>
            <div className="col-lg-6">
              <pre>{JSON.stringify(this.state.data.sohu, null, 2)}</pre>
            </div>
          </div>


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
        <div className="panel-heading">commands</div>
        <div className="panel-body">
          <table className="table table-striped">
            <thead>
            <tr>
              <th>Executed</th>
              <th>Latency</th>
              <th>CMD</th>
              <th>Result</th>
            </tr>
            </thead>
            <tbody>
            {
              this.state.data.commands && Object.keys(this.state.data.commands).map(k=> {
                let cmd = this.state.data.commands[k];
                return (
                  <tr key={k}>
                    <td>{moment(cmd.begin).fromNow()}</td>
                    <td>{cmd.end - cmd.begin}</td>
                    <td>{cmd.cmd}</td>
                    <td>{cmd.result}</td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>


          <pre>{JSON.stringify(this.state.data.commands, null, 2)}</pre>
        </div>
      </div>
    </div>
  }
}

export default User;