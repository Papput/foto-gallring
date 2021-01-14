import React, { FC } from 'react';
import { Navigate, Route} from 'react-router-dom';

import { isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux'
import { RootState } from '../../store/rootReducer';
import LoaderComponent from '../loader/LoaderComponent';

type Props = {
    path?: string
}

const AuthRoute: FC<Props> = (props) => {
    const auth = useSelector((state: RootState) => state.firebase.auth);
    if(!isLoaded) {
        return <LoaderComponent />
    }
    return (
        !auth.isEmpty 
            ? (<Route {...props} />)
            : <Navigate to="/login" />
    )
}

export default AuthRoute;