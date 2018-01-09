import React from 'react';
import {Form, Label, Input, Alert} from 'reactstrap';
import {Redirect} from 'react-router-dom';
import {FormContainer, SubmitButton} from './FormComponents';
import {resendVerficationCode, verifyUser} from './cognitoUtil';
import queryString from "query-string";

class ConfirmForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: queryString.parse(props.location.search).username,
            error: '',
            verificationCode: '',
            validated: false
        };
    }

    onSubmit = (event) => {
        event.preventDefault();
        verifyUser(this.state.username, this.state.verificationCode, (err, result) => {
            if (err) {
                this.setState({error: err.message});
            } else {
                this.setState({validated: true});
            }
        });
    };

    onResend = (event) => {
        event.preventDefault();
        resendVerficationCode(this.state.username, (err, result) => {
            if (err) {
                this.setState({error: err.message});
            } else {
                this.setState({error: 'Code resent'});
            }
        });
    };

    changeVerificationCode = (event) => {
        this.setState({verificationCode: event.target.value});
    };

    render() {
        if (this.state.validated) {
            return (<Redirect push to="/login"/>);
        }
        const alert = this.state.error ? (<Alert color="danger">{this.state.error}</Alert>) : (<div/>);
        return (
            <FormContainer>
                <Form className="form" onSubmit={this.onSubmit}>
                    <h2>Code sent</h2>
                    <Label className="sr-only">Verification Code</Label>
                    <Input placeholder="Code from email" onChange={this.changeVerificationCode} required/>
                    <div>
                        &nbsp;
                    </div>
                    <div>
                        <SubmitButton>Submit</SubmitButton>
                    </div>
                    <div>
                        Didn't receive a code? <a href="" onClick={this.onResend}>Resend code »</a>
                    </div>
                    {alert}
                </Form>
            </FormContainer>
        )
    }
}

export default ConfirmForm;
