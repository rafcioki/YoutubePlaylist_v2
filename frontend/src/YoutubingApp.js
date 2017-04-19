import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NewSession from './Components/NewSession'
import Session from './Components/Session';

class YoutubingApp extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={NewSession} />
          <Route path="/session/:sessionName" component={Session} />
        </div>
      </Router>
    );
  }
}

export default YoutubingApp;
