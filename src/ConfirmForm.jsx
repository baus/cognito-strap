import React from 'react';
import {Form, Label, Input, Alert} from 'reactstrap';
import {Redirect} from 'react-router-dom';
import {FormContainer, SubmitButton} from './FormComponents';

class ConfirmForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: '',
            verificationCode: '',
            validated: false
        };
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.verificationCode)
            .then((user) => {
                this.setState({validated: true});
            })
            .catch((error) => {
                this.setState({error: "Couldn't verify code"});
            });
    }

    onResend = (event) => {
        event.preventDefault();
        this.props.onResend()
            .then((user) => {
                this.setState({error: 'Code resent'});
            })
            .catch((error) => {
                this.setState({error});
            });

    }

    changeVerificationCode = (event) => {
        this.setState({verificationCode: event.target.value});
    }

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
