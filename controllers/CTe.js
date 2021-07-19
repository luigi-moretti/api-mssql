const roteador = require('express').Router();
const CTe = require('../models/CTe');

roteador.get('/', async(req, res)=>{
    CTe.listar()
        .then(resultados => res.status(200).json(resultados))
        .catch(erros => res.status(400).json(erros))
});

roteador.get('/:id', async(req, res)=>{
    const id = parseInt(req.params.id);
    CTe.buscaPorId(id)
        .then(resultado => res.status(200).json(resultado))
        .catch(erros => res.status(400).json(erros))

})


module.exports = roteador;