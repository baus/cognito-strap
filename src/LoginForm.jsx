import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Form, Label, Alert} from 'reactstrap';
import {EmailInput, PasswordInput, SubmitButton} from './FormComponents';
import {Config, CognitoIdentityCredentials} from 'aws-sdk';
import {CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import {getUserEmail} from './cognitoUtil.js';
import config from './config.json';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            loggedIn: false,
            error: null
        };
    }

    authenticateUserSuccess(result) {
        console.log('jwtToken: ' + result.getIdToken().jwtToken);
        const CognitoIdentityCredentialsParams = {
            IdentityId: Config.credentials.identityId,
            IdentityPoolId: config.identityPool,
            Logins: {}
        };
        CognitoIdentityCredentialsParams.Logins['cognito-idp.' + config.region + '.amazonaws.com/' + config.userPool] =
            result.getIdToken().jwtToken;

        Config.credentials = new CognitoIdentityCredentials(CognitoIdentityCredentialsParams, {
            region: config.region
        });
        Config.credentials.get((err) => {
            if(err) {
                console.log(err);
            }
            console.log('identityId: ' + Config.credentials.identityId);
            getUserEmail(email=>{
                this.setState({loggedIn: true});
                this.props.onLoggedIn(email);
            });
        });
    }

    authenticateUserFailure(result) {
        console.log(result);

        if (result.code === 'UserNotConfirmedException') {
            // TODO: redirect to verify page in this case
        }
        this.setState({error: result.message});
    }

    loginUser(username, password) {
        Config.region = config.region;
        Config.credentials = new CognitoIdentityCredentials({
            IdentityPoolId: config.identityPool
        });
        const userPool = new CognitoUserPool({
            UserPoolId: config.userPool,
            ClientId: config.clientId
        });
        const authenticationDetails = new AuthenticationDetails({
            Username: username,
            Password: password
        });

        const cognitoUser = new CognitoUser({
            Username: username,
            Pool: userPool
        });

        cognitoUser.authenticateUser(authenticationDetails, {onSuccess: this.authenticateUserSuccess.bind(this),
                                                             onFailure: this.authenticateUserFailure.bind(this)});
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.loginUser(this.state.username, this.state.password);
    }

    changeUsername = (event) => {
        this.setState({username: event.target.value});
    }

    changePassword = (event) => {
        this.setState({password: event.target.value});
    }

    render() {
        if (this.state.loggedIn) {
            return (<Redirect push to="/"/>);
        }

        const alert = this.state.error ? (<Alert color="danger">{this.state.error}</Alert>) : (<div/>);
        return (
            <Form className='form' onSubmit={this.onSubmit}>
                <h2 className="form-signin-heading">Have an account?</h2>
                <EmailInput onChange={this.changeUsername}/>
                <PasswordInput onChange={this.changePassword}/>
                <div>
                    <Label><Link to="/reset">Forgot password?</Link></Label>
                </div>
                <SubmitButton>Sign in</SubmitButton>
                <div>
                    <Label>Don't have an account? <Link to="/register">Register »</Link></Label>
                </div>
                {alert}
            </Form>

        );
    }
}


export default LoginForm;
