import React, { Component } from 'react';
// import VideosContainer from './Components/VideosContainer';

class Session extends Component {
    render() {
        return (
            <div>
                <h2>Session</h2>
                <p>{this.props.match.params.sessioName}</p>
            </div>
        );
    }
}

export default Session;