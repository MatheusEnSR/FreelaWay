// frontend/src/utils/ProtectedRoute.jsx

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        // Se não há usuário, redireciona para o login
        return <Navigate to="/login" />;
    }

    if (role && user.user_type !== role) {
        // Se o usuário não tem a função correta, redireciona para a home
        alert('Acesso não autorizado.');
        return <Navigate to="/" />;
    }

    // Se tudo estiver ok, renderiza a página
    return children;
};

export default ProtectedRoute;