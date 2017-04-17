import React, { Component } from 'react';
// import VideosContainer from './Components/VideosContainer';

class Session extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div>
                <h2>Session</h2>
                <p>{this.props.match.params.sessionId}</p>
            </div>
        );
    }
}

export default Session;