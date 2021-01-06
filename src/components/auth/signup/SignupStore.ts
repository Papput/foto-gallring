import React from 'react';
import { action, makeObservable, observable } from 'mobx';
import { auth } from '../../../firebase/index';
class SignUpStore {

    error: string | null = null;

    constructor() {
        makeObservable(this, {
            error: observable,
            setErrorMessage: action
        })
    }
    setErrorMessage(message: string | null) {
        this.error = message;
    }

    async signUp(email: string, password: string) {
        this.setErrorMessage(null)
        try {
            await auth.createUserWithEmailAndPassword(email, password);
            
        } catch(err) {
            this.setErrorMessage(err.message)
        }
    }
};

export const signUpStore = new SignUpStore();