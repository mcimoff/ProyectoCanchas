var express = require('express');
var router = express.Router();
const data = require('./../data/users');
const auth = require('./../middleware/authUsers');

/* GET users */
router.get('/', auth,  async function(req, res, next) {
  const users = await data.getAllUsers();
  res.json(users);
});

//ADD User
router.post('/',  async (req, res) =>{
  try{
    res.json(await data.addUser(req.body));
    res.status(201).json(result);
  }
    catch (error) {
    res.status(401);
  }
    
});

//Log In
router.post('/login',async (req, res)=>{
  try {
    const user = await data.findByCredentials(req.body.email, req.body.password);
    const token = data.generateToken(user);
    res.send({user, token});
 
  } catch (error) {
   
    res.status(401).send(error.message);

  }
});

//UPDATE password
router.put('/update', async (req, res) =>{
  try{
  res.json(await data.updatePassword(req.body));
  } catch (error){
    res.status(401).send(error.message)
  }
});

//DELETE User
router.delete('/deleteUsuario/:id', async(req,res) =>{
  try{
    res.json( await data.removeUsuario(req.params.id));
  } catch (error) {
    res.status(400).send(error.message)
 }
});

//GET Mis Reservas
router.get('/misReservas', async(req, res) =>{
 try{ 
    res.json(await data.getReservasUsuario(req.body));
 }catch (error) {
    res.status(401).send(error.message);
 }
});


module.exports = router;
