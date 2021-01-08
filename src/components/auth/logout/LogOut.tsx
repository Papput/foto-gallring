import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth'

const LogOut = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        logOut();
        navigate('/login');
    }, [logOut])
    return (
        <div>
            Logging out
        </div>
    )
}

export default LogOut
