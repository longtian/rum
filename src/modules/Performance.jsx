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
    let ref = this.ref = new Wilddog(`https://rum.wilddogio.com/performance/${id}`);
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
    return <div className="row">
      <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
    </div>
  }
}

export default Performance;