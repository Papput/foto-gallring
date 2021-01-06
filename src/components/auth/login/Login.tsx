import { observer } from 'mobx-react';
import React, { useState } from 'react'
import { Alert, Button, Card, Col, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { loginStore } from './LoginStore';
import { Link } from 'react-router-dom'

const StyledCol = styled(Col)`
    margin: 0 auto;
`

const StyledAlert = styled(Alert)`
    margin-top: 1rem;
`
const H1 = styled.h1`
    font-size: 2rem;
    margin-top: 2rem;
`

const StyledLink = styled(Link)`
    display: block;
    text-align: center;
`

const Login = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    return (
        <StyledCol sm={6}>
            <H1>Sign in</H1>
            <Card>
                <Card.Body>
                    <Form onSubmit={(e) => loginStore.login(e, email, password)}>
                        <Form.Group>
                            <Form.Label htmlFor="email">Email address</Form.Label>
                            <Form.Control id="email" type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} required />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor="password">Password</Form.Label>
                            <Form.Control type="password" id="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Sign in
                        </Button>
                    </Form>

                    {loginStore.error && <StyledAlert variant={'warning'}>
                       {loginStore.error} <Alert.Link as={Link} to="/password-reset">Forgot password?</Alert.Link>
                    </StyledAlert>}
                </Card.Body>
            </Card>
            <StyledLink to="/sign-up" className="text-primary mt-2">Create an account</StyledLink>
        </StyledCol>
    )
}

export default observer(Login)