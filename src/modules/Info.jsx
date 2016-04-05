import React from 'react';
import Wilddog from 'wilddog/lib/wilddog-web';

class Info extends React.Component {

  componentDidMount() {
    this.ref = new Wilddog(WILDDOG_APP);
  }

  render() {
    return <div>
      <button onClick={e=>{this.ref.remove()}} className="btn btn-danger">清空数据</button>
    </div>
  }
}

export  default Info;