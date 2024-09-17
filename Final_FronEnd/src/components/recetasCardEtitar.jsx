import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';  // Para redirigir y obtener el ID de la receta

const EditarRecetas = () => {
  const { recetaId } = useParams();  // Obtener el ID de la receta desde la URL
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [instrucciones, setInstrucciones] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();  // Para redirigir al usuario

  useEffect(() => {
    // Obtener los datos de la receta actual
    const fetchReceta = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/api/recetas/${recetaId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const receta = response.data;
        setNombre(receta.nombre);
        setDescripcion(receta.descripcion);
        setIngredientes(receta.ingredientes);
        setInstrucciones(receta.instrucciones);
        setImagenUrl(receta.imagen_url);
      } catch (error) {
        console.error('Error al obtener la receta:', error);
        setError('Error al obtener la receta.');
      } finally {
        setLoading(false);
      }
    };

    fetchReceta();
  }, [recetaId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const updatedReceta = {
        nombre,
        descripcion,
        ingredientes,
        instrucciones,
        imagen_url: imagenUrl,  // Por si también se quiere actualizar la imagen
      };
      await axios.put(`http://localhost:3000/api/recetas/${recetaId}`, updatedReceta, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      alert('Receta actualizada con éxito.');
      navigate('/recetas');  // Redirigir a la página de ver recetas
    } catch (error) {
      console.error('Error al actualizar la receta:', error);
      setError('Error al actualizar la receta.');
    }
  };

  const handleBack = () => {
    navigate('/recetas');  // Redirigir a la página de ver recetas
  };

  if (loading) {
    return <p>Cargando receta...</p>;
  }

  return (
    <div className='mt-16 h-screen'>
    <section className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Editar Receta</h2>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">
            Nombre de la Receta:
            <input
              type="text"
              className="mt-2 p-2 border w-full"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Descripción:
            <textarea
              className="mt-2 p-2 border w-full"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Ingredientes:
            <textarea
              className="mt-2 p-2 border w-full"
              value={ingredientes}
              onChange={(e) => setIngredientes(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Instrucciones:
            <textarea
              className="mt-2 p-2 border w-full"
              value={instrucciones}
              onChange={(e) => setInstrucciones(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            URL de la imagen:
            <input
              type="text"
              className="mt-2 p-2 border w-full"
              value={imagenUrl}
              onChange={(e) => setImagenUrl(e.target.value)}
            />
          </label>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="bg-gray-500 text-white py-2 px-4 rounded"
          >
            Atrás
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Actualizar Receta
          </button>
        </div>
      </form>
    </section></div>
  );
};

export default EditarRecetas;
