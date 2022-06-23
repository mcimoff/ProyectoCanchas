const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservas');

router.get('/', async (req, res) => {
    res.json(await controller.getReservas());
})



router.get('/libres', async (req,res) => {
    const libres = await controller.getReservasLibres();
    res.json(libres);
})

router.get('/horas/:hora', async (req,res) => {
    const horas = await controller.getReservaHora(req.params.hora);
    res.json(horas);
})

router.get('/fecha', async (req,res) =>{
    const fechaTurnos = await controller.getReservaFecha();
    res.json(fechaTurnos)
})

router.get('/:id', async (req, res) =>{
    const reserva = await controller.getReserva(req.params.id);
    res.json(reserva);
})

module.exports = router;