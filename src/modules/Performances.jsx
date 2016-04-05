import React from 'react';
import Wilddog from 'wilddog/lib/wilddog-web';
import {Link} from 'react-router';

class Performances extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      list: []
    }
  }

  componentDidMount() {
    let ref = this.ref = new Wilddog(`https://rum.wilddogio.com/performance`);
    ref.on('value', snapshot=> {

      let list = [];

      snapshot.forEach(item=> {
        list.push(item.key());
      })

      this.setState({
        list
      });
    });
  }

  render() {
    return <div className="row">
      <div className="col-lg-3">
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
      <div className="col-lg-9">
        {this.props.children}
      </div>
    </div>
  }
}

export default Performances;