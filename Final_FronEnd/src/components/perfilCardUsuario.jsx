import React, { useState } from 'react';
import axios from 'axios';

const PerfilCard = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [foto, setFoto] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('correo', correo);
    if (password) {
      formData.append('password', password);
    }
    if (foto) {
      formData.append('foto', foto);
    }
  
    try {
      const token = localStorage.getItem('token');  // Asegúrate de que el token se obtiene correctamente
      const response = await axios.put('http://localhost:3000/api/update', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,  // Asegúrate de que el token JWT se envía aquí
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
    </div>
  );
};

export default PerfilCard;
