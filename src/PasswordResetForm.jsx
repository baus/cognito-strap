import React from 'react';
import {Button, Form, Label, Input, Alert} from 'reactstrap';

class PasswordResetForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            code: '',
            password: '',
            message: '',
            error: '',
        };
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.setPassword(this.state.username, this.state.code, this.state.password)
            .then(() => this.setState({
                message: 'Password reset',
                error: ''
            }))
            .catch((err) => this.setState({
                message: '',
                error: err.message
            }));
    }

    sendVerificationCode(event) {
        event.preventDefault();
        this.props.sendVerificationCode(this.state.username)
            .then(() => this.setState({
                message: 'Verification code sent',
                error: '',
            }))
            .catch((err) => {
                if (err.code === 'UserNotFoundException') {
                    this.setState({error: 'User not found'});
                } else {
                    this.setState({error: err.message})
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
        const message = this.state.message ? (<Alert color="danger">{this.state.message}</Alert>) : (<div/>);
        return (
            <div>
                <Form className="form" onSubmit={this.sendVerificationCode.bind(this)}>
                    <Label className="sr-only">Username</Label>

                    <Input type="text" placeholder="username" value={this.state.username}
                           onChange={this.changeUsername} required/>
                    <Button color="primary" size="lg" type="submit" block>Send verification code</Button>
                </Form>
                <Form className="form" onSubmit={this.onSubmit.bind(this)}>
                    <Label className="sr-only">Verification code</Label>
                    <Input placeholder="code" onChange={this.changeCode} required/>
                    <Label className="sr-only">Password</Label>
                    <Input placeholder="new password" onChange={this.changePassword} required/>
                    <Button color="primary" size="lg" type="submit" block>Set new password</Button>
                </Form>
                <div>
                    {alert}
                </div>
                <div>
                    {message}
                </div>
            </div>
        );
    }
}

export default PasswordResetForm;
