import React from 'react';
import Wilddog from 'wilddog/lib/wilddog-web';

class Info extends React.Component {

  componentDidMount() {
    this.ref = new Wilddog(WILDDOG_APP);
  }

  render() {
    return <div>
      <div className="container">
        <button onClick={e=>{this.ref.remove()}} className="btn btn-danger">清空数据</button>
        <h4>Dashboard</h4>
        <a href={WILDDOG_APP}>{WILDDOG_APP}</a>
      </div>

    </div>
  }
}

export  default Info;