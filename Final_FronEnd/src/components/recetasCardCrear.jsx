import React from 'react';

const CreacionReceta = () => {
    const imgUrl='https://res.cloudinary.com/dstpvt64c/image/upload/v1726074707/logo_1_qereih.png';
    return (
     <section>
        <form>
            <div className="">
                <label className="" >Ingresa el nombre de tu receta: <input type="text" className="" name='nombreReceta' id="nombreReceta" placeholder='Receta' required /></label>
                
            </div>
            <div className="">
                <label  className="">Ingresa un breve descripcion: <input type="text" className="" name='descripcionRecetas' id="descripcionRecetas" placeholder='Descripcion' required /></label>
            </div>
            <div className="">
                <label  className="">Ingresa la Preparacion: <input type="text" className="" name='preparacionRecetas' id="preparacionRecetas" placeholder='Resumen de preparacion' /></label>
            </div>
            <div className="">
                <label  className="">Ingresa los Ingredientes necesarios: <input type="text" className="" name='ingredientesRecetas' id="ingredientesRecetas" placeholder='Ingredientes' required /></label>
            </div>
            <div className="">
                <label  className="">Pon una Imagen de tu plato<input type="file" className="" name='imagenRecetas' id="imagenRecetas" placeholder='Imagen de plato Terminado' required /></label>
            </div>
            <div className="">
                <label  className="">Comparte tu procedimiento con un video: <input type="file" className="" name='videoRecetas' id="videoRecetas" placeholder='Video de preparacion de la receta' /></label>
            </div>
            <button type="submit" className="">Crear</button>
        </form>
   </section>
    );
};


export default CreacionReceta;