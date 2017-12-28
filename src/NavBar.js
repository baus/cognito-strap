import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Logout} from 'react-cognito';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';


class UserDropDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {navTo: null};
    }

    navigateToProfile() {
        this.setState({navTo: '/profile'});
    }

    render() {
        if (this.state.navTo) {
            return (<Redirect push to={this.state.navTo}/>);
        }
        return (
            <UncontrolledDropdown nav>
                <DropdownToggle nav caret>
                    {this.props.username}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={this.navigateToProfile.bind(this)}>Profile</DropdownItem>
                    <DropdownItem divider/>
                    <Logout>
                        <DropdownItem>Logout</DropdownItem>
                    </Logout>
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    }

    componentDidUpdate() {
        if (this.state.navTo) {
            this.setState({navTo: null});
        }
    }
}

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const email = this.props.attributes.email;
        const userElement = email ? (<UserDropDown username={email}/>) : (
            <Link className="nav-link" to="/login">Login</Link>);

        return (
            <Navbar color="dark" className="navbar-dark navbar-expand-sm" expand="md">
                <Link to="/" className="navbar-brand">Cognito strap</Link>
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="https://github.com/baus/cognito-strap">Github</NavLink>
                        </NavItem>
                        {userElement}
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default NavBar;