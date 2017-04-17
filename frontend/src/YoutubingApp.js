import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NewSession from './Components/NewSession'
import Session from './Components/Session';

class YoutubingApp extends Component {
  render() {
    return (
      <Router>
        <div>
          {/*<h1>Welcome to YoutubingApp!</h1>          */}
          <Route exact path="/" component={NewSession} />
          <Route path="/session/:sessionId" component={Session} />
        </div>
      </Router>
    );
  }
}

export default YoutubingApp;
