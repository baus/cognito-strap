import React from 'react';
import ContentContainer from './ContentContainer';
import LandingPage from './LandingPage';
import {isUserLoggedIn} from "./cognitoUtil";

const loggedInPage = () => (
    <ContentContainer>
        <h2>This is the main application page</h2>
    </ContentContainer>
);



const RootPage = () => {
    if (isUserLoggedIn() === true) {
        return loggedInPage();
    } else {
        return (<LandingPage/>);
    }
};


export default RootPage;
