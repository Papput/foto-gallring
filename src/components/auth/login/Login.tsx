import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import LoaderComponent from '../../loader/LoaderComponent';

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
    const { login, errorMessage } = useAuth();
    const auth = useSelector((state: RootState) => state.firebase.auth);
    const navigate = useNavigate();
    useEffect(() => {
        if(!auth.isEmpty) {
            navigate('/');
        }
    }, [navigate, auth]);

    if (!auth.isLoaded) {
        return <LoaderComponent />
    }

    return (
        <StyledCol sm={6}>
            <H1>Sign in</H1>
            <Card>
                <Card.Body>
                    <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => login(e, email, password)}>
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

                    {errorMessage && <StyledAlert variant={'warning'}>
                       {errorMessage} <Alert.Link as={Link} to="/password-reset">Forgot password?</Alert.Link>
                    </StyledAlert>}
                </Card.Body>
            </Card>
            <StyledLink to="/sign-up" className="text-primary mt-2">Create an account</StyledLink>
        </StyledCol>
    )
}

export default Login;
