import React from 'react';
import { Grid, Form, Segment, Header, Button, Message, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import * as firebase from 'firebase'

import md5 from 'md5';

class SignIn extends React.Component {
    state = {
        email: '',
        password: '',
        errors: [],
        loading: false,
    }
    displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>)

    handleSubmit = event => {
        event.preventDefault();
        if (this.isFormValid(this.state.email, this.state.password)) {
            this.setState({ errors: [], loading: true });
            console.log(this.state.email, this.state.password)
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(signedInUser => {
                    this.props.history.push('/')
                })
                .catch(err => {
                    console.log(err);
                    this.setState({
                        errors: this.state.errors.concat(err),
                        loading: false
                    })
                })
        }
    }

    isFormValid = (email, password) => email && password;

    handleInputError = (errors, inputName) => {
        return errors.some(error =>
            error.message.toLowerCase().includes(inputName)) ? 'error' : ''
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }


    render() {
        const { email, password, errors, loading } = this.state
        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" icon color="orange" textAlign="center" >
                        <Icon name="puzzle piece" color="orange" />
                            Register for Demo
                    </Header>
                    <Form onSubmit={this.handleSubmit} size="large">
                        <Segment stacked>
                            <Form.Input
                                fluid
                                name="email"
                                icon="mail"
                                iconPosition="left"
                                placeholder="Email Address"
                                onChange={this.handleChange}
                                value={email}
                                className={this.handleInputError(errors, 'email')}
                                type="text" />

                            <Form.Input
                                fluid
                                name="password"
                                icon="lock"
                                iconPosition="left"
                                placeholder="Passwpord"
                                onChange={this.handleChange}
                                className={this.handleInputError(errors, 'password')}
                                value={password}
                                type="password" />
                            <Button
                                disabled={loading}
                                className={loading ? 'loading' : ''}
                                color="orange"
                                fluid
                                size="large">
                                Submit
                                </Button>

                        </Segment>

                    </Form>
                    {errors.length > 0 && (
                        <Message error>
                            <h3>Error</h3>
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                    <Message>Don't hanve an account?
                        <Link to="/register"
                        >Register</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default SignIn;