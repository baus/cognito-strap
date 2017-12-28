import React from 'react';
import {Container, Label, Input, Button} from 'reactstrap';

export const FormContainer = (props) => {
    return (
        <Container className="form-container">
            {props.children}
        </Container>
    )
};

export const EmailInput = (props) => {
    return (
        <div>
            <Label className="sr-only" for="inputEmail">Email</Label>
            <Input placeholder="Email address"
                   type="email"
                   name="email"
                   id="inputEmail"
                   onChange={props.onChange}
                   value={props.value}
            />
        </div>
    )
};

export const PasswordInput = (props) => {
    return (
        <div>
            <Label className="sr-only" for="inputPassword">Password</Label>
            <Input placeholder="Password"
                   name="password"
                   id="inputPassword"
                   onChange={props.onChange}
                   type="password"
            />
        </div>
    )
};

export const SubmitButton = (props) => {
    return (
        <Button color="primary" size="lg" type="submit" value="Submit" block>{props.children}</Button>
    )
};