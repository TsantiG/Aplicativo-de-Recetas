import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactLayout from './layouts/ReactLayout';
import ProtectedRoute from './components/ProtectedRoute'; // Importa el componente de protección
import PageInicio from './components/inicioCard.jsx';
import InicioSesion from './components/loginCard.jsx';
import RegistrarUsuario from './components/registrarseCard.jsx';
import PerfilCard from './components/perfilCardUsuario.jsx';
import VerRecetas from './components/recetasCard.jsx';
import CrearRecetasCard from './components/recetasCardCrear.jsx';
import EditarRecetas from './components/recetasCardEtitar.jsx';
import VerCompartidas from './components/compartir.jsx';
import Bienvenida from './components/bienvenida.jsx';
import FormularioCompartirReceta from './components/FormularioCompartirReceta.jsx';

// import VerCompartidas from './components/VerCompartidas';
// import Social from './components/Social';

const ReactRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas sin Header ni Footer */}
        <Route path="/" element={<PageInicio />} />
        <Route path="/login" element={<InicioSesion />} />
        <Route path="/register" element={<RegistrarUsuario />} />
        <Route path="/editarUsuario" element={<PerfilCard />} />
        <Route path="/compartir/nueva" element={<FormularioCompartirReceta />} />



        {/* Rutas con Header y Footer */}
        <Route element={<ReactLayout />}>
          {/* Aquí protegemos las rutas que requieren sesión */}
          <Route
            path="/recetas"
            element={
              <ProtectedRoute>
                <VerRecetas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/crearRecetas"
            element={
              <ProtectedRoute>
                <CrearRecetasCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editarRecetas/:recetaId"
            element={
              <ProtectedRoute>
                <EditarRecetas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/compartirReceta"
            element={
              <ProtectedRoute>
                <VerCompartidas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bienvenida"
            element={
              <ProtectedRoute>
                <Bienvenida />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/verRecetasCompartidas"
            element={
              <ProtectedRoute>
                <VerCompartidas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/social"
            element={
              <ProtectedRoute>
                <Social />
              </ProtectedRoute>
            }
          /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default ReactRouter;
