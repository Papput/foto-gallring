import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import App from '../../../App';
import { BrowserRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history';
import { store } from '../../../store/store';
import { reduxFirebaseprops } from '../../../store/firebase';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';

describe('Login component', () => {
    test('Renders login form', async () => {
        const history = createMemoryHistory();
        window.history.pushState({}, '', '/login')
        act(() => {
            render(
                <Provider store={store}>
                    <ReactReduxFirebaseProvider {...reduxFirebaseprops} >
                        <BrowserRouter history={history}>
                            <App />
                        </BrowserRouter>
                    </ReactReduxFirebaseProvider>
                </Provider>
            );
        })

        
        
        await waitFor(() => {
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
        })

        
    });


    test('Shows forgot password message', async () => {
        const history = createMemoryHistory();
        window.history.pushState({}, '', '/login')
        act(() => {
            render(
                <Provider store={store}>
                    <ReactReduxFirebaseProvider {...reduxFirebaseprops} >
                        <BrowserRouter history={history}>
                            <App />
                        </BrowserRouter>
                    </ReactReduxFirebaseProvider>
                </Provider>
            );
        })

        
        
        await waitFor(async () => {
            const LoginButton = screen.getByRole('button', { name: /sign in/i});
            const EmailInput = screen.getByRole('textbox', { name: 'Email address'});
            const PasswordInput = screen.getByPlaceholderText(/password/i) 

            // expect(EmailInput).toHaveValue('');
            await userEvent.type(EmailInput, 'testuser@test.com', { delay: 10 });
            expect(EmailInput).toHaveValue('testuser@test.com');

            await userEvent.type(PasswordInput, '1231234', { delay: 10 });
            expect(PasswordInput).toHaveValue('1231234');
            userEvent.click(LoginButton)
        })
        
        await waitFor(() => {
            expect(screen.queryByRole('link', { name: 'Forgot password?' })).toBeInTheDocument();
        })
        
    });
})
