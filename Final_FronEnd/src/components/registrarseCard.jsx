import React from 'react';

const RegistrarUsuario = () => {
    const imgUrl='https://res.cloudinary.com/dstpvt64c/image/upload/v1726074707/logo_1_qereih.png';
    return (
     <section>
        <form>
            <div className="">
                <label className="" >Nombre de Usuario: <input type="text" className="" name='nombreUsuario' id="nombreUsuario" placeholder='Nombre de Usuario' required /></label> 
            </div>
            <div className="">
                <label  className="">Correo: <input type="text" className="" name='CorreoUsuario' id="CorreoUsuario" placeholder='Correo de Usuario' required /></label>
            </div>
            <div className="">
                <label  className="">Contraseña: <input type="text" className="" name='ContrasenaUsuario' id="ContrasenaUsuario" placeholder='Contraseña de Usuario' required /></label>
            </div>
            <button type="submit" className="">Registrarse</button>
        </form>
   </section>
    );
};

export default RegistrarUsuario;