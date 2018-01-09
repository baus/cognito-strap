import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {PasswordReset} from 'react-cognito';

import RootPage from './RootPage';
import RegisterForm from './RegisterForm';
import ChangePasswordForm from './ChangePasswordForm';
import UpdateEmailForm from './UpdateEmailForm';
import PasswordResetForm from './PasswordResetForm';
import LoginForm from './LoginForm';
import ConfirmForm from './ConfirmForm';
import Profile from './Profile';
import NavBar from './NavBar';
import Footer from './footer';
import {getUserEmail, logOut} from "./cognitoUtil";

const updateEmail = () => (
    <div>
        <UpdateEmailForm/>
        <Link to="/">Home</Link>
    </div>
);

const mapStateToProps = state => {
    return {
        state: state.cognito.state,
        user: state.cognito.user,
        attributes: state.cognito.attributes,
    }
};

const ConnectedProfile = connect(mapStateToProps, null)(Profile);
const ConnectedFooter = connect(mapStateToProps, null)(Footer);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null
        }
    }
    onLoggedIn(email){
        this.setState({email: email});
    }
    onLoggedOut() {
        logOut();
        this.setState({email: null});
    }
    componentWillMount() {
        getUserEmail(email => this.setState({email: email}));
    }
    render() {
        return (
            <div className="page-container">
                <Router>
                    <div>
                        <NavBar email={this.state.email} onLoggedOut={this.onLoggedOut.bind(this)}/>
                        <Route exact path="/" component={RootPage}/>
                        <Route exact path="/login"
                               render={(props) => (<LoginForm onLoggedIn={this.onLoggedIn.bind(this)} {...props}/>)}
                        />
                        <Route exact path="/profile" component={ConnectedProfile}/>
                        <Route exact path="/register" component={RegisterForm}/>
                        <Route exact path="/reset" component={PasswordResetForm}/>
                        <Route exact path="/change_password" component={ChangePasswordForm}/>
                        <Route exact path="/change_email" component={updateEmail}/>
                        <Route path="/verify" component={ConfirmForm}/>
                        <ConnectedFooter/>
                    </div>
                </Router>
            </div>
        );
    }
}


export default App;
