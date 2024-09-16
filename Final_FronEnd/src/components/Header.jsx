import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState('');
  const navigate = useNavigate();

  const img1= 'https://res.cloudinary.com/dstpvt64c/image/upload/v1726499069/9131529_h0slwz.png';

  // Cargar la información del usuario al montar el componente
  useEffect(() => {
    const fetchUsuario = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:3000/api/perfil', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          setNombreUsuario(response.data.nombre); // Guardar el nombre del usuario
          setFotoPerfil(response.data.url_foto || {img1}); // Si no hay foto, usar una por defecto
        } catch (error) {
          console.error('Error al obtener los datos del perfil:', error);
        }
      }
    };

    fetchUsuario();
  }, []);

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/api/logout'); // Cerrar sesión en el backend
      localStorage.removeItem('token'); // Eliminar el token de localStorage
      navigate('/'); // Redirigir a la página de inicio
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <header className="py-4 px-10 flex items-center fixed top-7 w-full justify-between bg-rosa z-10">
      <div className="flex flex-grow justify-center">
        <a href="/">
          <img
            src="https://res.cloudinary.com/dstpvt64c/image/upload/v1726074707/logo_1_qereih.png"
            alt="Logo"
            className="h-12 w-auto"
          />
        </a>
      </div>
      <nav>
        <ul className="flex text-2xl [&>li>a]:inline-block [&>li>a]:px-6 [&>li>a]:py-1 [&>li>a]:mx-12 [&>li>a]:bg-white [&>li>a]:rounded-xl [&>li>a]:border-black [&>li>a]:border-2">
          <li><a href="/recetas">Mis Recetas</a></li>
          <li><a href="/compartir">Compartir Recetas</a></li>
          <li><a href="/social">Probar Algo Nuevo</a></li>
        </ul>
      </nav>
      <nav className="flex flex-grow justify-end">
        <div className="flex items-center space-x-4">
          {/* Imagen de perfil del usuario */}
          <img
            src={fotoPerfil}
            alt="Foto de perfil"
            className="w-12 h-12 rounded-full border-2 border-white"
          />
          {/* Nombre del usuario con redirección al perfil */}
          <span
            className="text-xl bg-white rounded-md px-4 py-2 cursor-pointer"
            onClick={() => navigate('/perfil')}
          >
            {nombreUsuario || 'Usuario'}
          </span>
          {/* Botón de cerrar sesión */}
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg text-2xl hover:bg-red-700 transition duration-200"
          >
            Cerrar Sesión
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
