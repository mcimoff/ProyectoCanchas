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

module.exports = {getReservas,getReserva,getReservasLibres,getReservaHora, getReservaFecha};