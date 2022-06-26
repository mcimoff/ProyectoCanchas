const express = require('express');
const router = express.Router();
const controller = require('../controllers/canchas');

router.get('/', async (req, res) => {
    res.json(await controller.getCanchas());
})

router.post('/', async(req,res) =>{
    const nuevoCancha = req.body;
    const resultado = await controller.agregarCancha(nuevoCancha);
    res.json(resultado);
})

router.delete('/borrarCancha/:id', async(req,res) =>{
    const cancha = await controller.borrarCancha(req.params.id);
    res.json(cancha);
})

router.get('/size/:size', async(req,res) => {
    const size = await controller.sizeCancha(req.params.size);
    res.json(size);
})

router.put('/modificarNombre/:id', async(req,res) =>{
    const modificarNombre = await controller.modificarNombreCancha(req.params.id);
    res.json(modificarNombre);
})

router.put('/modificarSize/:id', async(req,res) =>{
    const modificarSize = await controller.modificarSize(req.params.id);
    res.json(modificarSize);
})

router.put('/modificarPrecio/:id', async(req,res) =>{
    const modificarPrecio = await controller.modificarPrecio(req.params.id);
    res.json(modificarPrecio);
})


router.get('/:id', async(req,res) =>{
    const cancha = await controller.getCancha(req.params.id);
    res.json(cancha);
})

module.exports = router;