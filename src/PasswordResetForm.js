import React from 'react';
import {Form, Label, Input, Alert} from 'reactstrap';
import {forgotPassword, confirmForgottenPassword} from "./cognitoUtil";
import {EmailInput, PasswordInput, SubmitButton} from './FormComponents';

class PasswordResetForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            code: '',
            password: '',
            message: '',
            error: '',
        };
    }

    onSubmit(event) {
        event.preventDefault();
        confirmForgottenPassword(this.state.username, this.state.code, this.state.password, (err) => {
            if (!err) {
                this.setState({
                    message: 'Password reset',
                    error: ''
                });
            } else {
                this.setState({
                    message: '',
                    error: err.message
                });
            }
        });
    }

    sendVerificationCode(event) {
        event.preventDefault();
        forgotPassword(this.state.username, (err, result) => {
            if (!err) {
                this.setState({
                    message: 'Verification code sent',
                    error: ''
                });
            } else {
                if (err.code === 'UserNotFoundException') {
                    this.setState({error: 'User not found'});
                } else {
                    this.setState({error: err.message})
                }
            }
        });
    }

    changePassword = (event) => {
        this.setState({password: event.target.value});
    }

    changeCode = (event) => {
        this.setState({code: event.target.value});
    }

    changeUsername = (event) => {
        this.setState({username: event.target.value});
    }

    render() {
        const alert = this.state.error ? (<Alert color="danger">{this.state.error}</Alert>) : (<div/>);
        const message = this.state.message ? (<Alert color="success">{this.state.message}</Alert>) : (<div/>);
        return (
            <div>
                <Form className="form" onSubmit={this.sendVerificationCode.bind(this)}>
                    <EmailInput onChange={this.changeUsername}/>
                    <SubmitButton>Send verification code</SubmitButton>
                </Form>

                <Form className="form" onSubmit={this.onSubmit.bind(this)}>
                    <Label className="sr-only">Verification code</Label>
                    <Input placeholder="code" onChange={this.changeCode} required/>
                    <PasswordInput onChange={this.changePassword}/>

                    <SubmitButton>Set new password</SubmitButton>
                    <div>
                        {alert}
                    </div>
                    <div>
                        {message}
                    </div>
                </Form>

            </div>
        );
    }
}

export default PasswordResetForm;
