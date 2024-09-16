import React from 'react';

const EditarRecetas = () => {
    const imgUrl='https://res.cloudinary.com/dstpvt64c/image/upload/v1726074707/logo_1_qereih.png';
    return (
    <section>
        <form>
        <div className="">
                <label className="" >Actualizar Nombre de Usuario: <input type="text" className="" name='nombreUsuario' id="nombreUsuario" placeholder='Nombre de Usuario' defaultvalue='' /></label> 
            </div>
            <div className="">
                <label  className="">Actualizar Correo: <input type="text" className="" name='CorreoUsuario' id="CorreoUsuario" placeholder='Correo de Usuario' defaultvalue='' /></label>
            </div>
            <div className="">
                <label  className="">Actualizar Contraseña: <input type="text" className="" name='ContrasenaUsuario' id="ContrasenaUsuario" placeholder='Contraseña de Usuario' /></label>
            </div>
            <button type="submit" className="">Actualizar</button>
        </form>
   </section>
    );
};


export default EditarRecetas;