const conexion = require('./conexion');
const DATABASE = 'reservacanchas';
const RESERVAS = 'reservas';
const objectId = require('mongodb').ObjectId;

const fechaActual = new Date()

console.log(fechaActual);

async function getReservas(){
    const connectiondb = await conexion.getConnection();
    const reservas = await connectiondb
                     .db(DATABASE)
                     .collection(RESERVAS)
                     .find()
                     .toArray();
    return reservas;                     
}

async function getReserva(id){
    const connectiondb = await conexion.getConnection();
    const reserva = await connectiondb
                     .db(DATABASE)
                     .collection(RESERVAS)
                     .find({_id: new objectId(id)})
                     .toArray();
    return reserva;                     
}

async function getReservasLibres(){
    const connectiondb = await conexion.getConnection();
    const libre = await connectiondb
                     .db(DATABASE)
                     .collection(RESERVAS)
                     .find({'turnos.estaReservada': false})
                     .toArray();
    return libre;  
}

async function getReservaHora(hora){
    const connectiondb = await conexion.getConnection();
    const horaReserva = await connectiondb
                     .db(DATABASE)
                     .collection(RESERVAS)
                     .find({'turnos.hora': parseInt(hora)})
                     .toArray();
    return horaReserva;  
}

async function getReservaFecha(){
    const connectiondb = await conexion.getConnection();
    const fechaReserva = await connectiondb
                     .db(DATABASE)
                     .collection(RESERVAS)
                     .find({'turnos.fecha':{$gte: fechaActual}})
                     .toArray();
                   
    return fechaReserva;  
}








module.exports = {getReservas,getReserva,getReservasLibres, getReservaHora,getReservaFecha};