import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Importa el hook useNavigate

const PerfilCard = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [foto, setFoto] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();  // Hook para redireccionar

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const userId = localStorage.getItem('userId');  // Obtener el ID del usuario desde localStorage
    formData.append('userId', userId);
    formData.append('nombre', nombre);
    formData.append('correo', correo);
    if (password) {
      formData.append('password', password);
    }
    if (foto) {
      formData.append('foto', foto);
    }

    try {
      const response = await axios.put('http://localhost:3000/api/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setSuccess(true);
        alert('Perfil actualizado con éxito');
      }
    } catch (error) {
      setError('Error al actualizar el perfil');
      console.error('Error al actualizar el perfil:', error);
    }
  };

  // Función para redireccionar a la página de Bienvenida
  const handleBackToWelcome = () => {
    navigate('/bienvenida');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nombre:</label>
          <input
            type="text"
            className="mt-2 p-2 border w-full"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Correo:</label>
          <input
            type="email"
            className="mt-2 p-2 border w-full"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contraseña:</label>
          <input
            type="password"
            className="mt-2 p-2 border w-full"
            placeholder="Deja en blanco si no deseas cambiarla"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Foto de perfil:</label>
          <input
            type="file"
            className="mt-2 p-2 border w-full"
            accept="image/*"
            onChange={(e) => setFoto(e.target.files[0])}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">Perfil actualizado con éxito</p>}
        <button type="submit" className="w-full bg-rosa text-white p-2 rounded">
          Actualizar Perfil
        </button>
      </form>

      {/* Botón para volver a la página de bienvenida */}
      <button
        onClick={handleBackToWelcome}
        className="mt-4 w-full bg-gray-500 text-white p-2 rounded"
      >
        Volver a Bienvenida
      </button>
    </div>
  );
};

export default PerfilCard;
