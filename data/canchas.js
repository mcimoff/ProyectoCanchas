const conexion = require('./conexion');
const DATABASE = 'reservacanchas';
const CANCHAS = 'canchas';
const objectId = require('mongodb').ObjectId



async function getCanchas(){
    const connectiondb = await conexion.getConnection()
    const canchas = await connectiondb
                     .db(DATABASE)
                     .collection(CANCHAS)
                     .find()
                     .toArray()
    return canchas;
}

async function agregarCancha(cancha){
    const connectiondb = await conexion.getConnection();
    const nuevoCancha = await connectiondb
                     .db(DATABASE)
                     .collection(CANCHAS)
                     .insertOne(cancha)
                     

    return nuevoCancha;                 
}

async function borrarCancha(id){
    const connectiondb = await conexion.getConnection();
    const borrarCancha = await connectiondb
                     .db(DATABASE)
                     .collection(CANCHAS)
                     .deleteOne({_id: new objectId(id)})
                     
    return borrarCancha; 
}

async function getCancha(id){
    const connectiondb = await conexion.getConnection()
    const cancha = await connectiondb
                     .db(DATABASE)
                     .collection(CANCHAS)
                     .find({_id: new objectId(id)})
                     .toArray()
    return cancha;
}

async function sizeCancha(size){
    const connectiondb = await conexion.getConnection()
    const tamanio = await connectiondb
                     .db(DATABASE)
                     .collection(CANCHAS)
                     .find({'size': parseInt(size)})
                     .toArray()
    return tamanio;
}

async function modificarNombreCancha(id){
    const connectiondb = await conexion.getConnection()
    const nombreModificado = await connectiondb
                     .db(DATABASE)
                     .collection(CANCHAS)
                     .update({'_id': new objectId(id)}, {$set: {'nombre': 'Uruguay'}})
                     

    return nombreModificado;
}

async function modificarSize(id){
    const connectiondb = await conexion.getConnection()
    const modificarSize = await connectiondb
                     .db(DATABASE)
                     .collection(CANCHAS)
                     .update({'_id': new objectId(id)}, {$set: {'size': 8}})
                     

    return modificarSize;
}

async function modificarPrecio(id){
    const connectiondb = await conexion.getConnection()
    const modificarPrecio = await connectiondb
                     .db(DATABASE)
                     .collection(CANCHAS)
                     .update({'_id': new objectId(id)}, {$set: {'precio': 1800}})
                     

    return modificarPrecio;
}






module.exports = {agregarCancha,borrarCancha,getCanchas,getCancha, sizeCancha, modificarNombreCancha,modificarSize,modificarPrecio};