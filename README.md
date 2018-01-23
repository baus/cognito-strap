# Cognito Strap

Cognito Strap is a boilerplate project for new web applications using [AWS Cognito](https://aws.amazon.com/cognito/), 
[React](https://reactjs.org/), and [Bootstrap](https://getbootstrap.com/). You can fork the repository to start a 
new project. It uses email address as a username, and implements signup, login, recover password, and change password
flows.

Example is here: [Cognito Strap](http://cognitostrap.org) 


### Cognito strap currently does not support the following features:
* [MFA](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-mfa.html)
* Usernames which are not emails
* Change email flow. Not sure if this is possible without using usernames

### Other Notes
* Here is discussion on exposing poolData on the client: https://github.com/aws/amazon-cognito-identity-js/issues/312
* The sample code is out of date with the latest Cognito JS API
* reactstrap should have NavbarText element
* Saw this issue in react-cognito: https://github.com/isotoma/react-cognito/issues/21


This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
