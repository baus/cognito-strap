import React from 'react';
import PropTypes from 'prop-types';
import {registerUser} from './cognitoUtil';
import {Redirect} from 'react-router-dom';
import {Form, Alert} from 'reactstrap';
import queryString from 'query-string';
import {EmailInput, PasswordInput, SubmitButton} from './FormComponents';

class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        const username = queryString.parse(props.location.search).username;
        this.state = {
            error: '',
            username: username,
            password: '',
            email: '',
            verify: false
        };
    }

    onSubmit = (event) => {
        event.preventDefault();
        registerUser(this.state.username, this.state.password, (err, user) => {
            if (err) {
                this.setState({error: err.message});
            } else {
                this.setState({verify: true});
            }
        });
    };

    changeUsername = (event) => {
        this.setState({username: event.target.value});
    };

    changePassword = (event) => {
        this.setState({password: event.target.value});
    };


    render() {
        if (this.state.verify) {
            let redirectLink = '/verify';
            if(this.state.username && this.state.username !== '') {
                redirectLink += '?username=' + encodeURIComponent(this.state.username);
            }
            return (<Redirect push to={redirectLink}/>);
        }
        const alert = this.state.error ? (<Alert color="danger">{this.state.error}</Alert>) : (<div/>);
        return (
            <Form className='form' onSubmit={this.onSubmit}>
                <h2 className="form-signin-heading">Sign up</h2>
                <EmailInput value={this.state.username} onChange={this.changeUsername} />
                <PasswordInput onChange={this.changePassword} />
                <SubmitButton>Sign up</SubmitButton>
                {alert}
            </Form>
        )
    }
}
RegisterForm.contextTypes = {
    store: PropTypes.object
};

export default RegisterForm;

