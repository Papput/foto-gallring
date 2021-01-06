import React, { FC } from 'react';
import { observer } from 'mobx-react'
import { Navigate, Route} from 'react-router-dom';
import { loginStore } from './login/LoginStore';

type Props = {
    path?: string
}

const AuthRoute: FC<Props> = (props) => {
    return (
        loginStore.user 
            ? (<Route {...props} />)
            : <Navigate to="/login" />
    )
}

export default observer(AuthRoute);