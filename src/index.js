/*
This project is to Create a web application which displays countries’ approximate location on a map and
compares their populations with an appropriate data visualization.
We use REST Countries API (https://restcountries.eu/) as REST API.
And also we used React, Hook, Redux, Bootstrap for web development.
And we must use map provider API key. So we created a .env file in root and a variable, REACT_APP_MAPBOX_PUBLIC_TOKEN for it.
Thus, you can change this variable into your API key when use this code.
*/


import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

ReactDOM.render(
  <BrowserRouter history={history}>
    <Route component={App} />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();