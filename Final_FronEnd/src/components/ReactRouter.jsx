import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactLayout from './layouts/ReactLayout'; // Cambiar a ReactLayout
import Header from './components/Header';
import Footer from './components/Footer';

// Importación de componentes
import PageInicio from './pages/PageInicio';  // Página de inicio sin sesión
import InicioSesion from './components/InicioSesion';  // Componente de inicio de sesión
import RegistrarUsuario from './components/RegistrarUsuario';  // Registro de usuario
import PerfilCard from './components/PerfilCard';  // Perfil de usuario
import VerRecetas from './components/VerRecetas';  // Ver recetas
import CrearRecetasCard from './components/CrearRecetasCard';  // Crear recetas
import EditarRecetas from './components/EditarRecetas';  // Editar recetas
import Compartir from './components/Compartir';  // Compartir recetas
import VerCompartidas from './components/VerCompartidas';  // Ver recetas compartidas
import Social from './components/Social';  // Página social

const ReactRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas sin Header ni Footer */}
        <Route path="/" element={<PageInicio />} />
        <Route path="/login" element={<InicioSesion />} />
        <Route path="/register" element={<RegistrarUsuario />} />
        <Route path="/editarUsuario" element={<PerfilCard />} />

        {/* Rutas con Header y Footer */}
        <Route element={<ReactLayout />}>  {/* Cambiado a ReactLayout */}
          <Route path="/recetas" element={<VerRecetas />} />
          <Route path="/crearRecetas" element={<CrearRecetasCard />} />
          <Route path="/editarRecetas" element={<EditarRecetas />} />
          <Route path="/compartirReceta" element={<Compartir />} />
          <Route path="/verRecetasCompartidas" element={<VerCompartidas />} />
          <Route path="/social" element={<Social />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default ReactRouter;
