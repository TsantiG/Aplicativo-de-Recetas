import React from 'react';

const Header = () => {
    return (
        <header className="py-8 px-4 mx-auto max-w-xl lg:py-16 lg:px-6">
            <nav className="navbar">
                <div className="logo">
                    <a href="#"><img src="logo.png" alt="Logo" /></a>
                </div>
                <div className="nav-links">
                    <a href="#recetas">Mis Recetas</a>
                    <a href="#compartir">Compartir Recetas</a>
                    <a href="#social">Probar Algo Nuevo</a>
                </div>
                <div className="user-info">
                    <img src="profile.jpg" alt="Foto de perfil" /> 
                    <span>Nombre del Usuario</span>
                    <button className="logout-btn">Cerrar Sesión</button>
                </div>
            </nav>
        </header>
    );
};





export default Header;