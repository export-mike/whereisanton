import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
const AnyReactComponent = ({ text }) => <div style={{
  fontSize: '1rem',
  color: '#ec8f58'
}}>👣</div>;

function Map({lat,lng}) {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDh0gDeOKl-jSlBNbmPELzhiGCdyOs_XSI" }}
          defaultCenter={{
            lat, 
            lng
          }}
          defaultZoom={11}
        >
          <AnyReactComponent
            lat={lat}
            lng={lng}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
}
function Header({data}) {
  const {
    lat,lng,
    properties: {speed}
  } = data
  return <div style={{
    background: 'white',
    height: 72,
    width: '100%',
    position: 'absolute',
    zIndex:1000,
    top: 0,
    left:0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }}>
    <img style={{
      height: 69,
      width: 'auto'
    }} src="https://static.wixstatic.com/media/62f289_57b860ae0ae74a6aa6203a1956324267~mv2.png/v1/fill/w_242,h_144,al_c,q_85,usm_0.66_1.00_0.01/TBFD%20logo%2012%2002%2021.webp" />
    <h1>
      Where is Anton?
    </h1>
    <div style={{
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div>Lat: {lat} </div>
      <div> Lng: {lng} </div>
      <div> Speed: {speed}</div>
    </div>
  </div>
}

export default function Layout() {
  const [data, setData] = React.useState();
  React.useEffect(async () => {
    try {
      const res = await axios.get('https://us-central1-track-anton.cloudfunctions.net/widgets/where');
      console.log(res);
      setData(res.data);

    } catch (e) {
      console.error(e);
    }
  })
  if (!data) return <span>loading...</span>
  return <div>
    <Header data={data}/>
    <Map lat={data.lat} lng={data.lng}/>
  </div>
}