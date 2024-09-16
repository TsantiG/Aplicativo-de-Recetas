import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PageInicio = () => {
  const [recetas, setRecetas] = useState([]);  // Estado para almacenar las recetas
  const [error, setError] = useState(null);  // Estado para manejar errores

  useEffect(() => {
    // Función para obtener las recetas compartidas
    const fetchRecetasCompartidas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/compartir/compartidas');
        setRecetas(response.data);  // Guardar las recetas en el estado
      } catch (error) {
        console.error('Error al obtener las recetas compartidas:', error);
        setError('Error al obtener las recetas compartidas');
      }
    };

    fetchRecetasCompartidas();
  }, []);  // Solo se ejecuta una vez cuando el componente se monta

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <main className="flex flex-wrap justify-center gap-6 py-10 px-4">
      {recetas.length === 0 ? (
        <p>No hay recetas compartidas por el momento.</p>
      ) : (
        recetas.map((receta) => (
          <div key={receta.id} className="w-full max-w-sm bg-white border rounded-md shadow-md p-4">
            <img
              src={receta.imagen_url}
              alt={receta.receta_nombre}
              className="h-40 w-full object-cover rounded-t-md"
            />
            <div className="p-4">
              <h2 className="text-2xl font-bold text-gray-900">{receta.receta_nombre}</h2>
              <p className="text-gray-600">{receta.descripcion}</p>
              <p className="text-rosa font-bold">Región: {receta.region_receta}</p>
              <p className="text-rosa font-bold">Tipo: {receta.tipo_receta}</p>
              <p className="text-gray-700 mt-2">Compartido por: {receta.usuario_nombre}</p>
            </div>
          </div>
        ))
      )}
    </main>
  );
};


export default PageInicio;