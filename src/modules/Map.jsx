import React from 'react';
import {findDOMNode} from 'react-dom';
import './map.css';

class Map extends React.Component {

  componentDidMount() {

    this.map = new AMap.Map(findDOMNode(this), {
      zoom: 2
    });

    this.adjustMarkers();
  }

  componentWillReceiveProps(props) {
    this.adjustMarkers(props);
  }

  adjustMarkers(props = this.props) {
    if (props.ipapi) {

      let {
        lat,
        lon
      } =props.ipapi;

      var marker = new AMap.Marker({
        position: [lon, lat],
        map: this.map
      });
      this.map.setZoom(10);
      this.map.setCenter([lon, lat]);
    }
  }

  render() {
    return <div className="amap-container">222</div>
  }
}

export default Map;