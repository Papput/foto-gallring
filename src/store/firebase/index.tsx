import firebase from '../../firebase';

import { store } from '../store'

const reduxFirebaseConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true,
}


export const reduxFirebaseprops = {
    firebase,
    config: reduxFirebaseConfig,
    dispatch: store.dispatch
    // createFirestoreInstance // <- needed if using firestore
}