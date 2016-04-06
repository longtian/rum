import React from 'react';
import {findDOMNode} from 'react-dom';
import './map.css';
import $ from 'jquery';

/**
 * Load AMAP
 * @type {Promise}
 */
const loadAMap = new Promise((resolve, reject)=> {
  $.getScript(`http://webapi.amap.com/maps?v=1.3&key=${AMAP_KEY}`, ()=> {
    resolve(window.AMap);
  })
});

class Map extends React.Component {

  componentDidMount() {
    loadAMap.then(AMap=> {
      this.map = new AMap.Map(findDOMNode(this), {
        zoom: 2
      });
      this.adjustMarkers();
    })
  }

  componentWillUnmount() {
    this.map.destroy();
  }

  componentWillReceiveProps(props) {
    this.adjustMarkers(props);
  }

	/**
   * show markers
   * 
   * @param props
   */
  adjustMarkers(props = this.props) {
    if (props.ipapi && this.map) {

      let {
        lat,
        lon
      } =props.ipapi;

      loadAMap.then(AMap=> {
        var marker = new AMap.Marker({
          position: [lon, lat],
          map: this.map
        });
        this.map.setZoom(10);
        this.map.setCenter([lon, lat]);
      })
    }
  }

  render() {
    return <div className="amap-container">
      <a href="http://lbs.amap.com/getting-started/map/">http://lbs.amap.com/getting-started/map/</a>
    </div>
  }
}

export default Map;