import React from 'react';
import { action, makeAutoObservable, makeObservable, observable } from 'mobx';
import firebase, { auth } from '../../../firebase/index';
class LoginStore {

    user: firebase.User;
    error: string | null = null;
    loading: boolean = true;

    constructor() {
        console.log('constructor')
        makeObservable(this, {
            user: observable,
            error: observable,
            loading: observable,
            setErrorMessage: action,
            setUser: action,
            setLoading: action,
        })
        auth.onAuthStateChanged( (user) => {
            this.setLoading(true)
            if(user) {
                console.log('User loged in', user)
                this.setUser(user);
            } else {
                console.log('User loged out')
                this.setUser(null);
            }

            this.setLoading(false);
        })
    }

    setUser(user: firebase.User) {
        this.user = user
    }
    setLoading(isLoading: boolean) {
        this.loading = isLoading;
    }
    setErrorMessage(message: string | null) {
        this.error = message;
    }

    async login(e: React.FormEvent<HTMLFormElement>, email: string, password: string) {
        e.preventDefault();
        this.setErrorMessage(null)
        try {
            console.log('email', email, 'password', password);
            await auth.signInWithEmailAndPassword(email, password);
            
        } catch(err) {
            this.setErrorMessage(err.message)
        }
    }
};

export const loginStore = new LoginStore();