const express = require('express');
const router = express.Router();
const controller = require('../controllers/canchas');

router.get('/', async (req, res) => {
    res.json(await controller.getCanchas());
})

router.post('/', async(req,res) =>{
    const nuevoTurno = req.body;
    const resultado = await controller.agregarTurno(nuevoTurno);
    res.json(resultado);
})

module.exports = router;