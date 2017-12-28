import React from 'react';
import PropTypes from 'prop-types';
import {updateAttributes} from 'react-cognito';
import {Button, Form, Label} from 'reactstrap';

class UpdateEmailForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: '',
            email: '',
        };
    }

    componentWillMount = () => {
        const {store} = this.context;
        const state = store.getState();
        this.setState({email: state.cognito.attributes.email});
    }

    onSubmit = (event) => {
        const {store} = this.context;
        const state = store.getState();
        const user = state.cognito.user;
        const config = state.cognito.config;
        event.preventDefault();
        updateAttributes(user, {
            email: this.state.email,
        }, config).then(
            (action) => {
                store.dispatch(action);
                this.setState({error: 'email changed'});
            },
            error => this.setState({error}),
        );
    }

    changeEmail = (event) => {
        this.setState({email: event.target.value});
    }

    render = () => (
        <Form className='form' onSubmit={this.onSubmit}>
            <div>{this.state.error}</div>
            <Label>Email address</Label>
            <input value={this.state.email} onChange={this.changeEmail} required/>

            <Button type="submit">Update</Button>
        </Form>
    )
}

UpdateEmailForm.contextTypes = {
    store: PropTypes.object,
};

export default UpdateEmailForm;
