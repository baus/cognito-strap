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
                userLoggedIn = false;
            }
            userLoggedIn = session.isValid();
        });
    }
    return userLoggedIn;
}

export function getUserEmail(callback) {
    getUserAttributes((attribs) => {
        callback(attribs.email);
    });
}

export function getUserAttributes(callback) {
    const cognitoUser = getCurrentUser();
    if (cognitoUser != null) {
        cognitoUser.getSession((err, session) => {
            cognitoUser.getUserAttributes((err, result) => {
                const attributes = {};
                result.forEach(attrib => {
                    attributes[attrib.getName()] = attrib.getValue();
                });
                callback(attributes);
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

export function verifyUser(username, code, callback) {
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

export function resendVerficationCode(username, callback) {
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

export function forgotPassword(username, callback) {
    const userPool = new CognitoUserPool({
        UserPoolId: config.userPool,
        ClientId: config.clientId
    });
    const cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool
    });
    cognitoUser.forgotPassword({
        onSuccess: function (result) {
            callback(null, result);
        },
        onFailure: function (err) {
            callback(err, null);
        }
    });
}

export function confirmForgottenPassword(username, code, password, callback) {
    const userPool = new CognitoUserPool({
        UserPoolId: config.userPool,
        ClientId: config.clientId
    });
    const cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool
    });
    cognitoUser.confirmPassword(code, password, {
        onFailure: (err) => {
            callback(err)
        },
        onSuccess: () => {
            callback(null);
        }
    });
}

export function changePassword(oldPassword, newPassword, callback) {
    const user = getCurrentUser();
    user.getSession((err, session) => {
        user.changePassword(oldPassword, newPassword, (err, result) => callback(err, result));
    });
}

export function logOut() {
    getCurrentUser().signOut();
}