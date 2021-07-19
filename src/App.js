import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './routes/home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App(props) {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  );
}

export default App;