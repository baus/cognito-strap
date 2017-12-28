import React from 'react';
import {Container, Row, Col} from 'reactstrap';

class ContentContainer extends React.Component {

    render() {
        return (
            <Container className="content-container">
                <Row>
                    <Col xs="3"></Col>
                    <Col xs="auto">{this.props.children}</Col>
                    <Col xs="3"></Col>
                </Row>
            </Container>
        );
    }
}

export default ContentContainer;
