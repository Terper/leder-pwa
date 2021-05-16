import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RouteOverview from '../RouteOverview/RouteOverview';
import SpecificRoute from '../SpecificRoute/SpecificRoute';
import Spinner from '../Spinner/Spinner';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/led/:routeId'>
          <SpecificRoute />
        </Route>
        <Route path='/loading'>
          <Spinner />
        </Route>
        <Route path='/'>
          <RouteOverview />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
