import React, { useState } from "react";
import { Card, Form, Alert, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useAuth } from "../../../hooks/useAuth";


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

const SignUp = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const { signUp, errorMessage } = useAuth();

    return (
        <StyledCol sm={6}>
            <H1>Sign up</H1>
            <Card>
                <Card.Body>
                    <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => signUp(e, email, password)}>
                        <Form.Group>
                            <Form.Label htmlFor="email">Email address</Form.Label>
                            <Form.Control id="email" type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} required />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor="password">Password</Form.Label>
                            <Form.Control type="password" id="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Create Account
                        </Button>
                    </Form>

                    {errorMessage && <StyledAlert variant={'warning'}>
                       {errorMessage}
                    </StyledAlert>}
                </Card.Body>
            </Card>
            <StyledLink to="/login" className="text-primary mt-2">Already have an account? Sign in</StyledLink>
        </StyledCol>
    )
}

export default SignUp;