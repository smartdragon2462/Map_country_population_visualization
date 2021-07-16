import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './routes/home';

function App(props) {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  );
}

export default App;