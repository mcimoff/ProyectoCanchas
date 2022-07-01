require('dotenv').config();
const objectId = require('mongodb').ObjectId;
const connection = require('./conexion');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { json } = require('express');
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
    const userReg = await connectdb.db(DATABASE)
                               .collection(USERS)
                               .find({email: user.email })
                               .toArray();
    
    console.log(userReg);
                                   
    if(userReg.length > 0 ){

         throw new Error("El email ingresado ya esta en uso");
     };
    
    user.password = await bcrypt.hash(user.password, 8);

    const result = await connectdb.db(DATABASE)
                                  .collection(USERS)
                                  .insertOne(user);
    
    return result;
}

async function findByMail(email){
    const connectdb = await connection.getConnection();
    const userReg = await connectdb.db(DATABASE)
                               .collection(USERS)
                               .findOne({email: email })
    return userReg;
}

async function findByCredentials(email, password) {
    const connectiondb = await connection.getConnection();
    const user = await connectiondb.db(DATABASE)
                                   .collection(USERS)
                                   .findOne({email: email });
    //console.log(user);
    if (!user){
        throw new Error('Credenciales no validas');
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Credenciales no validas');
    }
    return user;
}

async function getReservasUsuario(email){
   
    const connectdb = await connection.getConnection();
    const userReg = await connectdb.db(DATABASE)
                                   .collection(USERS)
                                   .findOne({'email': email })
    // validar si el usuario existe en nuestra base de datos

    console.log(userReg);
    if(!userReg){ 
        throw new Error('Usuario no registrado') 
        
    }   
    
    const misReservas = await connectdb.db(DATABASE)
                                        .collection(RESERVAS)
                                        .find({'email': email})
                                        .toArray()
       console.log(misReservas)                                    
   
    if(!misReservas){
        throw new Error('No posee reservas')
    }

    return misReservas;
};


async function updatePassword(user){
    const query = { _id: new objectId(user._id) };
    const passwordHash = await bcrypt.hash(user.password, 8);
    const newValues = {
        $set: {
            password: passwordHash,
        }
    };
    const connectdb = await connection.getConnection();
    const result = await connectdb.db(DATABASE)
                                     .collection(USERS)
                                     .updateOne(query, newValues);
    return result;
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

module.exports = {addUser, getAllUsers, findByCredentials, findByMail, getReservasUsuario, updatePassword, removeUsuario, generateToken};