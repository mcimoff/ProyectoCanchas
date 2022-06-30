require('dotenv').config();
const objectId = require('mongodb').ObjectId;
const connection = require('./conexion');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DATABASE = 'reservacanchas';
const USERS = 'usuarios';
const RESERVAS = 'reservas';


async function getAllUsers(){
    const connectdb = await connection.getConnection();

    const users = await connectdb.db(DATABASE)
                                 .collection(USERS)
                                 .find()
                                 .toArray();
    return users;
    
}

//Validar datos de usuario que recibo 

async function addUser(user){
    const connectdb = await connection.getConnection();
    const userReg = await connectiondb.db(DATABASE)
                                      .collection(USERS)
                                      .find({email: user.email })
                                      .toArray();
if(userReg.length>0){
    throw new Error("El email ingresado ya esta en uso")
}
    
    user.password = await bcrypt.hash(user.password, 8);

    const result = await connectdb.db(DATABASE)
                                  .collection(USERS)
                                  .insertOne(user);
    
    return result;
}



async function findByCredentials(email, password) {
    const connectiondb = await connection.getConnection();
    const user = await connectiondb.db(DATABASE)
                                    .collection(USERS)
                                    .findOne({ email: email });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
        throw new Error('Credenciales no validas');
    }
    return user;
}

async function getReservasUsuario(email){
    const connectdb = await connection.getConnection();
    const user = await connectdb.db(DATABASE)
                                .collection(USERS)
                                .findOne({email: email});
    // validar si el usuario existe en nuestra base de datos
    if(!user ){ 
        throw new Error('Usuario no registrado') 
        
    }   
        const misReservas = await connectdb(DATABASE)
                                  .collection(RESERVAS)
                                  .find({email: {$eq: email}})
                                  .toArray();

    return misReservas;
};


async function removeUsuario(id){
    const connectiondb = await connection.getConnection();
    const userReg = await connectiondb.db(DATABASE)
                                      .collection(USERS)
                                      .deleteOne({_id: new objectId(id)})
                     
    return userReg; 
};


function generateToken(user){
    const token = jwt.sign({_id:user._id}, process.env.CLAVESECRETA, {expiresIn: '2h'} );
    return token;
}

module.exports = {addUser, getAllUsers, findByCredentials, getReservasUsuario, removeUsuario, generateToken};