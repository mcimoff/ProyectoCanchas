const reservas = require('../data/reservas');

async function getReservas(){
    return reservas.getReservas();
}

async function getReserva(id){
    return reservas.getReserva(id);
}



async function getReservaHora(hora){
    return reservas.getReservaHora(hora);
}

async function getReservaFecha(){
   return reservas.getReservaFecha();
    
}


async function borrarReservas(){
    return reservas.borrarReservas();
}

async function agregarTurno(reserva){
     

    return reservas.agregarTurno(reserva);
}

async function getReservasPorCancha(idCancha){

    return reservas.getReservasPorCancha(idCancha);
}

async function borrarReserva(id){
    return reservas.borrarReserva(id);
}

module.exports = {getReservas,getReserva,getReservaHora, getReservaFecha,agregarTurno,getReservasPorCancha,borrarReservas,borrarReserva};