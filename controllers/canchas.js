const canchas = require('../data/canchas');


async function getCanchas(){
    return canchas.getCanchas();
}

async function agregarCancha(cancha){
         
        cancha.size = 8;
        cancha.nombre = "Paraguay";
        cancha.precio = 1800;
    
    return canchas.agregarCancha(cancha);
}

async function borrarCancha(id){
    return canchas.borrarCancha(id);
}

async function getCancha(id){
    return canchas.getCancha(id);
}

async function sizeCancha(size){
    return canchas.sizeCancha(size);
}

async function modificarNombreCancha(id){
    return canchas.modificarNombreCancha(id);
}

async function modificarSize(id){
    return canchas.modificarSize(id);
}

async function modificarPrecio(id){
    return canchas.modificarPrecio(id);
}



module.exports = {getCanchas,agregarCancha,borrarCancha,getCancha,sizeCancha,modificarNombreCancha,modificarSize,modificarPrecio};