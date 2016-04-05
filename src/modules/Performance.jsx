import React from 'react';
import Wilddog from 'wilddog/lib/wilddog-web';
import {Link} from 'react-router';

class Performance extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    this.fetch(this.props.params.id);
  }

  fetch(id) {
    let ref = this.ref = new Wilddog(`${WILDDOG_APP}/performance/${id}`);
    ref.once('value', snapshot=> {
      this.setState({
        data: snapshot.val()
      });
    });
  }

  componentWillReceiveProps({ params }) {
    let {
      id
    } = params;
    this.fetch(id);
  }

  render() {

    let {
      data
    } = this.state;

    if (!data) {
      return <div>Loading</div>
    }

    let uid = data.uid;

    return <div className="row">
      <div className="panel panel-default">
        <div className="panel-heading">
          <div>
            <Link to={`/users/${uid}`}>{uid}</Link>
          </div>
        </div>
        <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
      </div>
    </div>
  }
}

export default Performance;