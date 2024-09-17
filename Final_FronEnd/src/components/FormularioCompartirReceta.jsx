import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormularioCompartirReceta = () => {
  const [recetas, setRecetas] = useState([]);
  const [regiones, setRegiones] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [recetaId, setRecetaId] = useState('');
  const [regionId, setRegionId] = useState('');
  const [tipoId, setTipoId] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener las recetas del usuario
    const fetchRecetas = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:3000/api/recetas/usuario/recetas`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecetas(response.data);
      } catch (error) {
        console.error('Error al obtener las recetas:', error);
        setError('Error al obtener las recetas');
      }
    };

    // Obtener las regiones
    const fetchRegiones = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categorias/regiones');
        console.log(response.data);
        setRegiones(response.data);
      } catch (error) {
        console.error('Error al obtener las regiones:', error);
      }
    };

    // Obtener los tipos
    const fetchTipos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categorias/tipos');
        console.log(response.data);
        setTipos(response.data);
      } catch (error) {
        console.error('Error al obtener los tipos:', error);
      }
    };

    fetchRecetas();
    fetchRegiones();
    fetchTipos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3000/api/compartir/compartir',
        {
          id_receta: recetaId,
          id_region: regionId,
          id_tipo: tipoId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Receta compartida con éxito.');
      navigate('/compartirReceta');  // Redirigir al usuario a la página de recetas compartidas
    } catch (error) {
      console.error('Error al compartir la receta:', error);
      setError('Error al compartir la receta');
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <section className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Compartir Receta</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">
            Selecciona una receta:
            <select
              value={recetaId}
              onChange={(e) => setRecetaId(e.target.value)}
              className="mt-2 p-2 border w-full"
              required
            >
              <option value="">Selecciona una receta</option>
              {recetas.map((receta) => (
                <option key={receta.id} value={receta.id}>
                  {receta.nombre}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Selecciona la región:
            <select
              value={regionId}
              onChange={(e) => setRegionId(e.target.value)}
              className="mt-2 p-2 border w-full text-black bg-white" // Asegúrate de que el texto y fondo sean visibles
              required
            >
              <option value="">Selecciona una región</option>
              {regiones.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.region} {/* Cambiamos 'nombre' por 'region' */}
                </option>
              ))}
            </select>

          </label>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Selecciona el tipo de receta:
            <select
              value={tipoId}
              onChange={(e) => setTipoId(e.target.value)}
              className="mt-2 p-2 border w-full text-black bg-white" // Asegúrate de que el texto y fondo sean visibles
              required
            >
              <option value="">Selecciona un tipo</option>
              {tipos.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.tipo} {/* Cambiamos 'nombre' por 'tipo' */}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Compartir Receta
        </button>
      </form>
    </section>
  );
};

export default FormularioCompartirReceta;
