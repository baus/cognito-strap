import React from 'react';
import {Button, Form, Label, Input} from 'reactstrap';

class NewPasswordRequiredForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: props.error,
            password: '',
        };
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.password);
    }

    changePassword = (event) => {
        this.setState({password: event.target.value});
    }

    render() {
        return (
            <Form className="form" onSubmit={this.onSubmit}>
                <div>{this.props.error}</div>
                <Label>Password</Label>
                <Input placeholder="new password" onChange={this.changePassword} required/>
                <Button color="primary" size="lg" type="submit">Set new password</Button>
            </Form>
        )
    }
}


export default NewPasswordRequiredForm;
