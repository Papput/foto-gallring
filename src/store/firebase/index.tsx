import firebase from '../../firebase';

import { store } from '../store'

const reduxFirebaseConfig = {
}


export const reduxFirebaseprops = {
    firebase,
    config: reduxFirebaseConfig,
    dispatch: store.dispatch
    // createFirestoreInstance // <- needed if using firestore
}