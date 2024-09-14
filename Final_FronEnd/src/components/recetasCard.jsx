import React, { useState, useEffect } from 'react';

const VerRecetas = () => {
  // Estado para almacenar las recetas
  const [recetas, setRecetas] = useState([]);

  // Conexión a la API para obtener las recetas cuando el componente se monta
  useEffect(() => {
    const fetchRecetas = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/recetas'); // Asegúrate de que la URL de tu API esté bien configurada
        const data = await response.json();

        if (response.ok) {
          setRecetas(data); // Guardar las recetas en el estado
        } else {
          console.error('Error al obtener recetas:', data.message);
        }
      } catch (error) {
        console.error('Error al conectar con la API:', error);
      }
    };

    fetchRecetas(); // Llamar a la función para obtener las recetas
  }, []); // El array vacío significa que se ejecuta una vez al montar el componente

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recetas.map((receta) => (
        <div key={receta.id} className="card">
          <img src={receta.imagen_url} alt={receta.nombre} className="w-full h-64 object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-bold">{receta.nombre}</h3>
            <p>{receta.descripcion}</p>
            <div className="mt-4">
              <button className="btn btn-edit">Editar</button>
              <button className="btn btn-delete">Borrar</button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default VerRecetas;
