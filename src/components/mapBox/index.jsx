import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
import _ from "lodash";

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_PUBLIC_TOKEN;

export default function MapBox(props) {
  let map;
  const mapContainer = useRef();
  const [lat, setLat] = useState(37.8);
  const [lng, setLng] = useState(-122.5);
  const [zoom, setZoom] = useState(9);
  const [coordinates, setCoordinates] = useState([...props.coordinates]);
  useEffect(() => {
    if (props.coordinates.length > 0) {
      setCoordinates([...props.coordinates]);
      setLng(_.last(props.coordinates)[0]);
      setLat(_.last(props.coordinates)[1]);

      if (map) {
        map.on("load", function () {
          map.addSource("route", {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: [...coordinates],
              },
            },
          });
          map.addLayer({
            id: "route",
            type: "line",
            source: "route",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#888",
              "line-width": 6,
            },
          });
        });
      }
    }
  }, [props.coordinates]);
  useEffect(() => {
    map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });
    return () => map.remove();
  }, []);

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div className="map-container" ref={mapContainer} />
    </div>
  );
}
