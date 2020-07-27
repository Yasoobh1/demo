import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Demo from './Demo';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import firebase from '../config'


// Containers

const ProtectedRoute = ({ isAllowed, redirectRoute = '/login', ...props }) =>
    isAllowed ? <Route {...props} /> : <Redirect to={redirectRoute} />


class AppRouter extends Component {

    state = {
        setUser: ''
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({setUser: user});
                this.props.history.push('/')
            }
        })
    }

    render() {
        return (
            <Switch>
                <Route exact path="/login" component={SignIn} />
                <Route exact path="/register" component={SignUp} />
                <ProtectedRoute isAllowed={this.state.setUser} path="/" name="Home" component={Demo} />
            </Switch>
        );
    }
}

export default AppRouter;