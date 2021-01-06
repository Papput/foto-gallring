import React from 'react';
import { action, makeObservable, observable } from 'mobx';
import { auth } from '../../../firebase/index';
class ResetPasswordStore {

    error: string | null = null;
    info: string | null = null;

    constructor() {
        makeObservable(this, {
            error: observable,
            info: observable,
            setErrorMessage: action,
            setInfoMessage: action
        })
    }
    setErrorMessage(message: string | null) {
        this.error = message;
    }
    setInfoMessage(message: string | null) {
        this.info = message;
    }

    async resetPassword(e: React.FormEvent<HTMLFormElement>, email: string) {
        e.preventDefault();
        this.setErrorMessage(null)
        try {
            await auth.sendPasswordResetEmail(email);
            this.setInfoMessage(`A password reset link has been sent to ${email}`)
        } catch(err) {
            this.setErrorMessage(err.message)
        }
    }
};

export const resetPasswordStore = new ResetPasswordStore();