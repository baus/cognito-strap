import {Config, CognitoIdentityCredentials} from 'aws-sdk';
import {CognitoUserPool, AuthenticationDetails, CognitoUser} from 'amazon-cognito-identity-js';
import config from './config.json';

export function isUserLoggedIn() {
    const userPool = new CognitoUserPool({
        UserPoolId: config.userPool,
        ClientId: config.clientId
    });
    const cognitoUser = userPool.getCurrentUser();

    let userLoggedIn = false;
    if (cognitoUser != null) {
        cognitoUser.getSession(function (err, session) {
            if (err) {
                console.log(err);
                userLoggedIn = false;
            }
            userLoggedIn = session.isValid();
        });
    }
    return userLoggedIn;
}

export function getUserEmail(callback) {
    const userPool = new CognitoUserPool({
        UserPoolId: config.userPool,
        ClientId: config.clientId
    });
    let email = null;
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser != null) {
        cognitoUser.getSession(function (err, session) {
            cognitoUser.getUserAttributes(function (err, result) {
                let emailAttrib = result.find(attrib => attrib.getName() === 'email');
                email = emailAttrib.getValue();
                callback(email);
            });
        });
    } else {
        callback(null)
    }
}

export function logOut() {
    const userPool = new CognitoUserPool({
        UserPoolId: config.userPool,
        ClientId: config.clientId
    });
    const cognitoUser = userPool.getCurrentUser();
    cognitoUser.signOut();
}