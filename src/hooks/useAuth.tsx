import React, { useState } from 'react';
import { auth } from '../firebase/index';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const navigate = useNavigate();
    const [ errorMessage, setErrorMessage ] = useState<null | string>(null);
    const [ message, setMessage ] = useState<null | string>(null);

    const login = async (e: React.FormEvent<HTMLFormElement>, email: string, password: string) => {
        e.preventDefault();
        setErrorMessage(null);
        try{
            await auth.signInWithEmailAndPassword(email, password);
            navigate('/');
        } catch(err) {
            setErrorMessage(err.message)
            console.log(err);
        }
    }

    const logOut = async () => {

        try{
            console.log('logging out');
            await auth.signOut();
        } catch(err) {
            console.log(err.message);
        }
    }

    const signUp = async (e: React.FormEvent<HTMLFormElement>, email: string, password: string) => {
        e.preventDefault();
        try{
            await auth.createUserWithEmailAndPassword(email, password);
            navigate('/');
        } catch(err) {
            setErrorMessage(err.message);
        }
    }

    const resetPassword = async (e: React.FormEvent<HTMLFormElement>, email: string) => {
        e.preventDefault();
        setErrorMessage(null)
        try {
            await auth.sendPasswordResetEmail(email);
            setMessage(`A password reset link has been sent to ${email}`)
        } catch(err) {
            setErrorMessage(err.message)
        }
    }

    return { login, logOut, errorMessage, message, signUp, resetPassword }
}