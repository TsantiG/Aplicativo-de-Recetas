import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Para redirigir al editar receta

const VerRecetas = () => {
  const [recetas, setRecetas] = useState([]);  // Estado para almacenar las recetas del usuario
  const [error, setError] = useState(null);    // Estado para manejar errores
  const [loading, setLoading] = useState(true);  // Estado para manejar el loading
  const navigate = useNavigate();  // Hook para redirigir al editar receta

  useEffect(() => {
    // Función para obtener las recetas del usuario autenticado
    const fetchRecetasUsuario = async () => {
      try {
        const token = localStorage.getItem('token');  // Obtener el token JWT desde localStorage
        const response = await axios.get('http://localhost:3000/api/recetas/usuario/recetas', {
          headers: {
            'Authorization': `Bearer ${token}`,  // Enviar el token en el header
          },
        });
        setRecetas(response.data || []);  // Guardar las recetas en el estado, asegurando que siempre sea un array
      } catch (error) {
        console.error('Error al obtener las recetas del usuario:', error);
        setError('Error al obtener las recetas');
      } finally {
        setLoading(false);
      }
    };

    fetchRecetasUsuario();
  }, []);  // Solo se ejecuta una vez cuando el componente se monta

  // Función para redirigir a la página de edición de una receta
  const handleEditReceta = (recetaId) => {
    navigate(`/editarRecetas/${recetaId}`);  // Redirige a la página de edición con el ID de la receta
  };

  // Función para borrar una receta
  const handleDeleteReceta = async (recetaId) => {
    const token = localStorage.getItem('token');  // Obtener el token desde localStorage
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar esta receta?');

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/api/recetas/${recetaId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,  // Enviar el token en el header
          },
        });
        // Eliminar la receta de la lista localmente tras borrarla en el backend
        setRecetas(recetas.filter((receta) => receta.id !== recetaId));
        alert('Receta eliminada con éxito');
      } catch (error) {
        console.error('Error al eliminar la receta:', error);
        setError('Error al eliminar la receta');
      }
    }
  };

  // Botón para crear una receta
  const handleCreateReceta = () => {
    navigate('/crearRecetas');  // Redirige a la página de creación de recetas
  };

  if (loading) {
    return <p>Cargando recetas...</p>;
  }

  return (
    <div className='h-screen'>
      <div className="flex justify-center my-4 mt-10 ">
        <button
          onClick={handleCreateReceta}
          className="bg-green-500 text-white mt-20 py-2 px-6 rounded-lg"
        >
          Crear Nueva Receta
        </button>
      </div>

      {/* Mostrar recetas o mensaje si no hay recetas */}
      <main className="flex flex-wrap justify-center gap-6 py-10 px-4">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : recetas.length === 0 ? (
          <p>No has creado recetas aún.</p>
        ) : (
          recetas.map((receta) => (
            <div key={receta.id} className="w-full max-w-sm bg-white border rounded-md shadow-md p-4">
              <img
                src={receta.imagen_url}
                alt={receta.nombre}
                className="h-40 w-full object-cover rounded-t-md"
              />
              <div className="p-4">
                <h2 className="text-2xl font-bold text-gray-900">{receta.nombre}</h2>
                <p className="text-gray-600">{receta.descripcion}</p>
                <p className="text-rosa font-bold">Ingredientes: {receta.ingredientes}</p>
                <p className="text-gray-700 mt-2">Instrucciones: {receta.instrucciones}</p>
              </div>

              {/* Botones para editar y eliminar receta */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEditReceta(receta.id)}
                  className="bg-blue-500 text-white py-1 px-4 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteReceta(receta.id)}
                  className="bg-red-500 text-white py-1 px-4 rounded"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default VerRecetas;
