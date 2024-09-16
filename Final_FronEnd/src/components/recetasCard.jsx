import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VerRecetas = () => {
  const [recetas, setRecetas] = useState([]);  // Estado para almacenar las recetas del usuario
  const [error, setError] = useState(null);    // Estado para manejar errores
  const [loading, setLoading] = useState(true);  // Estado para manejar el loading

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
        setRecetas(response.data);  // Guardar las recetas en el estado
      } catch (error) {
        console.error('Error al obtener las recetas del usuario:', error);
        setError('Error al obtener las recetas');
      } finally {
        setLoading(false);
      }
    };

    fetchRecetasUsuario();
  }, []);  // Solo se ejecuta una vez cuando el componente se monta

  if (loading) {
    return <p>Cargando recetas...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (recetas.length === 0) {
    return <p>No has creado recetas aún.</p>;
  }

  return (
    <main className="flex flex-wrap justify-center gap-6 py-10 px-4">
      {recetas.map((receta) => (
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
        </div>
      ))}
    </main>
  );
};

export default VerRecetas;
