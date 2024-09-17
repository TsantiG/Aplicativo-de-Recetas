import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Social = () => {
  const [recetas, setRecetas] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Función para obtener todas las recetas compartidas
    const fetchRecetasCompartidas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/compartir/compartidas');
        setRecetas(response.data);
      } catch (error) {
        console.error('Error al obtener las recetas compartidas:', error);
        setError('Error al obtener las recetas compartidas');
      } finally {
        setLoading(false);
      }
    };

    fetchRecetasCompartidas();
  }, []);

  if (loading) {
    return <p>Cargando recetas compartidas...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (recetas.length === 0) {
    return <p>No hay recetas compartidas por el momento.</p>;
  }

  return (
    <main className="flex flex-col items-center py-10 px-4 mt-16">
      {recetas.map((receta) => (
        <div
          key={receta.id}
          className="flex w-full max-w-5xl bg-white border rounded-md shadow-md p-6 mb-4"
          style={{ marginLeft: '1rem', marginRight: '1rem' }} // Añadir margen a los lados
        >
          {/* Imagen de la receta */}
          <img
            src={receta.imagen_url}
            alt={receta.receta_nombre}
            className="h-40 w-40 object-cover rounded-md mr-6"
          />

          {/* Información de la receta */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{receta.receta_nombre}</h2>
            <p className="text-gray-700 mb-2">Descripción: {receta.descripcion}</p>
            <p className="text-gray-700 mb-2">Ingredientes: {receta.ingredientes}</p>
            <p className="text-gray-700 mb-2">Instrucciones: {receta.instrucciones}</p>
            <p className="text-rosa font-bold mb-2">Tipo: {receta.tipo_receta}</p>
            <p className="text-rosa font-bold mb-2">Región: {receta.region_receta}</p>
            <p className="text-gray-500">Compartido por: {receta.usuario_nombre}</p>
          </div>
        </div>
      ))}
    </main>
  );
};

export default Social;
