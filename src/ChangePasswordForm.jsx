import React from 'react';
import PropTypes from 'prop-types';
import {changePassword} from 'react-cognito';
import {Form, Label, Input, Alert} from 'reactstrap';
import {FormContainer, SubmitButton} from './FormComponents';

class ChangePasswordForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: '',
            oldPassword: '',
            newPassword: '',
        };
    }

    onSubmit = (event) => {
        const {store} = this.context;
        const state = store.getState();
        const user = state.cognito.user;
        event.preventDefault();
        changePassword(user, this.state.oldPassword, this.state.newPassword).then(
            () => this.setState({error: 'Password changed'}),
            error => this.setState({error}));
    }

    changeOldPassword = (event) => {
        this.setState({oldPassword: event.target.value});
    }

    changeNewPassword = (event) => {
        this.setState({newPassword: event.target.value});
    }

    render() {
        const alert = this.props.error ? (<Alert color="danger">{this.props.error}</Alert>) : (<div/>);
        return (
            <FormContainer>
                <Form className='form' onSubmit={this.onSubmit}>
                    <Label className="sr-only">Old Password</Label>
                    <Input placeholder="old password" onChange={this.changeOldPassword} required/>
                    <Label className="sr-only">New Password</Label>
                    <Input placeholder="new password" onChange={this.changeNewPassword} required/>
                    <div>&nbsp;</div>
                    <SubmitButton>Set new password</SubmitButton>
                    {alert}
                </Form>
            </FormContainer>
        );
    }
}

ChangePasswordForm.contextTypes = {
    store: PropTypes.object,
};

export default ChangePasswordForm;
