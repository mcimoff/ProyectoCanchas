const reservas = require('../data/reservas');

async function getReservas(){
    return reservas.getReservas();
}

async function getReserva(id){
    return reservas.getReserva(id);
}

async function getReservasLibres(){
    return reservas.getReservasLibres();
}

async function getReservaHora(hora){
    return reservas.getReservaHora(hora);
}

async function getReservaFecha(){
   return reservas.getReservaFecha();
    
}

async function agregarTurno(reserva){
        
    return reservas.agregarTurno(reserva);
}

async function getReservasPorCancha(idCancha){

    return reservas.getReservasPorCancha(idCancha);
}

module.exports = {getReservas,getReserva,getReservasLibres,getReservaHora, getReservaFecha,agregarTurno,getReservasPorCancha};