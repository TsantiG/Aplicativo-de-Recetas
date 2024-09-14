import React from 'react';

const Header = () => {
    const imgUrl='https://res.cloudinary.com/dstpvt64c/image/upload/v1726074707/logo_1_qereih.png';
    return (
        <header className="py-4 px-10 flex items-center fixed top-7 w-full justify-between bg-rosa z-10">
            <div className="flex flex-grow">
            <a href="#"></a>
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
                        <span className='text-xl bg-white rounded-md inline-block px-2 py-2'>Nombre del Usuario</span>
                        <button className="bg-red-800 text-white rounded-lg inline-block px-1 py-2 text-2xl justify-end">Cerrar Sesión</button>
                    </div>
                </nav>
            </header>
    );
};


export default Header;