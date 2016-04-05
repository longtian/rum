import React from 'react';
import Wilddog from 'wilddog/lib/wilddog-web';
import {Link} from 'react-router';

class Performances extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      list: [],
      length: 30
    }
  }

  componentDidMount() {
    this.ref = new Wilddog(`${WILDDOG_APP}/performance`).limitToLast(this.state.length);
    this.handleChange = snapshot=> {
      let list = [];
      snapshot.forEach(item=> {
        list.push(item.key());
      })
      this.setState({
        list
      });
    }
    this.ref.on('value', this.handleChange);
  }

  componentWillUnmount() {
    this.ref.off('value', this.handleChange)
  }

  render() {
    return <div className="row">
      <div className="col-lg-3">
        <div className="panel panel-default">
          <div className="panel-heading">
            Latest {this.state.length} page view
          </div>
          <div className="list-group">
            {this.state.list.map(k=> {
              return <Link
                activeClassName="active"
                key={k}
                className="list-group-item"
                to={`/performances/${k}`}>{k}</Link>
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

export default Performances;