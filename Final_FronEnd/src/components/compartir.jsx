import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Para redirigir

const VerCompartidas = () => {
  const [recetas, setRecetas] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Para manejar redirecciones

  useEffect(() => {
    const fetchRecetasCompartidas = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId'); // Asegúrate de tener el ID del usuario almacenado

      // Verificar si el usuario está autenticado
      if (!token || !userId) {
        setError('Usuario no autenticado. Redirigiendo a inicio de sesión...');
        setTimeout(() => navigate('/login'), 2000); // Redirigir al login si no hay token o userId
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/api/compartir/usuario/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Verificar si los campos 'region_receta' y 'tipo_receta' están presentes en los datos recibidos
        console.log(response.data); // Verificar qué datos se están recibiendo
        setRecetas(response.data);
      } catch (error) {
        console.error('Error al obtener las recetas compartidas:', error);
        setError('Error al obtener las recetas compartidas');
      } finally {
        setLoading(false);
      }
    };

    fetchRecetasCompartidas();
  }, [navigate]);

  // Redirigir al formulario para compartir una receta
  const handleNuevaReceta = () => {
    navigate('/compartir/nueva');
  };

  if (loading) {
    return <p>Cargando recetas compartidas...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <main className="flex flex-col items-center py-10 px-4">
      {/* Botón para agregar una nueva receta compartida */}
      <button
        onClick={handleNuevaReceta}
        className="mb-6 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Compartir Nueva Receta
      </button>

      <div className="flex flex-wrap justify-center gap-6">
        {recetas.length === 0 ? (
          <p>No has compartido recetas aún.</p>
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
                {/* Mostrar la región y el tipo, si están disponibles */}
                <p className="text-rosa font-bold">Región: {receta.region_receta || 'N/A'}</p>
                <p className="text-rosa font-bold">Tipo: {receta.tipo_receta || 'N/A'}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default VerCompartidas;
