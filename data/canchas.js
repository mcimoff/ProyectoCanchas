const conexion = require('./conexion');
const DATABASE = 'reservacanchas';
const CANCHAS = 'canchas';
const objectId = require('mongodb').objectId


async function agregarTurno(cancha){
    const connectiondb = await conexion.getConnection();
    const nuevoTurno = await connectiondb
                     .db(DATABASE)
                     .collection(CANCHAS)
                     .insertOne(cancha)
                     

    return nuevoTurno;                 
}



module.exports = {agregarTurno};