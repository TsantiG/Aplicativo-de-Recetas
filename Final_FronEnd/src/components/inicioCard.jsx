import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PageInicio = () => {
  const [recetas, setRecetas] = useState([]);  // Estado para almacenar las recetas
  const [error, setError] = useState(null);  // Estado para manejar errores
  const navigate = useNavigate();  // Hook para redirigir

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

  // Función para redirigir a la página de login
  const handleLoginRedirect = () => {
    navigate('/login');  // Redirige al usuario a la página de login
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <main className="flex flex-col items-center py-10 px-4">
      {/* Contenedor del logo y botón de login */}
      <div className="w-full flex justify-between items-center mb-6">
        {/* Logo de la página */}
        <img
          src="https://res.cloudinary.com/dstpvt64c/image/upload/v1726074707/logo_1_qereih.png"  // Reemplaza con la URL de tu logo
          alt="Logo de la página"
          className="h-12 w-auto"  // Tamaño del logo
        />

        {/* Botón para redirigir al login */}
        <button
          onClick={handleLoginRedirect}
          className="bg-rosa text-white font-bold py-2 px-4 rounded"
        >
          Iniciar Sesión
        </button>
      </div>

      {/* Mostrar recetas compartidas */}
      <div className="flex flex-wrap justify-center gap-6">
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
      </div>
    </main>
  );
};

export default PageInicio;
