import React from 'react';

const InicioSesion = () => {
    const imgUrl='https://res.cloudinary.com/dstpvt64c/image/upload/v1726074707/logo_1_qereih.png';
    return (
    <section>
        <form>
            <div className="">
                <label className="" >Correo: <input type="email" className="" name='correoUsuario' id="correoUsuario" placeholder='Email' required /></label> 
            </div>
            <div className="">
                <label  className="">Contraseña:  <input type="password" className="" name='contrasenaUsuario' id="contrasenaUsuario" placeholder='Password' required /></label>
            </div>
            <button type="submit" className="">Entrar</button>
        </form>
   </section>
    );
};


export default InicioSesion;