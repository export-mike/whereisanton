import React from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import './App.css'
import { useMediaQuery } from 'react-responsive'

const AnyReactComponent = ({ text }) => <div style={{
  fontSize: '1rem',
  color: '#ec8f58'
}}>👣</div>;

function Map({lat,lng}) {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '80vh', width: '100%' }}>
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
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  })
  return <div style={{
    background: 'white',
    height: '20vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    ...(isDesktopOrLaptop && {
      justifyContent: 'space-between'
    }) || {}
  }}>
    <img alt="" style={{
      height: 69,
      width: 'auto'
    }} src="https://static.wixstatic.com/media/62f289_57b860ae0ae74a6aa6203a1956324267~mv2.png/v1/fill/w_242,h_144,al_c,q_85,usm_0.66_1.00_0.01/TBFD%20logo%2012%2002%2021.webp" />
    {isDesktopOrLaptop && <h1 style={{
    }}>
      Where is Anton?
    </h1>}
    {!isDesktopOrLaptop && <h2 style={{
    }}>
      Where is Anton?
    </h2>}
    {isDesktopOrLaptop && <div style={{
      display: 'flex',
      flexDirection: 'column'
    }}>
      {data && <><div>Lat: {data.lat} </div>
      <div> Lng: {data.lng} </div>
      <div> Speed: {data.properties.speed}</div>
      <div> Last Updated: {new Date(data.properties.timestamp).toLocaleString()}</div>
      </>}
    </div>}
  </div>
}

export default function Layout() {
  const [data, setData] = React.useState();
  React.useEffect(() => {
    setInterval(async() => {
      try {
        const res = await axios.get('https://us-central1-track-anton.cloudfunctions.net/widgets/where');
        console.log(res);
        setData(res.data);
  
      } catch (e) {
        console.error(e);
      }
    }, [10000])
  }, [])
  return <div>
    <Header data={data}/>
    {!data && <div style={{margin: '130px auto', textAlign: 'center', width: '100%'}} >
        Locating Antons Feet
        <div class="App-logo" style={{
          color: '#ec8f58'
        }}>👣</div>
      </div>}
    {data && <Map lat={data.lat} lng={data.lng}/>}
  </div>
}