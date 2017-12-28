import React from 'react';
import {Table} from 'reactstrap';
import {Redirect, Link} from 'react-router-dom';
import ContentContainer from './ContentContainer';


class Profile extends React.Component {

    render() {
        if (!this.props.user) {
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
                    {Object.keys(this.props.attributes).map(name =>
                        <tr key={name}>
                            <td>{name}</td>
                            <td>{this.props.attributes[name]}</td>
                        </tr>,
                    )}
                    </tbody>
                </Table>
                <span>Logged in as {this.props.user.getUsername()}</span>
                <div>
                    <Link to="/change_password">Change Password »</Link>
                </div>
                <div>
                    <Link to="/change_password">Change Email »</Link>
                </div>
            </ContentContainer>
        )
    };
}

export default Profile;