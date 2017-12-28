import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Form, Label, Alert} from 'reactstrap';
import {CognitoState} from 'react-cognito';
import {EmailInput, PasswordInput, SubmitButton} from './FormComponents';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
        };
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.username, this.state.password);
    }

    changeUsername = (event) => {
        this.setState({username: event.target.value});
    }

    changePassword = (event) => {
        this.setState({password: event.target.value});
    }


    componentWillUnmount() {
        /*
         * There is some strange behavior here which needs to be considered.
         *
         * I assumed if username was passed in as a non-null prop that the user would
         * be logged in. That's not the case. After the user logs out, the previous
         * user's username could be passed in because it is cached by react-cognito.
         *
         * In the react-cognito code there is a comment that says the user is cached
         * "for post register login." I will probably either have to reconsider
         * this workflow or bypass react-cognito and go directly to the API.
         */
        this.props.clearCache();
    }

    render() {
        if (CognitoState.LOGGED_IN === this.props.state) {
            return (<Redirect push to="/"/>);
        }

        const alert = this.props.error ? (<Alert color="danger">{this.props.error}</Alert>) : (<div/>);
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
