import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../../../App';
import { BrowserRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history';
import { store } from '../../../store/store';
import { reduxFirebaseprops } from '../../../store/firebase';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';

describe('Signup component', () => {
    test('Renders Signup form', async () => {
        const history = createMemoryHistory();
        window.history.pushState({}, '', '/sign-up')
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
            const LoginButton = screen.getByRole('button', { name: /create account/i});
            const EmailLable = screen.getByLabelText('Email address')
            const PasswordLable = screen.getByLabelText('Password')
            
            const EmailInput = screen.getByRole('textbox', { name: 'Email address'}); 
            const PasswordInput = screen.getByPlaceholderText(/password/i) 
            expect(screen.queryByText('...loading')).toBeNull();
            expect(EmailLable).toBeInTheDocument();
            expect(LoginButton).toBeInTheDocument();
            expect(PasswordLable).toBeInTheDocument();
            expect(EmailInput).toBeInTheDocument();
            expect(PasswordInput).toBeInTheDocument();
        })

        
    });
})
