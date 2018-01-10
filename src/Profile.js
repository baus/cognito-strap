import React from 'react';
import {Table} from 'reactstrap';
import {Redirect, Link} from 'react-router-dom';
import ContentContainer from './ContentContainer';
import {isUserLoggedIn, getUserAttributes} from "./cognitoUtil";

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            attributes: {}
        }
    }

    componentWillMount() {
        getUserAttributes(attribs => this.setState({attributes: attribs}));
    }

    render() {
        if (!isUserLoggedIn()) {
            /*
             * Need a more scalable way to do redirects, rather than checking
             * for a logged in user on every page that requires a user.
             */
            return (<Redirect push to="/Login"/>);
        }
        return (
            <ContentContainer>
                <h3>Attributes</h3>
                <Table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(this.state.attributes).map(name =>
                        <tr key={name}>
                            <td>{name}</td>
                            <td>{this.state.attributes[name]}</td>
                        </tr>,
                    )}
                    </tbody>
                </Table>
                <div>
                    <Link to="/change_password">Change Password »</Link>
                </div>

            </ContentContainer>
        )
    };
}

export default Profile;