import React, { useState, useEffect } from "react";
import MapBox from "../../components/mapBox";
import { Modal } from 'react-bootstrap';
import axios from "axios";
import { REST_COUNTRIES_ENDPOINT } from "../../config/api";
import { Chart } from 'react-charts'


export default function Home() {
  const axes =[    
    { primary: true, type: 'ordinal', position: 'bottom' },
    { position: 'left', type: 'linear', stacked: true }
  ]

  // initialize the variables 
  const [searchTerm, setSearchTerm] = useState("");
  const [allCountryData, setAllCountryData] = useState([]);
  const [searchedCountry, setSearchedCountry] = useState([]);
  const [populations, setPopulations] = useState(null);
  const [chartVisible, setChartVisible] = useState(false);
  const [visibleSearchList, setVisibleSearchList] = useState(true);


  useEffect(() => {
    axios
        .get(`${REST_COUNTRIES_ENDPOINT}/all`)
        .then(({ data }) => {
          setAllCountryData(data);
        })
  },[]);
  
  /**
   *Get the matched countries by search term.
   * @param {*} search_str: a searching string
   */
  const onChangeSearchText = (search_str) => {
    setVisibleSearchList(true);
    setSearchTerm(search_str);

    if( search_str === "" ) {
      setSearchedCountry([]);
    }
    else {
      // filter country data by search string
      let filtered = allCountryData.filter(obj => obj.name.toLowerCase().includes(search_str.toLowerCase()));
      setSearchedCountry(filtered);

      // filter population data by search string
      let populationData = filtered.map(elem => [elem.name.replace(/(.{15})..+/, "$1..."), elem.population]);
      const data = [
        {
          label: 'population',
          data: populationData
        }
      ]
      setPopulations(data);
    }    
  };

/**
 *Select a specfic country by clicking one of search list.
 * @param {*} country: a selected country data
 */
const onHandleSelection = (country) => {
    //set the values by selected country data
    setSearchedCountry([country]);
    setSearchTerm(country.name);   
    setVisibleSearchList(false);
    const data = [
      {
        label: 'population',
        data: [[country.name.replace(/(.{15})..+/, "$1..."), country.population]]
      }
    ]
    setPopulations(data);
  };
  

  return (
    <div className = "map-container" >             
      <div className="search-container">          
        <div className = "search-comp" style={{ borderRadius: searchedCountry.length > 0 && visibleSearchList? '8px 8px 0px 0px' : '8px'}}>
          <div onClick={()=>
            {
              if( searchedCountry.length>0) setChartVisible(!chartVisible)
            }
          }>
            <i className="fa fa-bar-chart" aria-hidden="true"></i>
          </div>
          <input
            className = "input-search"
            placeholder="Search Country"
            value={searchTerm}
            onChange={(ev) => onChangeSearchText(ev.target.value)}
          />
          <i className="fa fa-search icon-search" aria-hidden="true"></i>
        </div>
        {
          searchedCountry.length > 0 && visibleSearchList &&
          <div className="auto-complete-list">
            <div className="inside-element">
              {searchedCountry.map((country, index) => (
                <div className="auto-complete-list-item" key={index} onClick={() => onHandleSelection(country)}>
                  {country.name}
                </div>
              ))}
            </div>
          </div>   
        }  
      </div>

      <MapBox countries={searchedCountry}/>

      {
        searchedCountry.length > 0 &&
        <Modal show={chartVisible} onHide={()=>setChartVisible(!chartVisible)} centered>
          <Modal.Header>
            <Modal.Title>Popuplation Chart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {
            populations &&
            <div className='chart-container'>
              <Chart data={populations} series={{ type: 'bar' }} axes={axes} tooltip/>
            </div>
          }
          </Modal.Body>
        </Modal>
      }
    </div>
  );
}
