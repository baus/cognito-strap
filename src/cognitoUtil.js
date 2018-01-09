import {Config, CognitoIdentityCredentials} from 'aws-sdk';
import {CognitoUserPool, AuthenticationDetails, CognitoUser, CognitoUserAttribute} from 'amazon-cognito-identity-js';
import config from './config.json';

export function getCurrentUser() {
    const userPool = new CognitoUserPool({
        UserPoolId: config.userPool,
        ClientId: config.clientId
    });
    return userPool.getCurrentUser();
}

export function isUserLoggedIn() {
    const cognitoUser = getCurrentUser();
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
    const cognitoUser = getCurrentUser();
    let email = null;
    if (cognitoUser != null) {
        cognitoUser.getSession(function (err, session) {
            cognitoUser.getUserAttributes( (err, result) => {
                let emailAttrib = result.find(attrib => attrib.getName() === 'email');
                email = emailAttrib.getValue();
                callback(email);
            });
        });
    } else {
        callback(null)
    }
}

export function getUsername() {
    const cognitoUser = getCurrentUser();
    if (cognitoUser != null) {
        return cognitoUser.getUsername();
    }
    return null;
}

export function registerUser(username, password, callback) {
    Config.region = config.region;
    const userPool = new CognitoUserPool({
        UserPoolId: config.userPool,
        ClientId: config.clientId
    });

    const attributeList = [];
    const attributeEmail = new CognitoUserAttribute(username);
    attributeList.push(attributeEmail);
    userPool.signUp(username, password, null, null, (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result.user);
    });
}

export function verifyUser(username, code, callback){
    const userPool = new CognitoUserPool({
        UserPoolId: config.userPool,
        ClientId: config.clientId
    });
    const cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool
    });
    cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

export function resendVerficationCode(username, callback){
    const userPool = new CognitoUserPool({
        UserPoolId: config.userPool,
        ClientId: config.clientId
    });
    const cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool
    });
    cognitoUser.resendConfirmationCode((err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}

export function logOut() {
   getCurrentUser().signOut();
}