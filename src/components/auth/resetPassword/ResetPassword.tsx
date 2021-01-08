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

const ResetPassword = () => {
    const [ email, setEmail ] = useState("");
    const { resetPassword, errorMessage, message } = useAuth();

    return (
        <StyledCol sm={6}>
            <H1>Reset password</H1>
            <Card>
                <Card.Body>
                    <Form onSubmit={(e) => resetPassword(e, email)}>
                        <Form.Group>
                            <Form.Label htmlFor="email">Email address</Form.Label>
                            <Form.Control id="email" type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} required />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Reset password
                        </Button>
                    </Form>

                    {errorMessage && (
                        <StyledAlert variant={'warning'}>
                            {errorMessage}
                        </StyledAlert>)
                    }
                    {message && (
                        <StyledAlert variant={'info'}>
                            {message}
                        </StyledAlert>)
                    }
                </Card.Body>
            </Card>
            <StyledLink to="/login" className="text-primary mt-2">I remember my password!</StyledLink>
        </StyledCol>
    )
}

export default ResetPassword;