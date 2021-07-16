import React, { useState, useEffect } from "react";
import MapBox from "../../components/mapBox";
import axios from "axios";
import { REST_COUNTRIES_ENDPOINT } from "../../config/api";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [availableList, setAvailableList] = useState([]);

  useEffect(() => {
    if (searchTerm)
      axios
        .get(`${REST_COUNTRIES_ENDPOINT}/name/${searchTerm}`)
        .then(({ data }) => {
          setAvailableList([...data]);
        });
  }, [searchTerm]);

  const onHandleClickSearch = () => {
    axios
      .get(`${REST_COUNTRIES_ENDPOINT}/name/${searchTerm}`)
      .then(({ data }) => {
        setCountryList([...data]);
      });
  };
  return (
    <div>
      <div className="search-container">
        <input
          value={searchTerm}
          onChange={(ev) => setSearchTerm(ev.target.value)}
        />
        <button onClick={onHandleClickSearch}>Search</button>
        {availableList.length > 0 && (
          <ul className="auto-complete-list">
            {availableList.map((country, index) => (
              <li key={index} onClick={() => setCountryList([country])}>
                {country.name}
              </li>
            ))}
          </ul>
        )}
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
