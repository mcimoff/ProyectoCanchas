const canchas = require('../data/canchas');

async function getCanchas(){
    return canchas.getCanchas();
}

async function agregarTurno(cancha){

   
    for (let index = 0; index < 11; index++) {
        
        //const cancha.turnos;
        
        cancha._id = cancha._id;
        cancha.nombre = cancha.nombre;
        cancha.hora = 10 + index;
        cancha.estaReservada = false;
        cancha.fecha = new Date();
        
    }

    return canchas.agregarTurno(cancha);
}

module.exports = {getCanchas,agregarTurno};