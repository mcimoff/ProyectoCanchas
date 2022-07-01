const { ObjectId } = require('mongodb');
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

async function borrarReserva(id){
    const connectiondb = await conexion.getConnection();
    const reserva = await connectiondb
                     .db(DATABASE)
                     .collection(RESERVAS)
                     .deleteOne({_id : new objectId(id)});
                     
    return reserva; 
}

async function borrarReservas(){
    const connectiondb = await conexion.getConnection();
    const borrarReservas = await connectiondb
                     .db(DATABASE)
                     .collection(RESERVAS)
                     .deleteMany();
                     
    return borrarReservas; 
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


async function getReservaHora(hora){
    const connectiondb = await conexion.getConnection();



    const horaReserva = await connectiondb
                     .db(DATABASE)
                     .collection(RESERVAS)
                     .find({'reservas.hora':{$gte: hora}})
                     .toArray();
    return horaReserva;  
}

async function getReservaFecha(fecha){
    const connectiondb = await conexion.getConnection();
    const fechaReserva = await connectiondb
                     .db(DATABASE)
                     .collection(RESERVAS)
                     .find({'fecha': fecha})
                     .toArray();
                   
    return fechaReserva;  


    
}

async function agregarTurno(reserva){

    const connectiondb = await conexion.getConnection();

    const idCancha = reserva.idCancha.$oid;
    
    const reservasDeCancha = await getReservasPorCancha(idCancha);
    const validarFecha = reservasDeCancha.find(res => res.fecha == reserva.fecha);

   
    if (validarFecha != undefined) {

        reserva == null;

        console.log('Ya existe una reserva para esa Cancha, Fecha y Hora')

    } else{

        const result = await connectiondb
        .db(DATABASE)
        .collection(RESERVAS)
        .insertOne(reserva)                         
return result;  
    }

    
    
                  
}



async function getReservasPorCancha(id){
   
    const connectiondb = await conexion.getConnection();
   
    const reserva = await connectiondb
                     .db(DATABASE)
                     .collection(RESERVAS)
                     .find({"idCancha.$oid" : (id)})
                     .toArray();
    return reserva;                     
}






module.exports = {getReservas,getReserva, getReservaHora,getReservaFecha,agregarTurno,getReservasPorCancha,borrarReservas,borrarReserva};





