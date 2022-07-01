const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservas');

router.get('/', async (req, res) => {
    
    res.json(await controller.getReservas());
})


router.get('/horas/:hora', async (req,res) => {
    const horas = await controller.getReservaHora(req.params.hora);
    res.json(horas);
})

router.get('/fecha/:fecha', async (req,res) =>{
    const fechaTurnos = await controller.getReservaFecha(req.params.fecha);
    res.json(fechaTurnos)
})



router.post('/', async(req,res) =>{
    const nuevoTurno = req.body;
    const resultado = await controller.agregarTurno(nuevoTurno);

    res.json(resultado);
})

router.get('/filtrar/:id', async (req, res) =>{
    
    const reserva = await controller.getReservasPorCancha(req.params.id);
    res.json(reserva);

})

router.delete('/borrarReserva/:id', async(req,res) =>{
    const reservas = await controller.borrarReserva(req.params.id);
    res.json(reservas);
})

router.delete('/borrarReservas', async(req,res) =>{
    const reservas = await controller.borrarReservas();
    res.json(reservas);
})

router.get('/:id', async(req,res) =>{
    const reserva = await controller.getReserva(req.params.id);
    res.json(reserva);
})


module.exports = router;