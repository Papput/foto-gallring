import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../../App';
import { BrowserRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history';
import { store } from '../../store/store';
import { reduxFirebaseprops } from '../../store/firebase';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import Main from './Main';

describe('Main component', () => {
    test('Renders login form if not logged in', async () => {
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

    test('Renders Create Album form', async () => {
        const history = createMemoryHistory();
        window.history.pushState({}, '', '/login')
        act(() => {
            render(
                <Provider store={store}>
                    <ReactReduxFirebaseProvider {...reduxFirebaseprops} >
                        <BrowserRouter history={history}>
                            <Main />
                        </BrowserRouter>
                    </ReactReduxFirebaseProvider>
                </Provider>
            );
        })

        const CreateAlbumButton = screen.getByRole('button', { name: 'Create New Album'});
        const PasswordInput = screen.getByPlaceholderText(/Enter Album name/i) 
        const AlbumFormLable = screen.getByLabelText('Album Name')

        expect(screen.queryByText('...loading')).toBeNull();
        expect(AlbumFormLable).toBeInTheDocument();
        expect(CreateAlbumButton).toBeInTheDocument();
        expect(PasswordInput).toBeInTheDocument();
    });       
})
