import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {CognitoState, NewPasswordRequired, EmailVerification, Confirm} from 'react-cognito';
import ContentContainer from './ContentContainer';
import EmailVerificationForm from './EmailVerificationForm';
import NewPasswordRequiredForm from './NewPasswordRequiredForm';
import ConfirmForm from './ConfirmForm';
import LandingPage from './LandingPage';
import {isUserLoggedIn} from "./cognitoUtil";

const loggedInPage = (user, attributes) => (
    <ContentContainer>
        <h2>This is the main application page</h2>
    </ContentContainer>
);


const newPasswordPage = () => (
    <div>
        <p>New password required, since this is your first login</p>
        <NewPasswordRequired>
            <NewPasswordRequiredForm/>
        </NewPasswordRequired>
    </div>
);

const emailVerificationPage = () => (
    <div>
        <p>You must verify your email address. Please check your email for a code</p>
        <EmailVerification>
            <EmailVerificationForm/>
        </EmailVerification>
    </div>
);

const confirmForm = () => (
    <div>
        <p>A confirmation code has been sent to your email address</p>
        <Confirm>
            <ConfirmForm/>
        </Confirm>
        <Link to="/">Home</Link>
    </div>
);

const mfaPage = () => (
    <div>
        <p>You need to enter an MFA, but this library does not yet support them.</p>
    </div>
);

const RootPage = ({state, user, attributes}) => {
    if (isUserLoggedIn() === true) {
        return loggedInPage(user, attributes);
    } else {
        return (<LandingPage/>);
    }
    switch (state) {
        case CognitoState.LOGGED_IN:
            return loggedInPage(user, attributes);
        case CognitoState.AUTHENTICATED:
        case CognitoState.LOGGING_IN:
        case CognitoState.LOGGED_OUT:
        case CognitoState.LOGIN_FAILURE:
            return (<LandingPage/>);
        case CognitoState.MFA_REQUIRED:
            return mfaPage();
        case CognitoState.NEW_PASSWORD_REQUIRED:
            return newPasswordPage();
        case CognitoState.EMAIL_VERIFICATION_REQUIRED:
            return emailVerificationPage();
        case CognitoState.CONFIRMATION_REQUIRED:
            return confirmForm();
        default:
            return (
                <div>
                    <p>Unrecognised cognito state</p>
                </div>
            );
    }
};

const mapStateToProps = state => ({
    state: state.cognito.state,
    user: state.cognito.user,
    attributes: state.cognito.attributes,
});


export default connect(mapStateToProps, null)(RootPage);
