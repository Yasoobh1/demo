import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Demo from './Demo';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import { connect } from 'react-redux';


const ProtectedRoute = ({ isAllowed, redirectRoute = '/login', ...props }) =>
    isAllowed ? <Route {...props} /> : <Redirect to={redirectRoute} />


class AppRouter extends Component {

    render() {
        return (
            <Switch >
                <Route exact path="/login" component={SignIn} />
                <Route exact path="/register" component={SignUp} />
                <ProtectedRoute isAllowed={this.props.currentUser} path="/" name="Home" component={Demo} />
            </Switch>
        );
    }
}

const mapStateFromProps = state => ({
    currentUser: state.user.currentUser
})
export default connect(mapStateFromProps)(AppRouter);