import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class NewSession extends Component {
    constructor(props) {
        super(props);
        
        this.history = props.history;
        this.state = {
            newSessionName: '',
            sessionPassword: '',
            creatingNewSession: false,
            errorMessage: ''
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
       this.setState({ newSessionName: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ sessionPassword: event.target.value });
    }

    handleSubmit(event) {
        fetch('http://localhost:8080/session', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name' : this.state.newSessionName,
                'password' : this.state.sessionPassword
            })
        })
        .then(function(response) {
            if (response.ok) {
               this.history.push('/session/' + this.state.newSessionName); 
            }
        }.bind(this))
        .catch(function(error) {
            this.setState({ errorMessage: 'Failed to create a session.' })
        });

        event.preventDefault();
    }

    render() {
        if (this.state.creatingNewSession) {
                return <div>Please wait, creating new session...</div>
        }

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="newSessionName">
                        Name:
                        <input type="text" 
                            value={this.state.newSessionName} 
                            onChange={this.handleNameChange}/>
                    </label>

                    <label htmlFor="newSessionPassword">
                        Password:
                        <input type="text" 
                            value={this.state.sessionPassword} 
                            onChange={this.handlePasswordChange}/>
                    </label>

                    <input type="submit" value="Create"/>  
                </form>
                <p>{this.state.errorMessage}</p>
            </div>
        );
    }
}

const NewSessionWithRouter = withRouter(NewSession);

export default NewSessionWithRouter;