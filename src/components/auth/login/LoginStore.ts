import { action, makeAutoObservable, makeObservable, observable } from 'mobx';
import firebase, { auth } from '../../../firebase/index';
class LoginStore {

    user: firebase.User;
    error: string | null = null;

    constructor() {
        console.log('constructor')
        makeObservable(this, {
            user: observable,
            error: observable,
            setErrorMessage: action,
        })
        auth.onAuthStateChanged( (user) => {
            if(user) {
                console.log('User loged in', user)
                this.user = user;
            } else {
                console.log('User loged out')
                this.user = null;
            }
        })
    }

    setErrorMessage(message: string | null) {
        this.error = message;
    }

    async login(e: any, email: string, password: string) {
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