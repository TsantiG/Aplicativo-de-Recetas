import React, { useState } from 'react';
import axios from 'axios';  // Importamos Axios
import { useNavigate } from 'react-router-dom';  // Para redirigir programáticamente

const InicioSesion = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Hook para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();  // Evitar que el formulario recargue la página

    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        correo,  // Enviamos el correo ingresado
        password,  // Enviamos la contraseña ingresada
      });

      if (response.status === 200) {
        // Guardar el token JWT en localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId); 
        alert('Inicio de sesión exitoso');
        navigate('/bienvenida');  // Redirigir al usuario a la página de recetas
      } else {
        setError(response.data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error);
      setError('Error de conexión');
    }
  };

  // Función para redirigir a la página de registro
  const handleRegisterRedirect = () => {
    navigate('/register');  // Redirigir a la página de registro
  };

  // Función para redirigir a la página de inicio
  const handleHomeRedirect = () => {
    navigate('/');  // Redirigir a la página de inicio
  };

  return (
    <section className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      {/* Botones de navegación */}
      <div className="w-full flex justify-between mb-6">
        <button
          onClick={handleHomeRedirect}
          className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded"
        >
          Ir al Inicio
        </button>
        <button
          onClick={handleRegisterRedirect}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded"
        >
          Registrarse
        </button>
      </div>

      {/* Formulario de inicio de sesión */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">
            Correo:
            <input
              type="email"
              className="mt-2 p-2 border w-full"
              name="correoUsuario"
              id="correoUsuario"
              placeholder="Email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Contraseña:
            <input
              type="password"
              className="mt-2 p-2 border w-full"
              name="contrasenaUsuario"
              id="contrasenaUsuario"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Entrar
        </button>
      </form>
    </section>
  );
};

export default InicioSesion;
