import React from 'react';

class Footer extends React.Component {

    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <span className="text-muted">copyright 2017 christopher@baus.net &middot; Cognito state: {this.props.state} </span>
                </div>
            </footer>
        );
    }
}

export default Footer;