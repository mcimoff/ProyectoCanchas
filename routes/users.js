var express = require('express');
var router = express.Router();
const data = require('./../data/users');
const auth = require('./../middleware/authUsers')

/* GET users listing. */
router.get('/', auth,  async function(req, res, next) {
  const users = await data.getAllUsers();
  res.json(users);
});


router.post('/', async (req, res) =>{
  try{
    res.json(await data.addUser(req.body));
    res.status(201).json(result);
  }
  catch (error) {
    res.status(401);
  }
    
})

router.post('/login',async (req, res)=>{
  try {
    
    const user = await data.findByCredentials(req.body.email, req.body.password);
    const token = data.generateToken(user);
    res.send({user, token});
 
  } catch (error) {
   
    res.status(401).send(error.message);

  }
});

//definir si hace falta, porque se puede poner mail en reserva y traer por mail de usuario.
router.put('/addReserva',async (req, res)=>{
  try{
    res.json(await data.addReserva(req.body.userId, req.body.reservaId));
  }
  catch ( error) {
    res.status(401).send(error.message);
  }
});

router.put('/removeReserva',async (req, res)=>{
  res.json(await data.removeReserva(req.body.userId, req.body.reservaId));
});

module.exports = router;
