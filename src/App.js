import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import RootPage from './RootPage';
import RegisterForm from './RegisterForm';
import ChangePasswordForm from './ChangePasswordForm';
import PasswordResetForm from './PasswordResetForm';
import LoginForm from './LoginForm';
import ConfirmForm from './ConfirmForm';
import Profile from './Profile';
import NavBar from './NavBar';
import Footer from './Footer';
import {getUserEmail, logOut} from "./cognitoUtil";

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
                        <Route exact path="/profile" component={Profile}/>
                        <Route exact path="/register" component={RegisterForm}/>
                        <Route exact path="/reset" component={PasswordResetForm}/>
                        <Route exact path="/change_password" component={ChangePasswordForm}/>
                        <Route path="/verify" component={ConfirmForm}/>
                        <Footer/>
                    </div>
                </Router>
            </div>
        );
    }
}


export default App;
