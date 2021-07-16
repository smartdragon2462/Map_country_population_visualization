import React, { useState, useEffect } from "react";
import MapBox from "../../components/mapBox";
import axios from "axios";
import { REST_COUNTRIES_ENDPOINT } from "../../config/api";
import _ from "lodash";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      axios
        .get(`${REST_COUNTRIES_ENDPOINT}/name/${searchTerm}`)
        .then(({ data }) => {
          console.log("data : ", data);
          setShow(true);
          setCountryList([...data]);
        })
        .catch((err) => {
          setShow(false);
        });
    } else {
      setShow(false);
    }
  }, [searchTerm]);
  const onHandleSelection = (country) => {
    setSearchTerm("");
    setShow(false);
    setCountryList([country]);
  };
  return (
    <div>
      <div className="search-container">
        <input
          value={searchTerm}
          onChange={(ev) => setSearchTerm(ev.target.value)}
        />
        {countryList.length > 0 && show ? (
          <ul className="auto-complete-list">
            {countryList.map((country, index) => (
              <li key={index} onClick={() => onHandleSelection(country)}>
                {country.name}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <MapBox coordinates={coordinates} />
      <ul>
        {countryList.map((country, index) => {
          return <li key={index}>{country.name}</li>;
        })}
      </ul>
    </div>
  );
}
