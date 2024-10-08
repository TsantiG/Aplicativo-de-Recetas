import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';  // Importa `Link`

const Header = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState('');
  const navigate = useNavigate();

  const img1 = 'https://res.cloudinary.com/dstpvt64c/image/upload/v1726499069/9131529_h0slwz.png';

  useEffect(() => {
    const fetchUsuario = async () => {
      const userId = localStorage.getItem('userId');  // Obtener el ID del usuario desde localStorage
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:3000/api/perfil`, {
            params: { userId }  // Enviar el userId como parámetro de consulta
          });
          setNombreUsuario(response.data.nombre);
          setFotoPerfil(response.data.url_foto || img1);
        } catch (error) {
          console.error('Error al obtener los datos del perfil:', error);
        }
      } else {
        console.error('No se encontró el ID del usuario en localStorage.');
      }
    };

    fetchUsuario();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/api/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');  // Eliminar el userId al cerrar sesión
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <header className="py-4 px-10 flex items-center fixed top-7 w-full justify-between bg-rosa z-10">

      <div className="flex flex-grow justify-start">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dstpvt64c/image/upload/v1726074707/logo_1_qereih.png"
            alt="Logo"
            className="h-12 w-auto"
          />
        </Link>
      </div>


      <nav>
        <ul className="flex text-2xl [&>li>a]:inline-block [&>li>a]:px-6 [&>li>a]:py-1 [&>li>a]:mx-12 [&>li>a]:bg-white [&>li>a]:rounded-xl [&>li>a]:border-black [&>li>a]:border-2">
          <li><Link to="/recetas">Mis Recetas</Link></li>
          <li><Link to="/compartirReceta">Compartir Recetas</Link></li>
          <li><Link to="/social">Probar Algo Nuevo</Link></li>
        </ul>
      </nav>


      <nav className="flex flex-grow justify-end">
        <div className="flex items-center space-x-4">

          <img
            src={fotoPerfil}
            alt="Foto de perfil"
            className="w-12 h-12 rounded-full border-2 border-white"
          />

          <span
            className="text-xl bg-white rounded-md px-4 py-2 cursor-pointer"
            onClick={() => navigate('/editarUsuario')}
          >
            {nombreUsuario || 'Usuario'}
          </span>

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
