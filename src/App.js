/* eslint react/no-did-mount-set-state: 0 */
import React from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';

import MoviesList from './movies/MoviesList';
import MovieDetail from './movies/MovieDetail';

import logo from './logo.svg';
import './App.css';

const App = () => (
  <Router>
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
      </header>
      <Switch>
        <Route exact path="/" component={MoviesList} />
        <Route path="/:id" component={MovieDetail} />
      </Switch>
    </div>
  </Router>
);

export default App;
