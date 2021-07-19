import React, { useRef, useEffect, useState } from "react";
import ReactMapGl, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import pin_img from "../../assert/pin.png";

const mapboxToken = process.env.REACT_APP_MAPBOX_PUBLIC_TOKEN;

export default function MapBox(props) {
  const mapContainer = useRef(null);
  const [countries, setCountries] = useState([...props.countries]);
  const [dimension, setDimension] = useState([window.innerWidth, window.innerHeight]);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    width: "100vw",
    height: "100vh",
    zoom: 2,
  });
  

  useEffect(() => {
    function updateViewer() {
      setDimension([window.innerWidth, window.innerHeight]);
    }
    setViewport(
      { 
        latitude: props.countries.length>0? props.countries[0].latlng[0]: viewport.latitude,
        longitude: props.countries.length>0? props.countries[0].latlng[1]: viewport.longitude,
        width: "100vw",
        height: "100vh", 
        zoom: viewport.zoom,
      }
    )    
    setCountries(props.countries);
    window.addEventListener('resize', updateViewer);
    return () => window.removeEventListener('resize', updateViewer);
  }, [dimension, props.countries]);

  return (
    <ReactMapGl
      ref={mapContainer}
      {...viewport}
      onViewportChange={(viewport) => setViewport({ ...viewport })}
      mapboxApiAccessToken={mapboxToken}
      mapStyle="mapbox://styles/mapbox/streets-v10"
    >
      {countries &&
        countries.map((country, idx) => (
          country.latlng.length > 0 &&
            <Marker
              key={idx}
              latitude={country.latlng[0]}
              longitude={country.latlng[1]}
            >
              <div className="marker">
                <div>{country.name}</div>
              </div>
              <img src={pin_img} alt="marker" />
            </Marker>
        ))}
    </ReactMapGl>
  );
}
