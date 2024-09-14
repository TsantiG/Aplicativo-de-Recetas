import React from 'react';

const ActualizacionReceta = () => {
    const imgUrl='https://res.cloudinary.com/dstpvt64c/image/upload/v1726074707/logo_1_qereih.png';
    return (
     <section>
        <form>
            <div className="">
                <label className="" >Actualizar el nombre de tu receta: <input type="text" className="" name='nombreReceta' id="nombreReceta" placeholder='Receta' defaultvalue='' /></label> 
            </div>
            <div className="">
                <label  className="">Actualizar la descripcion: <input type="text" className="" name='descripcionRecetas' id="descripcionRecetas" placeholder='Descripcion' defaultvalue='' /></label>
            </div>
            <div className="">
                <label  className="">Actualizar la Preparacion: <input type="text" className="" name='preparacionRecetas' id="preparacionRecetas" placeholder='Resumen de preparacion' defaultvalue='' /></label>
            </div>
            <div className="">
                <label  className="">Actualizar los Ingredientes necesarios: <input type="text" className="" name='ingredientesRecetas' id="ingredientesRecetas" placeholder='Ingredientes' defaultvalue='' /></label>
            </div>
            <div className="">
                <label  className="">Actualizar tu Imagen<input type="file" className="" name='imagenRecetas' id="imagenRecetas" placeholder='Imagen de plato Terminado' /></label>
            </div>
            <div className="">
                <label  className="">Actualizar el video: <input type="file" className="" name='videoRecetas' id="videoRecetas" placeholder='Video de preparacion de la receta' /></label>
            </div>
            <button type="submit" className="">Actualizar</button>
        </form>
   </section>
    );
};

export default ActualizacionReceta;