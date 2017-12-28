import React from 'react';
import {Form, Label, Input, Alert} from 'reactstrap';
import {FormContainer, SubmitButton} from './FormComponents';

class EmailVerificationForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: props.error,
            verificationCode: '',
        };
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.verificationCode);
    };

    changeVerificationCode = (event) => {
        this.setState({verificationCode: event.target.value});
    };

    render() {
        const alert = this.state.error ? (<Alert color="danger">{this.state.error}</Alert>) : (<div/>);

        return (
            <FormContainer>
                <Form className="form" onSubmit={this.onSubmit}>
                    <Label>Verification Code</Label>
                    <Input placeholder="code" onChange={this.changeVerificationCode} required/>

                    <SubmitButton>Submit</SubmitButton>
                    {alert}
                </Form>
            </FormContainer>
        )
    }
}

export default EmailVerificationForm;
