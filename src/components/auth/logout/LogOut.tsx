import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth'
import { CLEAR_IMAGE_ARRAY } from '../../../store/imagesReducer';

const LogOut = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: CLEAR_IMAGE_ARRAY });
        logOut();
        navigate('/login');
    }, [logOut, dispatch, navigate])
    return (
        <div>
            Logging out
        </div>
    )
}

export default LogOut
