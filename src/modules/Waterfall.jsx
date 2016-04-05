import React from 'react';
import {Timeline, DataSet} from 'vis';
import {findDOMNode} from 'react-dom';
import 'vis/dist/vis.css';

import is from 'is';

class Waterfall extends React.Component {

  componentDidMount() {
    this.items = new DataSet();
    this.timeline = new Timeline(findDOMNode(this), this.items, {
      height: "400px"
    });
    this.updateData(this.props.data);
  }

  componentWillReceiveProps({ data }) {
    this.updateData(data);
  }

  componentWillUnmount() {
    console.info('destroying timeline');
    this.timeline.destroy();
  }

  updateData(data) {

    this.items.clear();

    Object.keys(data).map(k=> {
      if (is.number(data[k]) && data[k] > 0) {
        this.items.add({
          id: k,
          content: k,
          start: data[k],
          type: "point"
        })
      }
    })

    data.entries && data.entries.forEach((item, i)=> {
      this.items.add({
        id: "entry-" + i,
        content: item.name,
        start: data.navigationStart + item.startTime,
        end: data.navigationStart + item.responseEnd
      })
    })

    this.timeline.fit();
  }

  render() {
    return <div/>
  }
}

export default Waterfall;