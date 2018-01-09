import React from 'react';
import {Redirect} from 'react-router-dom';
import {Button, Form, Input} from 'reactstrap';

/* https://github.com/BlackrockDigital/startbootstrap-landing-page */
/* MIT License */
class LandingPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            signup: false,
            email: ''
        };
    }

    changeUsername(event) {
        this.setState({email: event.target.value});
    }

    onSubmit(event) {
        this.setState({signup: true});
    }

    render() {
        if (this.state.signup) {
            let redirectLink = '/register';
            if(this.state.email && this.state.email !== '') {
                redirectLink += '?username=' + encodeURIComponent(this.state.email);
            }
            return (<Redirect push to={redirectLink}/>);
        }

        return (
            <header className="masthead text-white text-center">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-9 mx-auto">
                            <h1 className="mb-5">Quickly build applications with Cognito, React, and Bootstrap!</h1>
                        </div>
                        <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
                            <Form>
                                <div className="form-row">
                                    <div className="col-12 col-md-9 mb-2 mb-md-0">
                                        <Input type="email"
                                               className="form-control form-control-lg"
                                               placeholder="Enter your email..."
                                               onChange={this.changeUsername.bind(this)} />
                                    </div>
                                    <div className="col-12 col-md-3">
                                        <Button onClick={this.onSubmit.bind(this)}
                                                type="submit"
                                                color="primary"
                                                size="lg"
                                                block>Sign up!</Button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}


export default LandingPage;
