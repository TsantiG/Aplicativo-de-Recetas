import React, { useState } from 'react';
import axios from 'axios';  // Importamos Axios

const RegistrarUsuario = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();  // Evita que el formulario envíe la solicitud por GET
    console.log('Formulario enviado');  
    try {
      // Hacemos la solicitud POST con Axios
      const response = await axios.post('http://localhost:3000/api/register', {
        nombre,  // Enviar los datos del estado
        correo,
        password,
      });

      if (response.status === 201) {
        setSuccess(true);  
        alert('Usuario registrado con éxito');
        window.location.href = '/login'; 
      } else {
        setError(response.data.message || 'Error al registrar el usuario');
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error);
      setError('Error de conexión');
    }
  };

  return (
    <section className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <form onSubmit={handleSubmit}>  {/* Asegúrate de tener onSubmit aquí */}
        <div className="mb-4">
          <label className="block text-gray-700">
            Nombre de Usuario:
            <input
              type="text"
              className="mt-2 p-2 border w-full"
              name="nombre"
              id="nombre"
              placeholder="Nombre de Usuario"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Correo:
            <input
              type="email"
              className="mt-2 p-2 border w-full"
              name="correo"
              id="correo"
              placeholder="Correo"
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
              name="password"
              id="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">Usuario registrado con éxito</p>}
        <button type="submit" className="w-full bg-rosa text-white p-2 rounded">
          Registrarse
        </button>
      </form>
    </section>
  );
};

export default RegistrarUsuario;
