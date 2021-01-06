import React from 'react'
import { Button, Card, Col, Form } from 'react-bootstrap';
import styled from 'styled-components';

const StyledCol = styled(Col)`
    margin: 0 auto;
`
const H1 = styled.h1`
    font-size: 2rem;
    margin-top: 2rem;
`
const Login = () => {
    return (
        <StyledCol sm={6}>
            <H1>Sign in</H1>
            <Card>
                <Card.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label htmlFor="email">Email address</Form.Label>
                            <Form.Control id="email" type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor="password">Password</Form.Label>
                            <Form.Control type="password" id="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                        Sign in
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </StyledCol>
    )
}

export default Login
