require('dotenv').config();
const connection = require('./conexion');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DATABASE = 'reservacanchas';
const USERS = 'usuarios';
const RESERVAS = 'reservas';


async function getAllUsers(){
    const connectdb = await connection.getConnection();

    const users = await connectdb
                    .db(DATABASE)
                    .collection(USERS)
                    .find()
                    .toArray();
    return users;
    
}

async function addUser(user){
    const connectdb = await connection.getConnection();

    //user.password ? await bcrypt.hash(user.password,8) : "No cumple parámetros";

   user.password = await bcrypt.hash(user.password, 8);

    const result = await connectdb.db(DATABASE)
                                  .collection(USERS)
                                  .insertOne(user);
    return result;
}

// async function addUser(user) {
//     const connectiondb = await conn.getConnection();

//     user.password = await bcrypt.hash(user.password, 8);

//     const userReg = await connectiondb.db(DATABASE)
//                                       .collection(USERS)
//                                       .findOne({email: user.email})
                                
//     if(userReg){
//         throw new Error('Credenciales no validas');
//     }
    
//     const newUser = {
//                     ...user, 
//                     reservas: [],
//     }
//     const result = await connectiondb.db(DATABASE)
//                                      .collection(USERS)
//                                      .insertOne(newUser);
//     return result;
// }

async function findByCredentials(email, password){
    const connectdb = await connection.getConnection();
    const user = await connectdb.db(DATABASE)
                    .collection(USERS)
                    .findOne({email: email});
    // validar si el usuario existe en nuestra base de datos
    if(!user){
        throw new Error('Credenciales no validas');
    }

    // validar la contraseñawebtoken
    const isMatch = await bcrypt.compare(password, user.password);
    
    if(!isMatch){
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
}

// async function removeReserva(email, reservaId){
//     const connectdb = await connection.getConnection();
//     const user = await connectdb.db(DATABASE)
//                                 .collection(USERS)
//                                 .findOne({email: email});
//      if(!user ){ 
//         throw new Error('Usuario no registrado') 
                                    
//     }   

//     const misReservas = await connectdb(DATABASE)
//                                   .collection(RESERVAS)
//                                   .({email: {$eq: email}})
//                                   .toArray();
   
//     return await updateData(query, newValues);
// }


function generateToken(user){
    const token = jwt.sign({_id:user._id}, process.env.CLAVESECRETA, {expiresIn: '2h'} );
    return token;
}

module.exports = {addUser, getAllUsers, findByCredentials, getReservasUsuario, generateToken};