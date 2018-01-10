import React from 'react';
import PropTypes from 'prop-types';
import {Form, Alert} from 'reactstrap';
import {FormContainer, SubmitButton, PasswordInput} from './FormComponents';
import {changePassword} from "./cognitoUtil";

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
        event.preventDefault();
        changePassword(this.state.oldPassword, this.state.newPassword, (err, results) => {
            if (!err) {
                this.setState({error: 'Password changed'});
            } else {
                this.setState({error: err.message});
            }
        });
    };

    changeOldPassword = (event) => {
        this.setState({oldPassword: event.target.value});
    };

    changeNewPassword = (event) => {
        this.setState({newPassword: event.target.value});
    };

    render() {
        const alert = this.state.error ? (<Alert color="danger">{this.state.error}</Alert>) : (<div/>);
        return (
            <FormContainer>
                <Form className='form' onSubmit={this.onSubmit}>
                    <h2 className="form-signin-heading">Change password</h2>
                    <PasswordInput label="Old Password" onChange={this.changeOldPassword}/>
                    <PasswordInput label="New Password" onChange={this.changeNewPassword}/>
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
