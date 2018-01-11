import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Form, Label, Alert} from 'reactstrap';
import {EmailInput, FormContainer, PasswordInput, SubmitButton} from './FormComponents';
import {getUserEmail} from './cognitoUtil.js';
import {loginUser} from "./cognitoUtil";

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

    onSubmit = (event) => {
        event.preventDefault();
        loginUser(this.state.username, this.state.password, (err, result) => {
            if (err) {
                this.setState({error: err.message});
            } else {
                getUserEmail(email => {
                    this.setState({loggedIn: true});
                    this.props.onLoggedIn(email);
                });
            }
        });
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
            <FormContainer>
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
            </FormContainer>

        );
    }
}


export default LoginForm;
