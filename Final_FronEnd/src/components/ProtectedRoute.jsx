import React from 'react';
import { Navigate } from 'react-router-dom';

// Componente para proteger rutas
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');  // Aquí verificas si el usuario tiene un token de sesión
  
  if (!token) {
    // Si no hay token, redirigir al usuario a la página de login
    return <Navigate to="/login" />;
  }

  // Si el token existe, mostrar el contenido protegido
  return children;
};

export default ProtectedRoute;
