import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class NewSession extends Component {
    constructor(props) {
        super(props);
        
        this.history = props.history;
        this.startNewSession = this.startNewSession.bind(this);
    }

    startNewSession() {
        this.history.push('/session/' + 5);
    }

    render() {
        return (
            <button onClick={this.startNewSession}>
                Start new session
            </button>
        );
    }
}

const NewSessionWithRouter = withRouter(NewSession);

export default NewSessionWithRouter;