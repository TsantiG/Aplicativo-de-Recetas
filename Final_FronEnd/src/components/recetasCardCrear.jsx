import React, { useState } from 'react';
import axios from 'axios';

const CrearRecetasCard = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [instrucciones, setInstrucciones] = useState('');
  const [imagen, setImagen] = useState(null);  // Para manejar la subida de imágenes
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);  // Resetear el estado de error
    setSuccess(false);  // Resetear el estado de éxito

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('ingredientes', ingredientes);
    formData.append('instrucciones', instrucciones);
    formData.append('imagen', imagen);

    try {
      const token = localStorage.getItem('token');  // Obtener el token JWT del localStorage
      const response = await axios.post('http://localhost:3000/api/recetas/create', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setSuccess(true);
        setNombre('');
        setDescripcion('');
        setIngredientes('');
        setInstrucciones('');
        setImagen(null);
        alert('Receta creada con éxito');
      } else {
        setError(response.data.message || 'Error al crear la receta');
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error);
      setError('Error de conexión');
    }
  };

  return (
    <section className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nombre de la Receta:</label>
          <input
            type="text"
            className="mt-2 p-2 border w-full"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Descripción:</label>
          <textarea
            className="mt-2 p-2 border w-full"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Ingredientes:</label>
          <textarea
            className="mt-2 p-2 border w-full"
            value={ingredientes}
            onChange={(e) => setIngredientes(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Instrucciones:</label>
          <textarea
            className="mt-2 p-2 border w-full"
            value={instrucciones}
            onChange={(e) => setInstrucciones(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Imagen:</label>
          <input
            type="file"
            className="mt-2 p-2 border w-full"
            accept="image/*"
            onChange={(e) => setImagen(e.target.files[0])}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">Receta creada con éxito</p>}
        <button type="submit" className="w-full bg-rosa text-white p-2 rounded">
          Crear Receta
        </button>
      </form>
    </section>
  );
};

export default CrearRecetasCard;
