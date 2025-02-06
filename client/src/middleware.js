import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './context/UserContext';

const AuthMiddleware = ({ children }) => {
    const { user, loading } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [user,loading, navigate]);

    return user ? children : null;
};

export default AuthMiddleware;