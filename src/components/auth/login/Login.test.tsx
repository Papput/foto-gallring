import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from './Login';

describe('Login component', () => {
    test('Renders login form', () => {
        render(<Login />);
        const LoginButton = screen.getByRole('button', { name: /sign in/i});
        const EmailLable = screen.getByLabelText('Email address')
        const PasswordLable = screen.getByLabelText('Password')
        
        const EmailInput = screen.getByRole('textbox', { name: 'Email address'}); 
        const PasswordInput = screen.getByPlaceholderText(/password/i) 

        
        expect(EmailLable).toBeInTheDocument();
        expect(LoginButton).toBeInTheDocument();
        expect(PasswordLable).toBeInTheDocument();
        expect(EmailInput).toBeInTheDocument();
        expect(PasswordInput).toBeInTheDocument();
    });
})
