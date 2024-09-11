import React from 'react';

const Header = () => {
    return (
            <header className="py-4 px-10 flex items-center fixed top-7 w-full justify-between bg-rosa"/* mx-auto max-w-xl lg:py-16 lg:px-6 */>
            <div className="flex flex-grow ">
                        <a href="#"><img className='h-6 w-32' src="logo.png" alt="Logo" /*fill="currentColor"*/ /></a>
                    </div>
                <nav>
                    <ul className='flex text-2xl [&>li>a]:inline-block [&>li>a]:px-6 [&>li>a]:py-1 [&>li>a]:mx-12 [&>li>a]:bg-white [&>li>a]:rounded-xl [&>li>a]:border-black [&>li>a]:border-2'>
                        <li><a href="#recetas">Mis Recetas</a></li>
                        <li><a href="#compartir">Compartir Recetas</a></li>
                        <li><a href="#social">Probar Algo Nuevo</a></li>
                    </ul>
                </nav>
                <nav className='flex flex-grow justify-end'>
                    <div className="flex">
                        <img className='inline-block px-1 py-2' src="profile.jpg" alt="Foto de perfil" /> 
                        <span className='text-xl  inline-block px-1 py-2'>Nombre del Usuario</span>
                        <button className="bg-red-800 text-white rounded-lg inline-block px-1 py-2 text-2xl justify-end">Cerrar Sesión</button>
                    </div>
                </nav>
            </header>
    );
};





export default Header;