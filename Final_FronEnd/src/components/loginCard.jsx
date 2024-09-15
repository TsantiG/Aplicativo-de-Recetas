import React, { useState } from 'react';

const InicioSesion = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();  // Evitar que el formulario recargue la página

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo,  // Enviamos el correo ingresado
          password,  // Enviamos la contraseña ingresada
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar el token JWT en localStorage
        localStorage.setItem('token', data.token);
        alert('Inicio de sesión exitoso');
        navigate('/index');
      } else {
        setError(data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error);
      setError('Error de conexión');
    }
  };

  return (
    <section className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">
            Correo:
            <input
              type="email"
              className="mt-2 p-2 border w-full"
              name="correoUsuario"
              id="correoUsuario"
              placeholder="Email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Contraseña:
            <input
              type="password"
              className="mt-2 p-2 border w-full"
              name="contrasenaUsuario"
              id="contrasenaUsuario"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Entrar
        </button>
      </form>
    </section>
  );
};

export default InicioSesion;
