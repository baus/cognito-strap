import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {PasswordReset, Login, Confirm} from 'react-cognito';

import RootPage from './RootPage';
import RegisterForm from './RegisterForm.js';
import ChangePasswordForm from './ChangePasswordForm';
import UpdateEmailForm from './UpdateEmailForm';
import PasswordResetForm from './PasswordResetForm';
import LoginForm from './LoginForm.jsx';
import ConfirmForm from './ConfirmForm.jsx';
import Profile from './Profile.js';
import NavBar from './NavBar';
import Footer from './footer';
import {getUserEmail, logOut} from "./cognitoUtil";

const updateEmail = () => (
    <div>
        <UpdateEmailForm/>
        <Link to="/">Home</Link>
    </div>
);

const passwordReset = () => (
    <PasswordReset>
        <PasswordResetForm/>
    </PasswordReset>
);

const registerForm = (props) => {
    return (
        <div>
            <RegisterForm location={props.location}/>
        </div>
    );
};

const logInPage = (props) => {
    return (
        <LoginForm location={props.location} state={props.state}/>
    )
};

const confirmForm = (props) => {
    return (
        <Confirm>
            <ConfirmForm username={props.match.params[1]}/>
        </Confirm>
    );
};

const mapStateToProps = state => {
    return {
        state: state.cognito.state,
        user: state.cognito.user,
        attributes: state.cognito.attributes,
    }
};

const ConnectedProfile = connect(mapStateToProps, null)(Profile);
const ConnectedFooter = connect(mapStateToProps, null)(Footer);
const ConnectedRegister = connect(mapStateToProps, null)(registerForm);

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
                        <Route exact path="/register" component={ConnectedRegister}/>
                        <Route exact path="/reset" component={passwordReset}/>
                        <Route exact path="/change_password" component={ChangePasswordForm}/>
                        <Route exact path="/change_email" component={updateEmail}/>
                        <Route path="/verify" component={confirmForm}/>
                        <ConnectedFooter/>
                    </div>
                </Router>
            </div>
        );
    }
}


export default App;
