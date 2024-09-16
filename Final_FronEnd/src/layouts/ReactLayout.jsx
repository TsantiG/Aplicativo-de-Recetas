import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ReactLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />  {/* Aquí se cargan las vistas de las rutas */}
      </main>
      <Footer />
    </>
  );
};

export default ReactLayout;
